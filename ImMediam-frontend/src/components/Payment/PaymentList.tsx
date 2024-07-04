import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { paymentService } from "../../services/paymentService";

interface Payment {
    id: number;
}

function PaymentList() {
    const { contractId: contractIdParam } = useParams();
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchPayments = async () => {
            if (contractIdParam) {
                const contractId = parseInt(contractIdParam, 10);
                try {
                    const data = await paymentService.getPaymentsByContract(
                        contractId
                    );
                    setPayments(data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error("ID do contrato não encontrado.");
            }
        };

        fetchPayments();
    }, [contractIdParam]);

    return (
        <div>
            <h2>Pagamentos do Contrato</h2>
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id}>
                        <p>ID do Pagamento: {payment.id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentList;
