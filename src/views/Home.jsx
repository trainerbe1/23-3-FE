import HomeContent from "../components/home/HomeContent";
import Sidebar from "../components/Sidebar";

function Home() {
    return (
      <>
        <Sidebar />

        <div class="p-4 sm:ml-64 bg-slate-900 text-slate-400 side-content">
            <HomeContent />
        </div>
      </>
    );
  }
  
  export default Home;
  