import {User} from "../model/User";

export type AddJobPostingProps = {
    user: User
}

export default function AddJobPosting(props: AddJobPostingProps) {

    return (<div>
        {props.user.name}
    </div>)
}
