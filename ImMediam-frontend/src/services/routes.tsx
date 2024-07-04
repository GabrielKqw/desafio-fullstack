import { Routes, Route } from "react-router-dom";
import UserList from "../components/User/UserList";
import PlanList from "../components/Plan/PlanList";
import ContractList from "../components/Contract/ContractList";
import ContractForm from "../components/Contract/ContractForm";
import PaymentConfirmation from "../components/Payment/PaymentConfirmation";
import Home from '../components/home/Home'; 

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/plans" element={<PlanList />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contracts/new/:userId?" element={<ContractForm />} />
            <Route
                path="/payments/:paymentId/confirm"
                element={<PaymentConfirmation />}
            />
        </Routes>
    );
}

export default AppRoutes;
