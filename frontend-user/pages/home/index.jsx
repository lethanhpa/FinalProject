import React, { memo } from "react";
import Slide from "./slide"
import SellingProducts from "./selling-products";
import NewProduct from "./new-product";
import Diamond from "./diamond-jewelry";
import GoldJewelry from "./gold-jewelry";
import SliverJewelry from "./silver-jewelry";

function HomePage() {
    return (
        <>
            <Slide />
            <SellingProducts/>
            <NewProduct/>
            <Diamond/>
            <GoldJewelry/>
            <SliverJewelry />
        </>
    )
}
export default memo(HomePage);