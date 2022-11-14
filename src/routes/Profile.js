import { authService } from "../fbase";
// import { useNavigate }from "react-router-dom";

const Profile = () => {
    // const History = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        // History.pushState("/");
    };

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;