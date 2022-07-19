import '../CSS/UserPage.css';
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="UserPage">
      <div>
        <img src='https://pbs.twimg.com/profile_images/1448696882746695683/Jp2_LEBL_400x400.jpg' />
        <div>Hello {user && user.email} ! </div>
        <div>Account created since: {user.metadata.creationTime} </div>
        <div>Last login: {user.metadata.lastSignInTime} </div>
        <Button onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}

export default UserPage;
