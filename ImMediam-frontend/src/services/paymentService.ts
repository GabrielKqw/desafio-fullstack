import api from "./api";

export const paymentService = {
    getPaymentsByContract: async (contractId: number) => {
        const response = await api.get(`/contracts/${contractId}/payments`);
        return response.data;
    },
    confirmPayment: async (paymentId: number) => {
        const response = await api.put(`/payments/${paymentId}`);
        return response.data;
    },
};
