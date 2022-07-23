import "../CSS/UserPage.css";
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

  console.log(user);

  return (
    !user.email ? navigate("/") :
    <div className="UserPage">
      <div>
        <img src={user.reloadUserInfo.photoUrl ? user.reloadUserInfo.photoUrl : "http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png"} />
        <div>Hello {user.displayName ? user.displayName : user.email} ! </div>
        <div>Account created since: {user.metadata.creationTime.substring(0, 16)} </div>
        <div>Last login: {user.metadata.lastSignInTime.substring(0, 25)} </div>
        <Button className="page-button" onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  );
}

export default UserPage;
