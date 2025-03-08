import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MyButton } from "../inputs";
import logoutIcon from "@/assets/logout.svg";
import profileIcon from "@/assets/account.svg";
import { logout } from "@/state/features/auth/authSlice";

const AuthIcon = () => {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logout());
  }
  return (
    <Popover>
      <PopoverTrigger>
        <img src={profileIcon} alt="" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2" id="profile">
          <h4 className="font-medium leading-none">User settings</h4>

          <Link to={"/add"}>
            <p className="text-gray-800 py-2 font-light">Add new products</p>
          </Link>

          <div id="profile-card" className="">
            <Link to={"/orders"}>
              <p className="text-gray-800  font-light">Check my orders</p>
            </Link>
            <hr className="my-2" />
            <MyButton
              className="bg-blue-500"
              type="button"
              onClickHandler={handleLogOut}
            >
              <div className="flex place-items-center space-x-2">
                <span className="text-white">Logout</span>
                <img src={logoutIcon} alt="" />
              </div>
            </MyButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AuthIcon;
