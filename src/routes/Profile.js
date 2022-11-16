import { authService } from "../fbase";
import { useState } from "react";
import { useNavigate }from "react-router-dom";
import { async } from "@firebase/util";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
    const history = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        //LogOut
        authService.signOut();
        //초기화면으로 이동
        history("/");
    };

    // DisplatName 설정
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }

    // Update profile
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;