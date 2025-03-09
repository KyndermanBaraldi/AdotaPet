# Etapa 1: Usar a imagem base do Python 3.13.2
FROM python:3.13.2-slim

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema (caso precise de algum pacote, como libpq-dev para PostgreSQL)
RUN apt-get update && apt-get install -y libpq-dev

# Copiar o arquivo de requisitos do Python e instalar dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta em que o FastAPI estará rodando
EXPOSE 8000

# Rodar a aplicação com o comando fastapi
CMD ["fastapi", "run", "src/app/main.py", "--host", "0.0.0.0", "--port", "8000"]