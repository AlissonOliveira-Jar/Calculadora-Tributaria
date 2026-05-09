# Calculadora Tributária NAF - Comparativo PF vs PJ

Este projeto consiste em uma aplicação web desenvolvida para o Núcleo de Apoio Contábil e Fiscal (NAF). O objetivo é entregar um comparativo tributário claro e preciso entre os regimes de Pessoa Física (PF) e Pessoa Jurídica (PJ).

O sistema funciona como um painel de apoio à decisão, ajudando profissionais autônomos (focando em **Psicologia, Arquitetura e Advocacia**) a identificarem a opção tributária mais vantajosa com base nas regras, alíquotas e no salário mínimo projetados para o ano-calendário de 2026.

## 🏗️ Estrutura do Projeto

O repositório está organizado de forma modular, separando as responsabilidades e preparando o terreno para a evolução completa da aplicação:

* **/frontend**: Interface do usuário (SPA) totalmente responsiva desenvolvida em ReactJS. (Fase atual).
* **/backend**: Servidor Node.js para processamento, autenticação e integrações (Fase futura de desenvolvimento).
* **/docs**: Documentação técnica do projeto, mapa de requisitos funcionais e não funcionais.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** ReactJS e Vite.
- **Roteamento:** React Router Dom (Navegação SPA).
- **Estilização:** Tailwind CSS v4 (Design responsivo e paleta de cores customizada).
- **Exportação:** html2pdf.js (Geração de relatórios oficiais no lado do cliente).
- **Documentação:** Especificação Técnica NAF.

## 🚀 Como Executar Localmente

Nesta etapa focada na interface, a execução é direta e leve, sem a necessidade de configurações complexas de ambiente:

### Pré-requisitos
- Node.js instalado.
- Gerenciador de pacotes npm.

### Passo a Passo (Frontend)
1. Acesse o diretório do front-end:
    ```bash
    cd frontend
    ```
2. Instale as dependências do projeto:
    ```bash
    npm install
    ```
3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 📄 Funcionalidades Principais

- **Landing Page Interativa:** Apresentação do propósito da ferramenta e seção de Dúvidas Frequentes (FAQ).

- **Simuladores Independentes:** Cálculos tributários isolados para PF (abatendo Livro Caixa) e PJ (Simples Nacional + INSS sobre Pró-labore).

- **Comparativo Inteligente:** Cruzamento de dados em tempo real apontando matematicamente o regime vencedor e a economia mensal.

- **Geração de Relatórios:** Download imediato de um documento PDF com a análise detalhada.

- **Fluxos Preparados:** Telas de Cadastro, Login, Recuperação de Senha e Fale Conosco mockadas e prontas para integração futura com o backend.

## 👥 Autor
- **Alisson Almeida de Oliveira**

- Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento de Aplicações de Frameworks Web.