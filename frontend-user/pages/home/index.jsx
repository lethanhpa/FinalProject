import React, { memo } from "react";
import Slide from "./slide"
import Category from "./category";
import SellingProducts from "./selling-products";
import NewProduct from "./new-product";
import Diamond from "./diamond-jewelry";
import GoldJewelry from "./gold-jewelry";
function HomePage() {
    return (
        <>
            <Slide />
            <Category />
            <SellingProducts/>
            <NewProduct/>
            <Diamond/>
            <GoldJewelry/>
        </>
    )
}
export default memo(HomePage);