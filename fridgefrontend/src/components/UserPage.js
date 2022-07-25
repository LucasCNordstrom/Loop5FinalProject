import "../CSS/UserPage.css";
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

  if (!user) {
    return <></>;
  }
  return (
    <div className="UserPage">
      <img
        alt="User"
        src={
          user.reloadUserInfo.photoUrl
            ? user.reloadUserInfo.photoUrl
            : "http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png"
        }
      />
      <p> Hello {user.displayName ? user.displayName : user.email} ! </p>
      <p>
        Account created since: {user.metadata.creationTime.substring(0, 16)}
      </p>
      <p>
        Account created since: {user.metadata.creationTime.substring(0, 16)}
      </p>
      <p> Last login: {user.metadata.lastSignInTime.substring(0, 25)} </p>
      <button 
        className="page-button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default UserPage;
