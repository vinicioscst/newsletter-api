# Newsletter (API) &middot; ![Runtime: Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=f5f5f5) ![Linguagem: Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=f5f5f5) ![Framework: Express](https://img.shields.io/badge/Express-f5f5f5?logo=express&logoColor=353535) ![IA: Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=f5f5f5)

[**Read in English**](README.en.md)

## 🔗 Índice

1. [O estudo](#-o-estudo)
2. [Tecnologias](#-tecnologias)
3. [Estrutura do projeto](#%EF%B8%8F-estrutura-do-projeto)
4. [O uso de inteligência artificial](#-o-uso-de-intelig%C3%AAncia-artificial)
5. [Primeiros passos](#-primeiros-passos)
6. [Endpoints](#endpoints)
7. [Licença](#licen%C3%A7a)

## 📙 O estudo

> A API Newsletter foi elaborada para o [**projeto Newsletter**](https://github.com/vinicioscst/newsletter-vue), com o intuito de fortalecer os conhecimentos de Javascript/ Typescript e aprender novas tecnologias, como **Vue** e o **Gemini**, inteligência artificial da **Google** e, além disso, dar início a outros conhecimentos como POO e Design Patterns, especificamente o design Singleton, utilizado nas instâncias do ORM e da ferramenta Cron.

## 💻 Tecnologias

- **Linguagem** - [Typescript](https://www.typescriptlang.org/)
- **Framework** - [Express](https://expressjs.com/)
- **Runtime** [^1] - [Bun](https://bun.sh/)
- **Banco de dados** [^2] - [Supabase](https://supabase.com/)
- **ORM** - [Prisma](https://www.prisma.io/)

> [^1]: Se não quiser utilizar o **Bun**, basta instalar o [**Node.js**](https://nodejs.org/) a partir da versão 20 e remover o arquivo `bun.lockb`
> [^2]: Se não quiser utilizar o **Supabase**, basta instalar o [**PostgreSQL**](https://www.postgresql.org/) e configurar seu banco de dados

### **Principais bibliotecas**

- [GoogleGenerativeAI](https://ai.google.dev/gemini-api/docs/quickstart?lang=node)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [BcryptJs](https://www.npmjs.com/package/bcryptjs)
- [xml2js](https://www.npmjs.com/package/xml2js)

## 🗂️ Estrutura do projeto

```bash
📦 raiz-do-projeto
├── 📁 src
│   ├── 📁 controllers     # Onde ficam os controladores responsáveis por lidar com as requisições do cliente
│   ├── 📁 database        # Configuração do ORM e banco de dados
│   ├── 📁 helpers         # Contém as funções auxiliares da aplicação, utilizadas
│   ├── 📁 lib             # Configuração de bibliotecas externas
│   ├── 📁 middlewares     # Contém os middlewares aplicados nas rotas
│   ├── 📁 router          # Definição das rotas e uso de seus respectivos middlewares
│   ├── 📁 services        # É onde ficam encapsuladas as lógica de negócio da aplicação
│   ├── 📁 types           # Contém tipagens extra de objetos
```

## 💡 O uso de inteligência artificial

Um dos pontos principais da API é o **uso de inteligência artificial**, especificamente o Gemini Flash 1.5 na versão gratuita.
A IA é utilizada na formatação de dados e na geração de informações com base nos mesmos.

> [!NOTE]
> O conteúdo gerado pela IA é feito com base em pesquisa, sem qualquer objetivo de se apropriar da propriedade intelectual de qualquer pessoa.
> Além disso, seu uso é unica e exclusivamente para fins educacionais, sem qualquer atividade comercial envolvida.

## 🚀 Primeiros passos

```bash
# Clone o projeto

git clone https://github.com/vinicioscst/newsletter-api.git

# Instale as dependências

bun install ou npm install

# Crie o arquivo .env e preencha os dados corretamente

API_KEY=            # Insira aqui sua chave da API do Gemini
DATABASE_URL=       # Sua string de conexão com o banco de dados. Exemplo: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
PORT=               # Porta que irá rodar a aplicação
SECRET_KEY=         # Chave secreta para geração do token do usuário ao fazer login
SECRET_KEY_CRON=    # Chave secreta para configuração da biblioteca Cron
EXPIRES_IN=         # Tempo de expiração do token. Exemplo: 1h

# Configure seu banco de dados

bunx prisma db push ou npx prisma db push

# Rode a aplicação

bun run dev ou npm run dev
```

## Endpoints

Para verificar todos os endpoints, corpos de requisição e respostas, [**acesse aqui**](https://newsletter-api-fdpw.onrender.com/api/docs/#/).

> [!IMPORTANT]
> Certas rotas precisam de autenticação (as que possuem cadeado). Para poder acessá-las, crie um usuário (não será possível criar outro até que o atual seja desativado), fazer login e pegar o token da resposta.
> Para facilitar a criação do usuário, você pode usar ferramentas como o [**Insomnia**](https://insomnia.rest/) ou [**Postman**](https://www.postman.com/)

## Licença

Esse projeto está sob a [licença MIT](LICENSE)
