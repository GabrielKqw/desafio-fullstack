import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { contractService } from "../../services/contractService";
import { planService } from "../../services/planService";
import { UserContext } from "../../context/UserContext";

interface Plan {
    id: number;
    name: string;
    price: number; // Já assumimos que o preço é um número
    quotas: number;
    storage: number;
}

function ContractForm() {
    const { user } = useContext(UserContext);
    const { userId: userIdParam } = useParams();
    const navigate = useNavigate();
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        planService
            .getAllPlans()
            .then((plans) => {
                const updatedPlans = plans.map((plan: { price: string }) => ({
                    ...plan,
                    price:
                        typeof plan.price === "string"
                            ? parseFloat(plan.price.replace(",", "."))
                            : plan.price,
                }));
                setPlans(updatedPlans);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedPlanId) {
            try {
                const userId =
                    userIdParam !== undefined
                        ? parseInt(userIdParam, 10)
                        : user?.id;
                if (userId) {
                    await contractService.createContract(
                        userId,
                        selectedPlanId
                    );
                    navigate("/contracts");
                } else {
                    console.error("ID de usuário não encontrado.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="plan">Escolha um plano:</label>
            <select
                id="plan"
                value={selectedPlanId || ""}
                onChange={(e) =>
                    setSelectedPlanId(parseInt(e.target.value, 10))
                }
            >
                <option value="">Selecione um plano</option>
                {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name} - R$ {plan.price.toFixed(2)}
                    </option>
                ))}
            </select>

            <button type="submit">Criar Contrato</button>
        </form>
    );
}

export default ContractForm;
