import React from 'react'

const DiscountBadge = ({ oldPrice, price }) => {
  // تأكد أن القيم صالحة
  if (!oldPrice || !price || oldPrice <= price) {
    return null; // لا تُظهر الخصم إذا لم يكن هناك تخفيض فعلي
  }

  const discountPercent = (((oldPrice - price) / oldPrice) * 100).toFixed(2);

  return (
    <span className="absolute top-1 z-10 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
      {discountPercent}% OFF
    </span>
  );
};

export default DiscountBadge