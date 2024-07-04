import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Contexto do usuário

interface PlanItemProps {
    plan: {
        id: number;
        name: string;
        price: number; // Certifique-se de que o price seja do tipo number na sua API
        quotas: number;
        storage: number;
    };
}

function PlanItem({ plan }: PlanItemProps) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Obter o usuário do contexto (opcional)

    const handleSubscribe = () => {
        navigate(`/contracts/new/${user?.id}`, { state: { plan } });
    };

    return (
        <li>
            <h3>{plan.name}</h3>
            <p>Preço: R$ {parseFloat(plan.price.toString()).toFixed(2)}</p>{" "}
            {/* Converte para número e formata */}
            <p>Cotas: {plan.quotas}</p>
            <p>Armazenamento: {plan.storage} GB</p>
            <button onClick={handleSubscribe}>Assinar</button>
        </li>
    );
}

export default PlanItem;
