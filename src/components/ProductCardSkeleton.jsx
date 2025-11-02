// components/ProductCardSkeleton.jsx
import React from "react";
import { Skeleton, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div className="border-2 rounded-xl shadow-sm bg-white animate-pulse">
      {/* صورة */}
      <div className="relative">
        <Skeleton animation="wave" variant="rectangular" width="100%" height={208}  /> {/* height = h-52 */}
      </div>

      {/* تفاصيل */}
      <div className="px-4 pb-2 pt-2 ">
        <Skeleton  animation="wave" variant="text" width="80%" height={24} className="mt-2" />
        <Skeleton  animation="wave" variant="text" width="100%" height={20} className="mt-1" />
        <Skeleton  animation="wave" variant="text" width="100%" height={16} className="mt-1" />

        <div className="flex justify-between items-center mt-3 gap-2">
          <Skeleton  animation="wave" variant="rectangular" width="40%" height={40} />
          <Skeleton  animation="wave" variant="rectangular" width="60%" height={40} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
