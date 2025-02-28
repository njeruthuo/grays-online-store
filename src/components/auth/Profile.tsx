import { Link } from "react-router-dom";
import { MyButton } from "../inputs";

import logoutIcon from "@/assets/logout.svg";

const Profile: React.FC<IProfile> = ({ handleLogOut, loggedIn }) => {
  return (
    <>
      {loggedIn ? (
        <div
          id="profile-card"
          className="absolute right-0 top-10 p-2 w-[200px] rounded bg-gray-300"
        >
          <Link to={'/orders'}>
            <p className="text-gray-800 text-lg font-light">Check my orders</p>
          </Link>
          <hr className="my-2" />
          <MyButton
            className="bg-blue-500"
            type="button"
            onClickHandler={handleLogOut}
          >
            <div className="flex place-items-center space-x-2">
              <p>Logout</p>
              <img src={logoutIcon} alt="" />
            </div>
          </MyButton>
        </div>
      ) : (
        <div
          id="profile-card"
          className="absolute hover:cursor-pointer text-black font-light right-0 top-10 p-2 w-[200px] rounded bg-gray-300"
        >
          <Link to={"/sign-in"}>Sign In</Link>
        </div>
      )}
    </>
  );
};
export default Profile;

interface IProfile {
  handleLogOut: () => void;
  loggedIn: boolean;
}
