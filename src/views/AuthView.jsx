import { toast } from "react-toastify";
import Logo from "../assets/png/lunch.png";
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
      <div className="dark:bg-gray-800 bg-white rounded p-5">
        <div className="mb-10 flex items-center">
          <div>
            <img src={Logo} className="h-8 me-3" alt="Logo"/> 
          </div>
          <div className="text-white text-lg font-semibold">
            {app.name}
          </div>
        </div>

        <div>
          <div className="text-lg font-bold mb-4 text-white">Login to continue</div>
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
