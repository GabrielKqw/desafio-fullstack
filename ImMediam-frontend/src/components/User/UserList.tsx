import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import UserItem from "../User/UserItem"; 


interface User {
    id: number;
    name: string;
    email: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        userService
            .getAllUsers()
            .then(setUsers)
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Usuários</h2>
            <ul>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
}

export default UserList;
