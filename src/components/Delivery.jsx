import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

const Delivery = () => {
  return (
    <div className="bg-white mx-auto shadow-sm lg:shadow- p-6 rounded-[20px] my-20  border-dashed border-2 border-pink-100 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-8 text-center md:text-left items-center">
        
        {/* Discount */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
          <Percent className="bg-pink-50 p-3 text-pink-500 rounded-lg" size={57} />
          <div>
            <h4 className="text-lg md:text-xl text-[#272343] font-medium mb-1.5">Discount</h4>
            <p className="text-gray-400 text-sm md:text-base">Every week new sales</p>
          </div>
        </div>

        {/* Free Delivery */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
          <Truck className="bg-pink-50 p-3 text-pink-500 rounded-lg" size={57} />
          <div>
            <h4 className="text-lg md:text-xl text-[#272343] font-medium mb-1.5">Free Delivery</h4>
            <p className="text-gray-400 text-sm md:text-base">100% Free for all orders</p>
          </div>
        </div>

        {/* Great Support */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
          <Clock3 className="bg-pink-50 p-3 text-pink-500 rounded-lg" size={57} />
          <div>
            <h4 className="text-lg md:text-xl text-[#272343] font-medium mb-1.5">Great Support 24/7</h4>
            <p className="text-gray-400 text-sm md:text-base">We care about your experiences</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
          <ShieldCheck className="bg-pink-50 p-3 text-pink-500 rounded-lg" size={57} />
          <div>
            <h4 className="text-lg md:text-xl text-[#272343] font-medium mb-1.5">Secure Payment</h4>
            <p className="text-gray-400 text-sm md:text-base">100% Secure Payment Method</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Delivery;
