# 🍔 Sistema de Gerenciamento de Lanchonete

Um sistema Full-Stack moderno para gerenciamento completo de uma lanchonete/hamburgueria, contemplando o controle de estoque de ingredientes, cardápio de hambúrgueres e bebidas, e o fluxo de pedidos.

O projeto foi inteiramente conteinerizado, garantindo que a infraestrutura suba com zero configuração manual em qualquer ambiente, mas também suporta execução local para desenvolvimento.

## 🚀 Tecnologias e Arquitetura

O ecossistema é dividido em três camadas isoladas orquestradas via **Docker Compose**:

### Back-end (API RESTful)
* **Linguagem:** Java 21
* **Framework:** Spring Boot 4.1.1
* **Persistência:** Spring Data JPA / Hibernate
* **Validação:** Spring Boot Validation

### Front-end (SPA)
* **Linguagem:** TypeScript
* **Framework:** Angular 19
* **Estilização:** Bootstrap 5 & Bootstrap Icons
* **Servidor Web:** Nginx (Alpine)

### Banco de Dados
* **Engine:** PostgreSQL 15 (Alpine)
* **Migração/Seed:** Inicialização automatizada de tabelas (DDL Auto) e carga de dados iniciais via `data.sql`.

## 📦 Estrutura do Projeto

```text
hamburgueria/
├── backend/                  # Código-fonte do Spring Boot (API)
│   ├── src/main/resources/   # Configurações e data.sql
│   ├── Dockerfile            # Container Builder (Maven + Eclipse Temurin 21)
│   └── pom.xml
├── frontend/                 # Código-fonte do Angular (UI)
│   ├── src/                  # Componentes e serviços
│   ├── Dockerfile            # Container Builder (Node 24 + Nginx)
│   └── package.json
└── docker-compose.yml        # Orquestrador da Infraestrutura
```

## ⚙️ Como Executar (Ambiente Local com Docker)

Graças à arquitetura baseada em contêineres, você não precisa instalar Java, Node, Angular ou PostgreSQL na sua máquina. 

**Pré-requisitos:**
* Docker Engine (ou Docker Desktop) em execução.

**Passo a passo:**
1. Clone este repositório.
2. Abra o terminal na raiz do projeto (onde está o `docker-compose.yml`).
3. Execute o comando de orquestração:
   ```bash
   docker-compose up -d --build
   ```
4. Aguarde a compilação das imagens e a inicialização dos serviços.

**Acessos:**
* 🖥️ **Interface Web (Angular):** [http://localhost:4200](http://localhost:4200)
* ⚙️ **API (Spring Boot):** [http://localhost:8080](http://localhost:8080)
* 🗄️ **Banco de Dados (PostgreSQL):** `localhost:5432` (Credenciais no `docker-compose.yml`)

## 💻 Como Executar (Desenvolvimento Local sem Docker)

Para o dia a dia de desenvolvimento, você pode rodar a aplicação fora do Docker para aproveitar recursos como Debug nativo da IDE e Hot-Reload.

**Pré-requisitos:**
* Java 21
* Node.js 24+
* PostgreSQL rodando na porta 5432 (Banco: `hamburgueria`, Usuário: `postgres`, Senha: `postgres`)

**1. Back-end (Spring Boot):**
Abra a pasta `backend` na sua IDE (IntelliJ, Eclipse ou VS Code) e execute a classe `HamburgueriaApplication` no modo Run ou Debug.

**2. Front-end (Angular):**
Abra o terminal na pasta `frontend` e execute os comandos abaixo para instalar as dependências e iniciar o servidor de desenvolvimento:
```bash
npm install
npm start
```
Acesse `http://localhost:4200`. O front-end atualizará automaticamente a cada alteração no código-fonte (Hot-Reload).

## 🧹 Comandos Úteis (Docker)

Derrubar a infraestrutura mantendo os dados salvos:
```bash
docker-compose down
```

Derrubar a infraestrutura e **apagar** o banco de dados (Hard Reset):
```bash
docker-compose down -v
```

Recompilar apenas o Back-end após alterar o código Java:
```bash
docker-compose up -d --build backend
```
