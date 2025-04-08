import React from "react";
import AddLeak from "../../modules/leaks/add-leak";
import * as jwt_decode from "jwt-decode";

interface JwtPayload {
  nickname: string;
}

const AdminPanel: React.FC = () => {
  const getNickname = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwt_decode.jwtDecode(token);
      return decodedToken?.nickname ?? "";
    }
    return "";
  };

  return (
    <div className="text-white">
      <div className="flex justify-between p-7 border-b-2 border-white">
        <h1 className="text-4xl font-bold">Welcome to the admin panel</h1>
        <h2 className="text-2xl font-bold">
          {getNickname()}
          <span className="text-slate-400 font-semibold"> (admin)</span>
        </h2>
      </div>
      <AddLeak />
    </div>
  );
};

export default AdminPanel;
