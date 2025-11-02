import React from 'react'
function CategoryCardSkeleton() {
 return (
    <div className="animate-pulse bg-white rounded-2xl shadow p-4 flex flex-col items-center space-y-4">
    <div className="bg-gray-300 h-32 w-full rounded-lg"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div> 
 )
  



}

export default CategoryCardSkeleton
