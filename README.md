# 🧮 Calculadora Tributária NAF - Comparativo PF vs PJ (2026)

Este projeto consiste em uma aplicação web full-stack desenvolvida para o **Núcleo de Apoio Contábil e Fiscal (NAF)**. O objetivo é automatizar a simulação e análise de vantagem tributária para prestadores de serviços autônomos (**Psicologia, Arquitetura e Advocacia**), comparando os cenários de atuação como Pessoa Física (IRPF/Livro Caixa) e Pessoa Jurídica (Simples Nacional/Fator R) com base nas regras fiscais do ano-calendário **2026**.

## 🏗️ Estrutura do Projeto
* **/frontend**: Interface do usuário desenvolvida em ReactJS, Vite e Tailwind CSS.
* **/backend**: Servidor Node.js com Express, Prisma ORM e banco de dados PostgreSQL.

## 🚀 Como Executar o Ecossistema Completo (Via Docker)
A forma recomendada e homologada de rodar o projeto completo (Frontend, Backend e Banco de Dados) é utilizando o Docker Compose a partir da raiz:

### 📋 Pré-requisitos
* Docker Desktop instalado e ativo.

### 🔌 Passo a Passo
1. Na raiz do projeto, construa as imagens e inicie os serviços orquestrados:
   ```bash
   docker compose up --build
   ```
2. O Docker irá configurar e subir automaticamente:
* Frontend: http://localhost:5173
* Backend: http://localhost:3000
* Banco de Dados: PostgreSQL (Instância interna)

_Nota: Para instruções de desenvolvimento isolado ou scripts específicos de cada serviço, consulte os arquivos README de suas respectivas pastas._
