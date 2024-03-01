import { Button } from 'antd';
import React from 'react';
import {useRouter} from 'next/router';

function Header() {
    const router = useRouter();
    const HandleLogout = () => {
        console.log("logout");
        router.push("/login");
    }
    return (
        <div style={{
            background:
                "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
        }}>
            <div className='flex items-center justify-between container h-[70px] '>
                <div className='flex'>
                    <img
                        src="/img/logo.png"
                        alt="user"
                        title="wiicamp-logo"
                        className="md:w-[3.375rem] md:h-[3.375rem] w-[2.5rem] h-[2.5rem]"
                    />
                    <span className="items-center flex text-primry text-xl font-normal leading-7 font-roboto">
                        Jewellery
                    </span>
                </div>


                <Button type="button" className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black" onClick={HandleLogout}>Đăng xuất</Button>
            </div>
        </div>
    )
}

export default Header;