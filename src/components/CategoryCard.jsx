import React from 'react'
import { useNavigate } from 'react-router-dom'
function CategoryCard({category}) {
const navigate = useNavigate();
  if (!category) {
    return null; // أو <div>جار التحميل...</div>
  }
const handleCategoryClick = () => {
 
  // التنقل إلى صفحة الصنف
  navigate(`/category/${category.slug}`);
};
  return (
  
<div className="">
    <div
     onClick={handleCategoryClick}
    
      className="border rounded-2xl py-3  text-center transition-all duration-500  hover:shadow-lg hover:border-red-400 hover:text-red-500 cursor-pointer md:w-[190px] md:h-[170px]  overflow-hidden"
    >
      <img
         src={category.image}
        alt={category.name}
        className="mx-auto w-55 h-32 object-contain transition-all duration-500 hover:scale-110"
      />
      <p className=" text-black text-sm">{category.name}</p>
   
 </div>
</div>
  )
}

export default CategoryCard