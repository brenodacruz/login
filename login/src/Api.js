// src/api.js
export const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost/login/api.php'); // URL da sua API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return Array.isArray(data) ? data : []; // Garantir que sempre retorne um array
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Retornar um array vazio em caso de erro
    }
};
