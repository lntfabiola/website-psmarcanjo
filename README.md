# ⛪ Paróquia São Miguel Arcanjo

Este é o site oficial e aplicativo (PWA) da **Paróquia São Miguel Arcanjo**. Desenvolvido com uma interface moderna, rápida e totalmente responsiva, o projeto foi criado para aproximar os fiéis da comunidade, facilitando o acesso a informações sobre missas, pastorais, orações, sacramentos e contato com a secretaria.

O projeto também está configurado como **Progressive Web App (PWA)**, permitindo que os fiéis o instalem diretamente em seus celulares (Android e iOS) ou computadores, funcionando como um aplicativo nativo com suporte a ícones dedicados.

---

## ✨ Principais Funcionalidades

*   **Página Inicial (Home):** Banner de destaque, comunicados e links rápidos.
*   **Sobre a Paróquia:** História da paróquia, informações institucionais e marcos.
*   **Agenda & Horários:** Calendário de missas, confissões e eventos paroquiais.
*   **Comunidades:** Detalhes sobre as capelas e setores pertencentes à paróquia.
*   **Pastorais & Movimentos:** Informações sobre como participar e atuar na comunidade.
*   **Orações & Liturgia:** Acervo de orações católicas comuns e específicas da paróquia, além de leituras litúrgicas.
*   **Sacramentos:** Orientações sobre Batismo, Crisma, Matrimônio, Reconciliação, etc.
*   **Dízimo:** Informações sobre a importância do dízimo e meios para contribuição.
*   **Loja Paroquial:** Vitrine de artigos religiosos, livros e itens da comunidade.
*   **Contato:** Formulário de envio de mensagens, contatos da secretaria e mapa de localização.
*   **Painel Administrativo:** Área protegida para que a secretaria paroquial gerencie eventos, avisos e conteúdos.

---

## 🛠️ Tecnologias Utilizadas

*   **React 19 & Vite:** Estrutura rápida e moderna para o desenvolvimento frontend.
*   **React Router 7:** Navegação dinâmica entre páginas (SPA).
*   **Tailwind CSS & PostCSS:** Estilização responsiva, fluida e moderna.
*   **Firebase (V12):** Integração para banco de dados em tempo real, autenticação de administrador e serviços auxiliares.
*   **Lucide React:** Pacote de ícones limpos e modernos.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado na máquina.
*   Gerenciador de pacotes `npm` ou `yarn`.

### Instalação

1. Clone o repositório do GitHub:
   ```bash
   git clone https://github.com/lntfabiola/site-psmarcanjo.git
   ```

2. Entre na pasta do projeto:
   ```bash
   cd site-psmarcanjo
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Rodando o Servidor de Desenvolvimento
Inicie o projeto localmente para desenvolvimento:
```bash
npm run dev
```
O projeto estará disponível no endereço indicado no terminal (geralmente `http://localhost:5173`).

---

## 📦 Scripts Disponíveis

No diretório do projeto, você pode executar:

*   `npm run dev`: Executa o app em modo de desenvolvimento.
*   `npm run build`: Compila o aplicativo de forma otimizada para produção na pasta `dist/`.
*   `npm run preview`: Visualiza localmente o build de produção gerado.
*   `npm run lint`: Executa o verificador de regras de código (ESLint).
