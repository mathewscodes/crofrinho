# 🐷 Crofrinho - Finanças sem "probrema"

O **Crofrinho** é um Web App de gestão financeira pessoal focado em simplicidade e organização por contas bancárias. O projeto foi desenvolvido com uma estética moderna (Fintech) e um toque amigável de cultura caipira, permitindo o controle de rendas e gastos fixos.

## 🚀 Funcionalidades

- **Autenticação Segura:** Login via E-mail/Senha e Google Auth através do Firebase.
- **Gestão de Contas:** Cadastro de múltiplas contas bancárias (Nubank, Itaú, Inter, etc.) ou personalizadas.
- **Lançamentos Dinâmicos:** Registro de entradas e saídas vinculadas a contas específicas.
- **Saldo em Tempo Real:** Atualização automática do placar financeiro conforme novos dados são inseridos.
- **Design Mobile-First:** Interface otimizada para uso em smartphones.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Variáveis, Flexbox) e JavaScript (ES6 Modules).
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore).
- **Versionamento:** Git & GitHub.
- **Ferramentas:** VS Code & Live Server.

## 📁 Estrutura do Projeto

```text
crofrinho/
├── assets/             # Logos e imagens do app
├── css/
│   └── style.css       # Estilização centralizada e comentada
├── js/
│   ├── firebase-config.js  # Configuração do SDK do Firebase
│   ├── auth.js             # Lógica de login e cadastro
│   └── app.js              # Lógica da dashboard e banco de dados
├── index.html          # Tela de autenticação
├── dashboard.html      # Painel principal de controle
└── README.md           # Documentação do projeto 

Desenvolvido por Mathews - 2026
