import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = ({ setisAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setisAuth(true);

        localStorage.setItem("token", res.user.refreshToken);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Room</h1>
        <p>Sign In To Continue</p>
        <button onClick={handleClick}>
          <img src="google.webp" alt="" />
          <span>Sign In With Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
