import React, { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import {
    Search,
} from "lucide-react";

function Navigation() {
    const router = useRouter();
    return (<div className="flex container justify-between mt-[0.625rem] pb-[0.625rem]">
        <ul className="sm:flex xl:gap-[60px] md:gap-[20px] gap-[40px] hidden">
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/"
                    className={`flex items-center ${router.pathname === "/"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Trang chủ
                </Link>
            </li>
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/products"
                    className={`flex items-center ${router.pathname === "/products"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Sản phẩm
                </Link>
            </li>
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/wedding-jewelry"
                    className={`flex items-center ${router.pathname === "/wedding-jewelry"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Trang sức cưới
                </Link>
            </li>
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/brand"
                    className={`flex items-center ${router.pathname === "/brand"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Thương Hiệu
                </Link>
            </li>
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/promotion"
                    className={`flex items-center ${router.pathname === "/promotion"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Khuyến mãi
                </Link>
            </li>
            <li
                className={classNames(
                    "text-base font-normal font-roboto leading-7 hover:text-primary",
                )}
            >
                <Link
                    href="/contact"
                    className={`flex items-center ${router.pathname === "/contact"
                        ? "border-b-2 border-primry"
                        : ""
                        }`}
                >
                    Liên hệ
                </Link>
            </li>
        </ul>
        <div className="relative md:flex sm:justify-center border-red hidden  ">
            <input
                id="search"
                className="block p-2 text-sm border-2 border-primry rounded-full lg:w-[24rem] md:w-[14rem]"
                placeholder="Tìm kiếm nhanh...."
                required
                type="text"
            />
            <button
                type="submit"
                id="search"
                aria-label="search"
                className="text-black absolute right-2.5 lg:bottom-2.5 bottom-0.5 rounded-lg absolute:none truncate"
            >
                <Search className="text-primry" />
            </button>
        </div>

    </div>)
}

export default memo(Navigation);    