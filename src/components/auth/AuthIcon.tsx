import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MyButton } from "../inputs";
import logoutIcon from "@/assets/logout.svg";
import logInButton from "@/assets/login.svg";
import profileIcon from "@/assets/account.svg";
import { logout } from "@/state/features/auth/authSlice";

const AuthIcon = ({
  is_super_user,
  authenticated,
}: {
  is_super_user: boolean;
  authenticated: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logout());
  }
  return (
    <Popover>
      <PopoverTrigger>
        <img src={profileIcon} alt="" />
      </PopoverTrigger>
      <PopoverContent>
        <div id="profile">
          {authenticated ? (
            <div className="space-y-2">
              <h4 className="font-medium leading-none">User settings</h4>

              {is_super_user && (
                <Link to={"/add"}>
                  <p className="text-gray-800 py-2 font-light">
                    Add new products
                  </p>
                </Link>
              )}

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
          ) : (
            <>
              <MyButton
                className="bg-blue-500"
                type="button"
                onClickHandler={() => navigate("/sign-in")}
              >
                <div className="flex place-items-center space-x-2">
                  <span className="text-white">Log In</span>
                  <img src={logInButton} alt="" />
                </div>
              </MyButton>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AuthIcon;
