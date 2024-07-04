# Projeto de Assinaturas de Serviço

Este é um projeto de backend desenvolvido como um teste para a ImMediam. O sistema permite que usuários gerenciem assinaturas de planos de serviço, que incluem cotas de um produto e uma quantidade de armazenamento em HD.

## Funcionalidades

- Exibição dos dados do usuário
- Exibição de todos os planos cadastrados
- Seleção e assinatura de um plano com pagamento fictício (tipo Pix)
- Exibição do plano atualmente contratado
- Alteração de plano com aproveitamento de crédito do plano anterior

## Tecnologias Utilizadas

- Laravel 
- PostgreSQL
- Docker
- PgAdmin

## Configuração do Ambiente

### Pré-requisitos

- Docker e Docker Compose instalados
- PHP e Composer instalados

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/https://github.com/GabrielKqw/desafio-fullstack
   cd nome-do-repositorio

# Desafios e Aprendizado

Este projeto está longe de ser perfeito, pois foi a minha primeira experiência com Laravel. Encontrei várias dificuldades ao longo do caminho>

A maior parte do conhecimento aplicado neste projeto foi obtida através de conteúdos e cursos disponíveis na internet.

 


 Como criar a tabela

 Tabela users:
SQL

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Use o código com cuidado.

2. Tabela plans:
SQL

CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Use o código com cuidado.

3. Tabela contracts:
SQL

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan_id INTEGER REFERENCES plans(id),
    start_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Use o código com cuidado.

4. Tabela payments:
SQL

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    contract_id INTEGER REFERENCES contracts(id),
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
