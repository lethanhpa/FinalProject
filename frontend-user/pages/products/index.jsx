import router from "next/router";
import React, { useState, memo, useEffect } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { Button, Divider } from "antd";
import numeral from "numeral";
import Link from "next/link";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";

function Products({ products, categories }) {
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedStone, setSelectedStone] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const totalProducts = products.length;

  const handleAddCart = (productId) => {
    addToCart(productId);
  };

  const handleShowMore = () => {
    const newVisibleProducts = visibleProducts + 20;
    const nextVisibleProducts = Math.min(newVisibleProducts, totalProducts);
    setVisibleProducts(nextVisibleProducts);
  };

  const handleCategorySelect = (categoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    setSelectedCategory(categoryId);
  };

  const handleCategoryRemove = (categoryId) => {
    const updatedCategories = selectedCategories.filter(
      (selectedId) => selectedId !== categoryId
    );
    setSelectedCategories(updatedCategories);
    setSelectedCategory("");
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  const handleStoneSelect = (stone) => {
    setSelectedStone(stone);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const filteredProductsByCategory = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  const filteredProductsByMaterial = selectedMaterial
    ? filteredProductsByCategory.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(selectedMaterial.toLowerCase())
      )
    : filteredProductsByCategory;

  const filteredProductsByStone = selectedStone
    ? filteredProductsByMaterial.filter((product) =>
        product.productName.toLowerCase().includes(selectedStone.toLowerCase())
      )
    : filteredProductsByMaterial;
  const checkPriceRange = (product, selectedPrice) => {
    // Tách lấy các giá trị tối thiểu và tối đa từ selectedPrice
    const [minPrice, maxPrice] = selectedPrice.split("-");
    const price = product.price;

    // Kiểm tra xem giá của sản phẩm có nằm trong khoảng được chọn không
    if (minPrice && maxPrice) {
      return price >= parseInt(minPrice) && price <= parseInt(maxPrice);
    } else if (minPrice) {
      return price >= parseInt(minPrice);
    } else if (maxPrice) {
      return price <= parseInt(maxPrice);
    }
  };
  const filteredProductsByPrice = selectedPrice
    ? filteredProductsByStone.filter((product) =>
        checkPriceRange(product, selectedPrice)
      )
    : filteredProductsByStone;
  const filteredProductsByKeyword = searchKeyword
    ? filteredProductsByPrice.filter((product) =>
        product.productName.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : filteredProductsByPrice;

  useEffect(() => {
    setSelectedMaterial("");
    setSelectedStone(""); // Reset selected material when selected category changes
    setSelectedPrice(""); // Reset selected material when selected category changes
  }, [selectedCategory]);
    console.log("««««« selectedCategory »»»»»", selectedCategory);

  return (
    <div className="container mt-10">
      <div className="mb-5 ">
        <div className="flex items-center justify-between mb-1 space-x-4  ">
          <div className="w-1/4">
            <select
              id="filter-category"
              name="filter-category"
              className="w-full px-2 py-1.5"
              onChange={(e) => handleCategorySelect(e.target.value)}
              value={selectedCategory}
            >
              <option value="" disabled hidden>
                Danh Mục
              </option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4">
            <select
              id="filter-material"
              name="filter-material"
              className="w-full px-2 py-1.5"
              onChange={(e) => handleMaterialSelect(e.target.value)}
              value={selectedMaterial}
            >
              <option value="" disabled hidden>
                Chất Liệu
              </option>
              <option value="vàng">Vàng</option>
              <option value="bạc">Bạc</option>
            </select>
          </div>
          <div className="w-1/4">
            <select
              id="filter-stone"
              name="filter-stone"
              className="w-full px-2 py-1.5"
              onChange={(e) => handleStoneSelect(e.target.value)}
              value={selectedStone}
            >
              <option value="" disabled hidden>
                Đá Đính Kèm
              </option>
              <option value="Kim Cương">Kim Cương</option>
              <option value="Đá">Đá</option>
            </select>
          </div>
          <div className="w-1/4">
            <select
              id="filter-price"
              name="filter-price"
              className="w-full px-2 py-1.5"
              onChange={(e) => handlePriceSelect(e.target.value)}
              value={selectedPrice}
            >
              <option value="" disabled hidden>
                Lọc Giá Sản Phẩm
              </option>
              <option value="5,000,000">Dưới 5,000,000đ</option>
              <option value="10.000.000">5,000,000đ - 10,000,000đ</option>
              <option value="20000000">10,000,000đ - 20,000,000đ</option>
              <option value="30000000">20,000,000đ - 30,000,000đ</option>
              <option value="50000000">30,000,000đ - 50,000,000đ</option>
              <option value="70000000">50,000,000đ - 70,000,000đ</option>
              <option value="100000000">70,000,000đ - 100,000,000đ</option>
              <option value="150000000">100,000,000đ - 150,000,000đ</option>
              <option value="200000000">150,000,000đ - 200,000,000đ</option>
              <option value="200000001">Trên 200,000,000đ</option>
            </select>
          </div>
          <div className="w-1/4 relative md:flex sm:justify-center border-red hidden">
            <input
              id="search"
              className="border w-full px-2 py-1.5 text-left"
              placeholder="Tìm kiếm..."
              required
              type="text"
              onChange={handleSearchInputChange}
              value={searchKeyword}
            />

            <button
              type="submit"
              id="search"
              aria-label="search"
              className="absolute right-2.5 mt-1.5 mr-1"
            >
              <Search className="text-primry" />
            </button>
          </div>
        </div>
        {selectedCategories.length > 0 && (
          <div className="flex items-center mb-5">
            <span className="mr-2">Đã chọn:</span>
            {selectedCategories.map((categoryId) => {
              const category = categories.find(
                (category) => category._id === categoryId
              );
              return (
                <div key={categoryId} className="flex items-center mr-2">
                  <span>{category.name}</span>
                  <button
                    className="ml-1 text-red-500"
                    onClick={() => handleCategoryRemove(categoryId)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
        {filteredProductsByKeyword.slice(0, visibleProducts).map((item) => (
          <div
            key={item._id}
            className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center"
            style={{
              background: "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
            }}
          >
            <div className="group relative inline-flex justify-center overflow-hidden items-center">
              <Link href={`/${item.id}`}>
                <img
                  src={`${API_URL}/${item.imageUrl}`}
                  alt={`slide-${item.id}`}
                  className="hover:-translate-y-1 hover:scale-105  duration-300 sm:w-full sm:block flex items-center w-[7.5rem] object-contain"
                />
              </Link>
              <div className="!absolute h-10  text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
                <button
                  type="button"
                  className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
                  onClick={handleAddCart}
                >
                  <ShoppingCart />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
            {item.discount > 0 && (
              <span className="!absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
                -{item.discount}%
              </span>
            )}
            <div className="flex flex-col gap-[6px]">
              <p className="font-roboto text-sm font-normal flex justify-center xxl:truncate text-center">
                {item.productName}
              </p>
              <span className="font-roboto text-sm font-normal flex justify-center">
                {item.code}
              </span>
              <div className="flex justify-around">
                {item.discount ? (
                  <>
                    <span className="font-roboto text-sm flex justify-center text-primry font-semibold">
                      {numeral(
                        item.price - (item.price * item.discount * 1) / 100
                      ).format("0,0")}
                      đ
                    </span>
                    <span className="font-roboto text-sm flex justify-center text-gray line-through">
                      {numeral(item.price).format("0,0")}đ
                    </span>
                  </>
                ) : (
                  <p className="font-roboto text-sm flex justify-center text-primry font-semibold">
                    {numeral(item.price).format("0,0")}đ
                  </p>
                )}
              </div>
              <Divider>
                <Button
                  // type="primary"
                  className="bg-slate-800 text-white hover:bg-white hover:text-black"
                  onClick={() => {
                    router.push(`/${item.id}`);
                  }}
                >
                  Chi tiết
                </Button>
              </Divider>
              {/* <div className="flex justify-between px-[0.5rem]">
                  <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                      <p>{item.rating.rate}</p>
                      <p>({item.rating.count})</p>
                  </div>
                  <p className="font-roboto text-sm opacity-50 font-normal">{item.sell} <span>đã bán</span></p>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <span className="flex justify-center font-elle mt-7 mb-3">
        {/* Hiển thị {products.length}/{totalProducts} */}
      </span>
      {filteredProductsByCategory.length > visibleProducts && (
        <button
          className=" block mx-auto py-3 px-5 mb-10 border border-primry text-black bg-white hover:bg-primry hover:text-white transition-colors duration-300"
          onClick={handleShowMore}
        >
          XEM THÊM SẢN PHẨM
        </button>
      )}
    </div>
  );
}

export default memo(Products);

export async function getStaticProps() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      axiosClient.get("/products"),
      axiosClient.get("/categories"),
    ]);

    return {
      props: {
        products: productsResponse.data,
        categories: categoriesResponse.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
