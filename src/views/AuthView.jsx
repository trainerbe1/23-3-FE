import { toast } from "react-toastify";
import Logo from "../assets/png/lunch.png";
import BgLogin from "../assets/jpg/bg-login.jpg";
import app from "../common/app";
import theme from "../common/theme";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";

function AuthView() {
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(routes.home);
    toast.success('Login success!');
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <img className="brightness-50 absolute h-screen w-screen z-0" src={BgLogin} alt="" srcSet="" />
      <div className="absolute h-screen w-screen z-0 bg-gray-800 opacity-50"></div>

      <div className="dark:bg-gray-800 bg-white rounded p-5 z-10">
        <div className="mb-10 flex items-center">
          <div>
            <img src={Logo} className="h-8 me-3" alt="Logo"/> 
          </div>
          <div className="text-white text-2xl font-bold">
            {app.name}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-6 text-white">Login to continue</div>
          <form onSubmit={onSubmit}>
            <input required type="text" className={`mb-5 ${theme.textfield}`} placeholder="Username" />
            <input required type="password" className={`mb-8 ${theme.textfield}`} placeholder="Password" />
            <button type="submit" className="w-full hover:bg-slate-500 bg-slate-700 py-2 rounded text-white font-semibold">Submit</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AuthView;
