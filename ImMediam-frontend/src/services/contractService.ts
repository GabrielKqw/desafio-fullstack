import api from "./api";

export const contractService = {
    getContractsByUser: async (userId: number) => {
        const response = await api.get(`/users/1/contracts`); // Removida a URL base
        return response.data;
    },
    createContract: async (userId: number, planId: number) => {
        const response = await api.post("/contracts", {
            user_id: userId,
            plan_id: planId,
        });
        return response.data;
    },
    updateContract: async (contractId: number, newPlanId: number) => {
        const response = await api.put(`/contracts/${contractId}`, {
            plan_id: newPlanId,
        });
        return response.data;
    },
};
