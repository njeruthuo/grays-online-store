import { Bounce, ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";
import { useIdleTimer } from "react-idle-timer";

import Routing from "./Routing";
import { RootState } from "@/state/store/store";

const App = () => {
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  useIdleTimer({ disabled: !loggedIn });

  return (
    <div className="min-h-screen base-color">
      <Routing />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
export default App;
