import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await authService.getCurrentUser();
                setUser(data);
            } catch (error) {}
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
