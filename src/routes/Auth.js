import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService } from "../fbase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
    };

    return (
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ margin: 30 }} />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue With Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue With Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;