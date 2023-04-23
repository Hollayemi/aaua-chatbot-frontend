import React from 'react';
import { Header } from '../../components/website/homeComponent';
const HomeWrapper = (prop) => {
    return (
        <section className="w-full h-screen fixed website-main-bg-image">
            <div className="absolute h-full w-full bg-white opacity-90"></div>
            <div className="absolute top-0 left-0 w-full z-50">
                <Header userData={prop.userData} admin={prop.admin} />
            </div>
            <div className="overflow-auto">{prop.children}</div>
            <h5 className="absolute bottom-0 w-full flex justify-center bg-slate-50 h-12 leading-10">
                Copyrighy @ ictac_aaua 2023
            </h5>
        </section>
    );
};

export default HomeWrapper;
