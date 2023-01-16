import {useEffect, useState} from "react";
import {User} from "../model/User";
import {getUserById, updateUser} from "../apiCalls";
import {ColumnStatus} from "../model/JobPosting";

export default function useUser(id: string) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        if (id) {
            findUserById(id)
        }
    }, [id])

    function findUserById(id: string) {
        getUserById(id)
            .then(data => setUser(data))
            .catch(console.error)
    }

    function updateJobPostingStatus(jobPostingId: string, laneToMoveTo: ColumnStatus) {
        if (!user) {
            console.warn("User is undefined.");
            return;
        }

        const jobPostings = user.jobPostings;
        const jobPostingIndex = jobPostings.findIndex(jobPosting => jobPosting.id === jobPostingId);
        jobPostings[jobPostingIndex].status = laneToMoveTo

        const updatedUser: User = {...user, jobPostings};
        setUser(updatedUser);

        updateUser(user.id, updatedUser)
            .then(user => setUser(user))
            .catch(console.error);
    }

    return {user, updateJobPostingStatus};
}
