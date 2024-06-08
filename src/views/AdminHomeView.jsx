import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminHomeContent from "../components/admin/admin-home/AdminHomeContent";

function AdminHomeView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <AdminHomeContent />
        </div>
      </div>
    </>
  );
}
  
export default AdminHomeView;
  