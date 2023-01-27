import axios from "axios";
import {User} from "./model/User";
import {JobPostingRequest} from "./model/JobPosting";

export function getUserById(id: string) {
    return axios.get(`/api/user/${id}`)
        .then(response => response.data)
}

export function updateUser(id: string, user: User) {
    return axios.put(`/api/user/${id}`, user)
        .then(response => response.data)
}

export function addJobPostingToUser(userId: string, jobPostingRequest: JobPostingRequest) {
    return axios.put(`/api/user/${userId}/jobPosting`, jobPostingRequest)
        .then(response => response.data)
}

export function editJobPosting(userId: string, jobPostingId: string, jobPostingRequest: JobPostingRequest) {
    return axios.put(`/api/user/${userId}/jobPosting/${jobPostingId}`, jobPostingRequest)
        .then(response => response.data)
}

export function uploadPDF(userId: string, jobPostingId: string, pdfFile: File) {
    return axios.post(`/api/user/${userId}/jobPosting/${jobPostingId}/file`, {"file": pdfFile}, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

