import axios from "axios";

export function getUserById(id: string) {
    return axios.get(`/api/user/${id}`)
        .then(response => response.data)
}