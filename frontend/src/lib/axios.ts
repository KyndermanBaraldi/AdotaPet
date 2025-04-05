import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Tempo limite excedido. Tente novamente.'));
        }
        if (!error.response) {
            return Promise.reject(new Error('Erro de conexão. Verifique se a API está rodando.'));
        }
        return Promise.reject(error);
    }
);

export default api; 