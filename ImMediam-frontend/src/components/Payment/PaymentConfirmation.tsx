import React from "react";
import { useParams } from "react-router-dom";
import { paymentService } from "../../services/paymentService";

function PaymentConfirmation() {
    const { paymentId: paymentIdParam } = useParams();

    const handleConfirmPayment = async () => {
        if (paymentIdParam) {
            const paymentId = parseInt(paymentIdParam, 10);
            try {
                await paymentService.confirmPayment(paymentId);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("ID do pagamento não encontrado.");
        }
    };

    return (
        <div>
            <h2>Confirmação de Pagamento</h2>
            <p>Você está prestes a confirmar o pagamento do contrato.</p>
            <button onClick={handleConfirmPayment}>Confirmar Pagamento</button>
        </div>
    );
}

export default PaymentConfirmation;
