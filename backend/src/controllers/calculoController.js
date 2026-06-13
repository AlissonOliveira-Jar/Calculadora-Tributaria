const prisma = require('../config/prisma');

const calculoController = {
  create: async (req, res) => {
    try {
      const { tipoProfissao, faturamento, custos } = req.body;
      const userId = req.userId;

      if (!tipoProfissao || faturamento === undefined) {
        return res.status(400).json({ error: "Profissão e Faturamento são obrigatórios." });
      }

      const rendaNum = parseFloat(faturamento);
      const custosNum = custos ? parseFloat(custos) : 0;

      // --- REGRA DE NEGÓCIO DA PESSOA FÍSICA (IRPF 2026) ---
      const basePF = rendaNum - custosNum;
      let impostoPF = 0;
      let faixaPF = "Isento";

      if (basePF <= 2428.8) {
        faixaPF = "Isento";
      } else if (basePF <= 2826.65) {
        impostoPF = basePF * 0.075 - 182.16;
        faixaPF = "7,5%";
      } else if (basePF <= 3751.05) {
        impostoPF = basePF * 0.15 - 394.16;
        faixaPF = "15%";
      } else if (basePF <= 4664.68) {
        impostoPF = basePF * 0.225 - 675.49;
        faixaPF = "22,5%";
      } else {
        impostoPF = basePF * 0.275 - 908.73;
        faixaPF = "27,5%";
      }
      impostoPF = impostoPF <= 0 ? 0 : impostoPF;

      // --- REGRA DE NEGÓCIO DA PESSOA JURÍDICA (Simples Nacional 2026) ---
      let simples = 0;
      if (tipoProfissao.toLowerCase() === "advogado") {
        simples = rendaNum * 0.045; // Anexo IV: 4,5%
      } else {
        // Psicólogo e Arquiteto - Anexo III (Considerando o Fator R ativo no front)
        simples = rendaNum * 0.06; // 6%
      }

      const salario28 = rendaNum * 0.28;
      const salarioMin = 1621; // Salário mínimo projetado para 2026
      const salarioBase = salario28 < salarioMin ? salarioMin : salario28;
      const inss = salarioBase * 0.11; // 11% obrigatório sobre o pró-labore
      const impostoPJ = simples + inss;

      // --- COMPARAÇÃO DE VANTAGEM TRIBUTÁRIA ---
      const economiaMensal = Math.abs(impostoPJ - impostoPF);
      const melhorOpcao = impostoPJ < impostoPF ? "Pessoa Jurídica (PJ)" : "Pessoa Física (PF)";

      const novoCalculo = await prisma.calculo.create({
        data: {
          userId,
          tipoProfissao,
          faturamento: rendaNum,
          custos: custosNum,
          impostoPF,
          impostoPJ,
          melhorOpcao,
          economiaMensal
        }
      });

      return res.status(201).json({
        message: "Cálculo simulado e salvo com sucesso!",
        calculo: novoCalculo
      });

    } catch (error) {
      console.error("Erro ao processar cálculo:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao processar o cálculo tributário." });
    }
  },

  history: async (req, res) => {
    try {
      const userId = req.userId;

      const historico = await prisma.calculo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json(historico);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      return res.status(500).json({ error: "Erro interno ao buscar o histórico de cálculos." });
    }
  }
};

module.exports = calculoController;
