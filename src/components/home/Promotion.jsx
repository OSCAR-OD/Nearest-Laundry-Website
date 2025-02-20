import * as React from "react";
import satisfied from '../assets/img/satisfied.png';
import fastDelivery from '../assets/img/fastDelivery.png';
import delivery from '../assets/img/delivery.png';
import support from '../assets/img/support.png';
import eco from '../assets/img/eco.png';
import sustainable from '../assets/img/sustainable.png';
import hygiene from '../assets/img/hygiene.png';
import pickUp from '../assets/img/pickUp.png';
import Image from "next/image";
const Promotion = () => {
    return (
        <section className="container postcode-section mt-5 mt-md-5">
            <div className="row py-3">
                <div className="d-flex flex-wrap flex-row justify-content-evenly">
                    <div>
                        <Image src={satisfied} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>100% Customer <br/> Satisfaction</p>
                    </div>
                    <div>
                        <Image src={fastDelivery} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>24 Hours <br/> Delivery</p>
                    </div>
                    <div>
                        <Image src={support} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>24 Hours <br/> Customer Support</p>
                    </div>
                    <div>
                        <Image src={delivery} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>Next Day <br/> Delivery</p>
                    </div>
                    <div>
                        <Image src={pickUp} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>Free <br/> Pick Up</p>
                    </div>
                    <div>
                        <Image src={eco} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>Eco <br/> Friendly</p>
                    </div>
                    <div>
                        <Image src={sustainable} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>Sustainable <br/> Environment</p>
                    </div>
                    <div>
                        <Image src={hygiene} alt="100% Customer Satisfaction" className={'proportional-image'}/>
                        <p className={'promotional-title'}>Hygienic <br/> cloths wash</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Promotion;
