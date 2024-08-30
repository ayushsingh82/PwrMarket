import React from "react";
import { useAccount } from "wagmi";

const gradientStyle = {
  background:
    "linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)",
  height: "4px",
  width: "100%",
  border: "none",
};

function Navbar() {
  const { address, isConnected } = useAccount();
  return (
    <navbar className="sticky top-0 z-50">
      <div className="flex flex-row mx-auto px-[40px] py-[20px] justify-between items-center mt-[0px] bg-black ">
        <div className="flex flex-row items-center flex-start font-bold text-2xl text-purple-400">
          <img src="logo.png" className="w-[80px] h-[80px] filter-invert" alt="Logo"/>
          <a href="/">PWR-Market</a>
        </div>
        <div className="flex items-center space-x-8">
          <h1 className="font-medium text-xxl text-white">
            <a href="/pwr">PWR</a>
          </h1>
          <h1 className="font-medium text-xxl text-white">
            <a href="/dashboard">Dev Dashboard</a>
          </h1>
          <h1 className="font-medium text-xxl text-white">
            <a href="/landing">Campaigns</a>
          </h1>
          <button className="flex items-center space-x-2 bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600">
            <img 
              src="data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20id%3D%22WOM-Logo%22%3E%3Cpath%20id%3D%22Vector%22%20d%3D%22M59.92%205H10.019l11.269%2020.348L7%2049.734%2021.246%2074l14.126-24.426-14.045-24.186H48.25L35.372%2049.574h24.549L73%2025.388%2059.92%205Z%22%20fill%3D%22%23000%22%20stroke%3D%22%23fff%22%20stroke-miterlimit%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt="PWR Logo"
              className="w-6 h-6"
            />
            <span>Connect</span>
          </button>
        </div>
      </div>
      <div style={gradientStyle} />
    </navbar>
  );
}

export default Navbar;
