FROM python:3.13.2-slim

WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y libpq-dev

# Instala dependências do Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todos os arquivos
COPY . .

# Define a porta dinamicamente
ENV APP_PORT=$APP_PORT

# Expõe a porta (opcional, apenas para documentação)
EXPOSE $APP_PORT

# Comando de execução usando a variável de ambiente
CMD ["sh", "-c", "fastapi run src/app/main.py --host 0.0.0.0 --port ${APP_PORT}"]