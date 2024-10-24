# Newsletter (API) &middot; ![Runtime: Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=f5f5f5) ![Language: Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=f5f5f5) ![Framework: Express](https://img.shields.io/badge/Express-f5f5f5?logo=express&logoColor=353535) ![AI: Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=f5f5f5)

[**Leia em Português**](README.md)

## 🔗 Table of Contents

1. [The Study](#-the-study)
2. [Technologies](#-technologies)
3. [Project structure](#%EF%B8%8F-project-structure)
4. [The use of Artificial Intelligence](#-the-use-of-artificial-intelligence)
5. [Getting started](#-getting-started)
6. [Endpoints](#endpoints)
7. [License](#license)

## 📙 The Study

> The Newsletter API was developed for the [**Newsletter project**](https://github.com/vinicioscst/newsletter-vue) to enhance knowledge of JavaScript/TypeScript and to learn new technologies such as **Vue** and **Gemini**, Google's artificial intelligence. Additionally, it served as a starting point for other concepts such as OOP and Design Patterns, specifically the Singleton design pattern, which is used in the instances of the ORM and the Cron tool.

## 💻 Technologies

- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **Framework** - [Express](https://expressjs.com/)
- **Runtime** [^1] - [Bun](https://bun.sh/)
- **Database** [^2] - [Docker](https://www.docker.com)
- **ORM** - [Prisma](https://www.prisma.io/)

> [^1]: If you do not want to use **Bun**, simply install [**Node.js**](https://nodejs.org/) version 20 or higher and remove the `bun.lockb` file
>
> [^2]: If you do not want to use **Docker**, you can use another free service, like [Supabase](https://supabase.com)

### **Main libraries**

- [GoogleGenerativeAI](https://ai.google.dev/gemini-api/docs/quickstart?lang=node)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [BcryptJs](https://www.npmjs.com/package/bcryptjs)
- [xml2js](https://www.npmjs.com/package/xml2js)

## 🗂️ Project structure

```bash
📦 root
├── 📁 src
│   ├── 📁 controllers     # Contains the controllers responsible for handling client requests
│   ├── 📁 database        # ORM and database configuration
│   ├── 📁 helpers         # Contains the application's auxiliary functions
│   ├── 📁 lib             # External libraries configuration
│   ├── 📁 middlewares     # Contains the middlewares applied to routes
│   ├── 📁 router          # Definition of routes and their respective middlewares
│   ├── 📁 services        # Encapsulates the application's business logic
│   ├── 📁 types           # Contains additional object typings
```

## 💡 The use of Artificial Intelligence

One of the key features of the API is the **use of artificial intelligence**, specifically the Gemini Flash 1.5 in its free version.
AI is used for data formatting and information generation based on the data.

> [!NOTE]
> The content generated by AI is based on research and does not intend to infringe on anyone's intellectual property.
> Additionally, its use is solely for educational purposes, with no commercial activity involved.

## 🚀 Getting Started

```bash
# Clone the project

git clone https://github.com/vinicioscst/newsletter-api.git

# Install dependencies

bun install or npm install

# Configure database with Docker (ignore it if you're using another service)

docker-compose up -d

# Create the .env file and fill in the correct data

API_KEY=            # Insert your Gemini API key here
DATABASE_URL=       # Your database connection string. Example: postgresql://docker:docker@localhost:5432/newsletter_db
PORT=               # Port where the application will run
SECRET_KEY=         # Secret key for generating the user token upon login
SECRET_KEY_CRON=    # Secret key for configuring the Cron library
EXPIRES_IN=         # Token expiration time. Example: 1h

# Configure your database

bunx prisma db push ou npx prisma db push

# Run the application

bun run dev or npm run dev
```

## Endpoints

To check all the endpoints, request bodies, and responses, [**click here**](https://newsletter-api-fdpw.onrender.com/api/docs/#/).

> [!IMPORTANT]
> Certain routes require authentication (those with a lock icon). To access them, create a user (you won't be able to create another until the current one is deactivated), log in, and get the token from the response.
>
> To make user creation easier, you can use tools like [**Insomnia**](https://insomnia.rest/) or [**Postman**](https://www.postman.com/)

## License

This project is under the [MIT license](LICENSE).
