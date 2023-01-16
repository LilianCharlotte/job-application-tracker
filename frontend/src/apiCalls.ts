import axios from "axios";
import {User} from "./model/User";

export function getUserById(id: string) {
    return axios.get(`/api/user/${id}`)
        .then(response => response.data)
}

export function updateUser(id: string, user: User) {
    return axios.put(`/api/user/${id}`, user)
        .then(response => response.data)
}
