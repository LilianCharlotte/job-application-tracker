import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";

export default function UserApp() {

    const {user} = useUser("1")


    return (<div>
        {user !== undefined && <JobPostingGallery user={user}/>}
        {user===undefined&&<p>User is undefined.</p>}
    </div>)

}