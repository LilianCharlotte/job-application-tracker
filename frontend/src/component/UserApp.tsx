import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";

export default function UserApp() {

    const {user} = useUser("1")


    return (<div>
        {user ?
            <JobPostingGallery user={user}/>
            :
            <p>User is undefined.</p>
        }
    </div>)

}