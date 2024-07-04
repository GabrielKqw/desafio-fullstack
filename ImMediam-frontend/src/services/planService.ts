import api from "./api";

export const planService = {
    getAllPlans: async () => {
        const response = await api.get("/plans");
        return response.data;
    },
};
