import React, { useState, useEffect } from "react";
import { planService } from "../../services/planService";
import PlanItem from "../Plan/PlanItem";

interface Plan {
    id: number;
    name: string;
    price: number;
    quotas: number;
    storage: number;
}

function PlanList() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await planService.getAllPlans();
                setPlans(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("Ocorreu um erro desconhecido."));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) {
        return <div>Carregando planos...</div>;
    }

    if (error) {
        return <div>Erro ao carregar planos: {error.message}</div>;
    }

    return (
        <div>
            <h2>Planos Disponíveis</h2>
            <ul>
                {plans.map((plan) => (
                    <PlanItem key={plan.id} plan={plan} />
                ))}
            </ul>
        </div>
    );
}

export default PlanList;
