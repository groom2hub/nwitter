import { authService } from "../fbase";
import { useNavigate }from "react-router-dom";

const Profile = () => {
    const history = useNavigate();

    const onLogOutClick = () => {
        //LogOut
        authService.signOut();
        //초기화면으로 이동
        history("/");
    };

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;