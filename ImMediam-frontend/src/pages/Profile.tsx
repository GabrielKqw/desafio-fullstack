import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Button, useToast } from "@chakra-ui/react";
import api from "../../services/api";

interface Contract {
    id: number;
    plan: {
        id: number;
        name: string;
        description: string;
        price: number;
    };
    start_date: string;
    end_date: string;
}

const Profile: React.FC = () => {
    const [contract, setContract] = useState<Contract | null>(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        async function fetchContract() {
            try {
                const response = await api.get<Contract>("/user/contract"); 
                setContract(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching contract:", error);
            }
        }

        fetchContract();
    }, []);

    const handleChangePlan = async () => {
        if (!contract) return;

        try {
            const currentDate = new Date();
            const startDate = new Date(contract.start_date);
            const daysUsed = Math.ceil(
                (currentDate.getTime() - startDate.getTime()) /
                    (1000 * 3600 * 24)
            );
            const credit = (contract.plan.price / 30) * (30 - daysUsed);

            const plansResponse = await api.get("/plans");
            const plans = plansResponse.data;

            const newPlan = plans[1];

            const newPlanPrice = newPlan.price - credit;

            const payload = {
                contract_id: contract.id,
                new_plan_id: newPlan.id,
                new_plan_price: newPlanPrice,
            };

            await api.post("/user/change-plan", payload);

            setContract((prevContract) => ({
                ...prevContract!,
                plan: newPlan,
            }));

            toast({
                title: "Plan changed successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error changing plan:", error);
            toast({
                title: "Error changing plan",
                description: "Failed to change plan. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex justify="center" align="center" h="100vh">
            <Box maxW="600px" w="100%" p={8}>
                <Heading size="lg">Your Contract Details</Heading>
                {loading ? (
                    <Text>Loading...</Text>
                ) : contract ? (
                    <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
                        <Heading size="md">{contract.plan.name}</Heading>
                        <Text>Description: {contract.plan.description}</Text>
                        <Text>Start Date: {contract.start_date}</Text>
                        <Text>End Date: {contract.end_date}</Text>
                        <Text>
                            Monthly Price: R$ {contract.plan.price.toFixed(2)}
                        </Text>
                        <Button
                            colorScheme="green"
                            mt={4}
                            onClick={handleChangePlan}
                        >
                            Change Plan
                        </Button>
                    </Box>
                ) : (
                    <Text>No active contract found.</Text>
                )}
            </Box>
        </Flex>
    );
};

export default Profile;
