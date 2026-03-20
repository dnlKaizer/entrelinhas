# EntreLinhas

Um aplicativo de acompanhamento de leitura, permitindo cadastro de livros e rastreamento de sessões de leitura em tempo real.

## 🎯 Funcionalidades

- Cadastro de livros com informações como título, autor, editora e progresso
- Registro de sessões de leitura com data, duração e páginas lidas
- Acompanhamento de progresso geral de leitura
- Sincronização em tempo real com Supabase

## 🛠️ Tecnologias

- **Frontend**: React 19 com TypeScript
- **Build**: Vite
- **Banco de Dados**: Supabase (PostgreSQL)
- **Linter**: ESLint

## 📦 Instalação

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Setup

1. Clone o repositório:

~~~bash
git clone https://github.com/seu-usuario/entrelinhas.git
cd entrelinhas
~~~

2. Instale as dependências:

~~~bash
npm install
~~~

3. Configure as variáveis de ambiente:

Crie o arquivo .env.local na raiz do projeto com:

~~~env
VITE_SUPABASE_URL=url_do_supabase
VITE_SUPABASE_ANON_KEY=anon_key_do_supabase
~~~

4. Inicie o servidor de desenvolvimento:

~~~bash
npm run dev
~~~

## 🚀 Scripts

- npm run dev: inicia o servidor de desenvolvimento
- npm run build: compila para produção
- npm run preview: visualiza a build de produção
- npm run lint: executa o ESLint

## 📋 Estrutura do Projeto

~~~text
src/
├── assets/         # Recursos estáticos (imagens, estilos, etc.)
├── components/     # Componentes React reutilizáveis (Botões, Formulários, etc.)
├── pages/          # Páginas da aplicação (Home, Cadastro, etc.)
├── providers/      # Provedores de contexto (temas)
├── services/       # Integração com Supabase (CRUD, autenticação, etc.)
├── types/          # Tipos TypeScript (classes, interfaces, etc.)
├── App.tsx         # Componente principal (roteamento, layout, etc.)
└── main.tsx        # Ponto de entrada (renderização do React)
~~~

## 🗄️ Banco de Dados

O projeto utiliza Supabase com as seguintes tabelas principais:

- *livro*: Armazena informações dos livros cadastrados
- *leitura*: Registra cada sessão de leitura
- *usuario*: Gerencia os usuários do sistema

## 🤝 Colaboradores

- [Danilo Kaizer](https://github.com/dnlKaizer)
- [Leonardo Soares](https://github.com/leonardoSoares0121)
