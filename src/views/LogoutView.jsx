import Lottie, { useLottie } from "lottie-react";
import logoutLottie from "../assets/lottie/logout.json";

function LogoutView() {
  return (
    <div className="p-10 flex flex-wrap">
      <div className="w-full text-center">
        <center>
          <Lottie animationData={logoutLottie} loop={true} className="w-1/4 bg-slate-800 rounded-lg" />
        </center>
      </div>
      <div className="mt-10 text-center w-full text-white text-2xl font-bold">
        Wait, logout in process...
      </div>
    </div>
  );
}

export default LogoutView;
