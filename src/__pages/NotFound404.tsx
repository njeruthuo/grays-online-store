import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p>Page not found</p>
      <Link to={"/"} className="text-blue-500">
        Go to home page
      </Link>
    </div>
  );
};
export default NotFound404;
