# EntreLinhas

Aplicativo web para acompanhar leituras, organizar livros por status e registrar progresso de forma prática.

## Funcionalidades

### Leitura e livros

- Cadastro, edição e exclusão de livros.
- Organização por status: **Lendo**, **Desejado** e **Lido**.
- Controle de progresso por páginas lidas e total de páginas.
- Registro de datas de início e término da leitura.
- Upload de capa do livro para o Supabase Storage.

### Compartilhamento

- Compartilhamento de livro com **Web Share API**.
- Compartilhamento com texto formatado e, quando suportado pelo dispositivo, envio da capa como arquivo.

### Câmera e galeria

- Seleção de imagem da capa pela galeria do dispositivo.
- Captura de foto da capa usando a câmera (quando disponível no dispositivo/navegador).

### Autenticação e autorização

- Cadastro e login de usuários com Supabase Auth (email e senha).
- Rotas públicas e protegidas.
- Controle de perfil admin para ações avançadas de notificação.

### PWA e experiência mobile

- **Web App Manifest** configurado (nome, ícones, tema e modo standalone).
- **Service Worker** com estratégias de cache para assets, APIs e imagens.
- Integração com **Vite PWA** usando estratégia `injectManifest`.
- Prompt de instalação do app (`beforeinstallprompt`).
- Comportamento offline com aviso ao usuário quando não há conexão.

### Push notifications

- Inscrição e cancelamento de inscrição de notificações push no navegador.
- Envio de notificação para todos os usuários (ação administrativa).
- Suporte a notificação genérica e personalizada (título/descrição).

## Tecnologias utilizadas

- **React 19** + **TypeScript**
- **Vite 8**
- **Ant Design**
- **React Router DOM 7**
- **Supabase**
	- Auth
	- PostgreSQL
	- Storage
	- Edge Functions (push)
- **vite-plugin-pwa** (Workbox)
- **ESLint**

## Instruções de execução

### Pré-requisitos

- Node.js **20+** (recomendado para Vite 8)
- npm

### 1. Clonar o projeto

~~~bash
git clone https://github.com/dnlKaizer/entrelinhas.git
cd entrelinhas
~~~

### 2. Instalar dependências

~~~bash
npm install
~~~

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz com:

~~~env
VITE_SUPABASE_URL=url_do_supabase
VITE_SUPABASE_ANON_KEY=anon_key_do_supabase
VITE_VAPID_PUBLIC_KEY=vapid_public_key
~~~

### 4. Rodar em desenvolvimento

Inicia o servidor de desenvolvimento:

~~~bash
npm run dev
~~~

### 5. Build de produção

Compila o projeto para produção:

~~~bash
npm run build
~~~

### 6. Preview da build

Visualiza a build de produção localmente:

~~~bash
npm run preview
~~~

### 7. Lint

Executa o ESLint para verificar o código:

~~~bash
npm run lint
~~~

## 📋 Estrutura do Projeto

~~~text
src/
├── assets/             # Recursos estáticos (imagens, estilos, etc.)
├── components/         # Componentes React reutilizáveis (Botões, Formulários, etc.)
├── config/             # Configurações da aplicação
├── hooks/              # Hooks personalizados
├── pages/              # Páginas da aplicação (Home, Cadastro, etc.)
├── providers/          # Provedores de contexto (temas)
├── routes/             # Definição de rotas
├── services/           # Integração com Supabase (CRUD, autenticação, etc.)
├── types/              # Tipos TypeScript (classes, interfaces, etc.)
├── utils/              # Funções utilitárias
├── App.tsx             # Componente principal (roteamento, layout, etc.)
├── main.tsx            # Ponto de entrada (renderização do React)
└── service-worker.ts   # Configuração do Service Worker
~~~

## 🗄️ Banco de Dados

O projeto utiliza Supabase com as seguintes tabelas principais:

- *livro*: Armazena informações dos livros cadastrados
- *push_notifications*: Gerencia as notificações push para os usuários
- *usuario*: Gerencia os usuários do sistema
- *profile*: Armazena roles e permissões dos usuários

## Observações importantes

- Recursos de instalação PWA e push notifications dependem de suporte do navegador.
- Em ambiente de produção, recursos de push e service worker funcionam corretamente com HTTPS.
- O envio de notificações para todos os usuários depende das Edge Functions configuradas no Supabase.

## 🤝 Colaboradores

- [Danilo Kaizer](https://github.com/dnlKaizer)
- [Leonardo Soares](https://github.com/leonardoSoares0121)
