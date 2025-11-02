import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-[100px] text-pink-900 font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500"> Page Not Found</p>
      
    </div>
  );
}

export default NotFound;
