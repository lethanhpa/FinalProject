import React, { memo } from "react";
import Slide from "./slide"
import SellingProducts from "./selling-products";
import NewProduct from "./new-product";
import Diamond from "./diamond-jewelry";
import GoldJewelry from "./gold-jewelry";
import SliverJewelry from "./silver-jewelry";

function HomePage({products}) {
    return (
        <>
            <Slide />
            <SellingProducts products={products}/>
            <NewProduct/>
            <Diamond/>
            <GoldJewelry/>
            <SliverJewelry />
        </>
    )
}
export default memo(HomePage);