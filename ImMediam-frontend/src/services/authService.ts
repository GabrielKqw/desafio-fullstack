import api from "./api";

interface User {
    id: number;
    name: string;
    email: string;
}

export const authService = {
    login: async (credentials: any): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "João Silva",
                    email: "joao@example.com",
                });
            }, 1000);
        });
    },

    logout: async (): Promise<void> => {},

    getCurrentUser: async (): Promise<User | null> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "João Silva",
                    email: "joao@example.com",
                });
            }, 500);
        });
    },
};
