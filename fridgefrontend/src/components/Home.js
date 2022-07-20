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
        HELLO THIS IS HOMEPAGE WELCOME TO MY WEBSITE TYVM FOR VISITING YOU ARE AMAZING GG
    </div>
  );
}

export default UserPage;
