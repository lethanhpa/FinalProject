import React, { memo } from "react";
import { listHistory } from "../../constants/purchase-history";

function PurchaseHistory() {
  return (
    <div className="py-14  md:px-6 xl:px-20 xl:container ">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h5 className=" text-xl  leading-7 lg:leading-9 font-bold text-center font-roboto ">
          PURCHASE HISTORY
        </h5>
      </div>
      <div className="mt-10 flex flex-col  md:space-y-6 ">
        <div className="flex flex-col   justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start  px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg font-semibold leading-6 xl:leading-5 font-roboto">
              Products
            </p>
            {listHistory.map((order) => (
              <div className="mt-4 md:mt-6   flex-col  flex justify-center items-center text-center  md:flex-row   border-b   md:space-x-6  w-full   ">
                <div className="pb-4 md:pb-8 ssm:flex block w-[110px] ssm:w-[120px]  md:w-40   ">
                  <img src={order.src} alt="" />
                </div>
                <div className=" md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0 ">
                  <div className="w-full flex flex-col justify-center items-center md:items-start  space-y-8 md:w-[300px] lg:w-[500px]  ">
                    <h3 className="text-xl xl:text-xl font-semibold leading-6 font-roboto ">
                      {order.name}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm  ">
                        <span className="font-roboto">Mã: </span> {order.ma}
                      </p>
                      <p className="text-sm  ">
                        <span className="font-roboto">Size: </span> {order.size}
                      </p>
                      <p className="text-sm  ">
                        <span className="font-roboto">Quality :</span>
                        {order.quality}
                      </p>
                      <p className="text-sm  ">
                        <span className="font-roboto">Price :</span>
                        {order.price}
                      </p>
                    </div>
                  </div>
                  <div className=" justify-between  items-start md:flex block   w-full ">
                    <p className="xl:text-lg leading-6 font-roboto  mr-[40px]">
                      {order.status}
                    </p>
                    <p className="xl:text-lg  leading-6 font-roboto  mr-[40px]  xl:ml-[100px]">
                      {order.date}
                    </p>
                    <button className="bg-primry text-white font-bold py-1 px-4 md:flex block ml-auto  rounded-full  hover:bg-white hover:text-primry hover:border-primry hover:border  ">
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PurchaseHistory);
