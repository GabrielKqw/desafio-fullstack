import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Estilos do Container principal
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: "Arial", sans-serif;
`;

// Estilos do Header
const HeaderContainer = styled.header`
    background-color: #f2f2f2;
    padding: 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #ccc;
`;

const Logo = styled.img`
    height: 32px;
    margin-right: 1rem;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: bold;
`;

const NavLink = styled(Link)`
    color: #333;
    margin-left: 2rem;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

const ContentContainer = styled.main`
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const CardContainer = styled(motion.div)`
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
`;

const CardIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffd500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;

    svg {
        width: 24px;
        height: 24px;
        fill: #fff;
    }
`;

const CardContent = styled.div`
    h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

// Estilos do Footer
const FooterContainer = styled.footer`
    background-color: #28a745;
    color: white;
    padding: 1rem;
    text-align: center;
    margin-top: auto;
`;

// Componente Card
function Card({
    title,
    description,
    link,
}: {
    title: string;
    description: string;
    link: string;
}) {
    return (
        <CardContainer whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <CardIcon>{}</CardIcon>
            <CardContent>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={link}>Saiba Mais</Link>
            </CardContent>
        </CardContainer>
    );
}


function Home() {
    return (
        <MainContainer>
            <HeaderContainer>
                <Logo src="/logo.png" alt="inMediam Logo" />
                <Title>inMediam</Title>
                <NavLink to="/plans">Planos</NavLink>
                <NavLink to="/contracts">Contratos</NavLink>
            </HeaderContainer>

            <ContentContainer>
                <h2>Bem-vindo ao Sistema de Gerenciamento de Assinaturas</h2>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <Card
                        title="Planos"
                        description="Conheça nossos planos e escolha o ideal para você."
                        link="/plans"
                    />
                    <Card
                        title="Contratos"
                        description="Gerencie seus contratos e acompanhe seus pagamentos."
                        link="/contracts"
                    />
                </div>
            </ContentContainer>

            <FooterContainer>
                <p>© 2023 inMediam. Todos os direitos reservados.</p>
            </FooterContainer>
        </MainContainer>
    );
}

export default Home;
