import '../CSS/Home.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate} from "react-router-dom";

function UserPage() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  if(!user)
  {
    navigate("/");
  }

  return (
    <div className="UserPage">
        HELLO THIS IS HOMEPAGE WELCOME TO MY WEBSITE TYVM FOR VISITING YOU ARE AMAZING GG
    </div>
  );
}

export default UserPage;
