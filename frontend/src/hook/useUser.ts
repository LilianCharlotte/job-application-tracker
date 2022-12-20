import {useEffect, useState} from "react";
import {User} from "../model/User";
import {getUserById} from "../apiCalls";

export default function useUser(id: string) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        if (id) {
            findUserById(id)
        }
    }, [id])

    function findUserById(id: string) {
        getUserById(id)
            .then(data => setUser(data.data))
            .catch(console.error)
    }

    return {user};
}