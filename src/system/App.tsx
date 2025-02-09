import { Bounce, ToastContainer } from "react-toastify";

import Routing from "./Routing";

const App = () => {
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
