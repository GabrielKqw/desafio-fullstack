import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { contractService } from "../../services/contractService";
import { UserContext } from "../../context/UserContext";

interface Contract {
    id: number;
    plan_id: number;
    start_date: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 20px;
`;

const Title = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
`;

const ContractCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
    text-align: left;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const PlanIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;

    svg {
        /* Adicione seu ícone SVG aqui */
        width: 24px;
        height: 24px;
        fill: white;
    }
`;

const PlanName = styled.h3`
    color: #333;
    font-size: 18px;
    margin: 0;
`;

const ContractInfo = styled.p`
    color: #666;
    margin-bottom: 5px;
`;

function ContractList() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                if (user) {
                    const data = await contractService.getContractsByUser(
                        user.id
                    );
                    setContracts(data);
                } else {
                    setContracts([]);
                }
            } catch (error) {
                console.error("Erro ao buscar contratos:", error);
            }
        };

        fetchContracts();
    }, [user]);

    return (
        <Container>
            <Title>Meus Contratos</Title>
            {contracts.length === 0 ? (
                <p>Você não possui contratos no momento.</p>
            ) : (
                contracts.map((contract) => (
                    <ContractCard key={contract.id}>
                        <CardHeader>
                            <PlanIcon></PlanIcon>
                            <PlanName>Plano: {contract.plan_id}</PlanName>
                        </CardHeader>
                        <ContractInfo>
                            Data de Início: {contract.start_date}
                        </ContractInfo>
                    </ContractCard>
                ))
            )}
        </Container>
    );
}

export default ContractList;
