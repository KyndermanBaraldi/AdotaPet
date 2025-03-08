# AdotaPet

## **Descrição**

O **AdotaPet** é uma plataforma web que conecta ONGs de resgate animal a possíveis adotantes. Utiliza **FastAPI** no backend e **Next.js** no frontend, além de integração com a API dos Correios para facilitar a busca por ONGs na região do usuário.

## **Objetivo**

Facilitar o processo de adoção de animais por meio de uma plataforma moderna, segura e acessível, promovendo a conexão entre ONGs e adotantes de maneira eficiente.

## **Sobre o Projeto**

Este projeto foi desenvolvido como requisito da disciplina **Projeto Integrador III** dos cursos de **Bacharelado em Tecnologia da Informação, Ciência de Dados e Engenharia da Computação** da **Universidade Virtual do Estado de São Paulo**.

---

## **Lista de Tarefas do Projeto**

### **Configuração Inicial**

- [x] Criar repositório no GitHub/GitLab
- [x] Criar estrutura de pastas:
  - `/backend` → FastAPI
  - `/frontend` → Next.js
  - `/docs` → Documentação
- [ ] Instalar e configurar FastAPI
- [x] Instalar e configurar Next.js
- [ ] **Deploy do frontend na Vercel**
- [ ] **Deploy do backend na VPS da Oracle Cloud (adotapet-api.kynderman.com.br)**

### **Planejamento e Reuniões**

- [x] **Reunião:** Identificação da comunidade externa
- [x] **Reunião:** Definição do tema, problema, título e objetivo
- [ ] **Reunião:** Comunidade externa e levantamento de requisitos
- [ ] **Reunião:** Definição das regras de negócio
- [ ] **Reunião:** Modelagem do banco de dados
- [ ] **Reunião:** Estrutura da API e integração frontend-backend
- [ ] **Reunião:** Validação da solução com comunidade externa.

### **Pesquisa bibliográgica e desenvolvimento**

- [ ] Elaboração do plano de trabalho
- [ ] Pesquisa de fontes bibliográficas
- [ ] Desenvolvimento do relatório parcial
- [ ] Desenvolvimento do relatório final
- [ ] Produção do vídeo de apresentação da solução

### **Desenvolvimento do Backend (FastAPI)**

- [ ] Criar autenticação JWT (`/auth/register`, `/auth/login`)
- [ ] Criar CRUD para ONGs (`/ongs/`, `/ongs/{id}`, `/ongs` - POST)
- [ ] Criar CRUD para animais (`/animais/`, `/animais/{id}`, `/animais` - POST)
- [ ] Integrar API dos Correios para busca por CEP (`/enderecos/{cep}`)

### ** Desenvolvimento do Frontend (Next.js)**

- [ ] Criar página inicial com lista de animais para adoção
- [ ] Criar tela de cadastro e login de usuários
- [ ] Criar dashboard para ONGs gerenciarem seus animais
- [ ] Criar página de detalhes do animal
- [ ] Criar busca de ONGs por CEP

### ** Testes e Deploy**

- [ ] Criar testes automatizados para API (pytest)
- [ ] Configurar GitHub Actions
- [ ] **Deploy do frontend na Vercel**
- [ ] **Deploy do backend na VPS da Oracle Cloud**

---

## Configurando o Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (v23.9.0)
- Python (v3.13.2)
- Git

### Configuração Inicial

1. Faça um fork do repositório
2. Clone seu fork localmente:

   ```bash
   git clone https://github.com/seu-usuario/adotapet.git
   cd adotapet
   ```

3. Configure o upstream:

   ```bash
   git remote add upstream https://github.com/KyndermanBaraldi/AdotaPet.git
   ```

4. Instale as dependências do backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

5. Instale as dependências do frontend:

   ```bash
   cd ../frontend
   npm install
   ```

6. Configure as variáveis de ambiente seguindo o arquivo `.env.example`

7. Execute os serviços localmente:

   ```bash
   # Em um terminal (backend)
   cd backend
   uvicorn app.main:app --reload

   # Em outro terminal (frontend)
   cd frontend
   npm run dev
   ```

## Processo de Contribuição

### 1. Mantenha seu Fork Atualizado

Antes de começar a trabalhar em uma nova contribuição, atualize seu fork:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Crie uma Branch

Crie uma branch para sua contribuição a partir da main:

```bash
git checkout -b feat/nome-da-funcionalidade
```

### 3. Desenvolva sua Contribuição

- Mantenha o foco da sua contribuição (uma funcionalidade por vez)
- Siga os padrões de código do projeto
- Adicione testes para novas funcionalidades
- Documente seu código

### 4. Teste Localmente

Certifique-se de que sua contribuição funciona localmente:

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

### 5. Submeta sua Contribuição

Faça commit das suas alterações e envie para seu fork:

```bash
git add .
git commit -m "feat: adiciona funcionalidade de filtro por localização"
git push origin feat/nome-da-funcionalidade
```

### 6. Crie um Pull Request

- Vá até o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione "compare across forks"
- Selecione seu fork e a branch com suas alterações
- Submeta o Pull Request para a branch `main` do repositório original

## Padrões de Código

### Backend (Python/FastAPI)

- Siga o PEP 8 para estilo de código
- Organize imports alfabeticamente

### Frontend (Next.js/React)

- Use a convenção de componentes funcionais
- Organize imports: React, bibliotecas externas, componentes internos, estilos
- Use nomes descritivos para componentes, funções e variáveis

## ** Padrão de Commits**

- `feat:` → Nova funcionalidade
- `fix:` → Correção de bug
- `docs:` → Alteração na documentação
- `style:` → Formatação, ponto-e-vírgula faltando, etc; sem alteração de código
- `refactor:` → Refatoração de código
- `test:` → Adição ou modificação de testes
- `chore:` → Alterações menores sem impacto no código (ex.: configuração)

Exemplos:

```
feat: add filter by geographic distance
fix: corrects expired token validation
docs: updates installation instructions
```
