import React from "react";

interface UserItemProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
}

function UserItem({ user }: UserItemProps) {
    return (
        <li>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
        </li>
    );
}

export default UserItem;
