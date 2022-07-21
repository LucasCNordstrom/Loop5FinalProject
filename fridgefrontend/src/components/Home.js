import '../CSS/Home.css';
import { useUserAuth } from "../context/UserAuthContext";

function UserPage() {
  const { logOut, user } = useUserAuth();

  return (
    <div className="UserPage">
        HELLO THIS IS HOMEPAGE WELCOME TO MY WEBSITE TYVM FOR VISITING YOU ARE AMAZING GG
    </div>
  );
}

export default UserPage;
