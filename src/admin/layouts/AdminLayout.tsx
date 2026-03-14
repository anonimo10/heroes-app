import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="bg-indigo-500">
      <Outlet />
    </div>
  );
}
