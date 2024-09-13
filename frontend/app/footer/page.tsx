"use client"
import React from 'react';
import "./foot.css"
import Image from 'next/image';

import logo from "./imgs/logo.png"

interface FooterNavItem {
    href: string;
    name: string;
}

interface FooterNavSection {
    label: string;
    items: FooterNavItem[];
}

const footerNavs: FooterNavSection[] = [
    {
        label: "CUSTOMER SERVICES",
        items: [
            {
                href: '/contact',
                name: 'Contact'
            },
            {
                href: '/whyUs',
                name: 'Why us'
            },
            {
                href: '',
                name: 'Accessibility'
            },
   
        ],
        
    },
    {
        label: "SUPPORT",
        items: [
            {
                href: 'https://www.instagram.com/moa_collectionn/',
                name: 'Instagram'
            },
            {
                href: 'https://www.tiktok.com/@moa_collection?_t=8bAV5i6nF2r&_r=1',
                name: 'Tiktok'
            },
            {
                href: '',
                name: 'Feedback'
            },
   
        ],
        
    },
    {
        label: "MORE INFO",
        items: [
            {
                href: '/contact',
                name: 'FAQ'
            },
            {
                href: '/whyUs',
                name: 'Privacy Policy'
            },
            {
                href: '',
                name: 'Terms of Service'
            },
   
        ],
        
    }

]

const Footer: React.FC = () => {
    const image=require('./imgs/logo.png').default
    return (
        <footer className="space ">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="justify-between items-center gap-12 md:flex">
                
                    </div> 
                <div className="flex-1 mt-8 space-y-4 justify-between sm:flex md:space-y-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4 text-white-300"
                                key={idx}
                            >
                                <h4 className="text-balck font-semibold sm:pb-2">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={el.href}
                                                className="duration-150 text-balck hover:text-gray-300"

                                            >
                                                
                                                {el.name}
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                                    <div className="flex  mt-6 md:mt-0  ">
                                  
                                    <img src={image.src} alt="image" />
                  
                </div>
                </div>  
                <div className="mt-10 py-8 border-t border-gray-700 items-center justify-between sm:flex">
                    <p className="text-black">© 2024 MOA Collection. Have nice life.</p>
                    <div className="flex items-center gap-x-6 text-black mt-6">
                        {/* <a href="">
                            <svg className="w-6 h-6 text-balck duration-150 hover:text-orange-600" fill="none" viewBox="0 0 48 48"><g clip-path="url(#a)"><path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                        </a> */}
                        <a href="https://www.tiktok.com/@moa_collection?_t=8bAV5i6nF2r&_r=1" target='_blank'>
    <svg 
        className="w-6 h-6 text-black duration-150 hover:text-orange-600" 
        fill="none" 
        viewBox="0 0 48 48"
    >
        <path 
            fill="currentColor" 
            d="M33.1,8.4c-1.9-1-3.1-2.9-3.2-5.1h-4.9v28.2c0,4.1-3.3,7.4-7.4,7.4s-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4
            c0.4,0,0.9,0,1.3,0.1v-5.1c-0.4-0.1-0.9-0.1-1.3-0.1c-6.9,0-12.5,5.6-12.5,12.5S10.4,46,17.3,46s12.5-5.6,12.5-12.5V18
            c1.8,1.1,3.9,1.7,6.1,1.7v-5.2C35.4,14.5,34.1,11.6,33.1,8.4z"
        />
        <path 
            fill="currentColor" 
            d="M31.2,0h-4.9v3.3c1.1,2.3,3.2,4.1,5.8,4.8C32,5.4,31.2,2.7,31.2,0z"
        />
    </svg>
</a>

                        <a href="https://www.instagram.com/moa_collectionn/" target='_blank'>
                            <svg className="w-6 h-6 text-black duration-150 hover:text-orange-600 " fill="currentColor" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_63)"><path d="M24 4.322c6.413 0 7.172.028 9.694.14 2.343.104 3.61.497 4.453.825 1.116.432 1.922.957 2.756 1.791.844.844 1.36 1.64 1.79 2.756.329.844.723 2.12.826 4.454.112 2.53.14 3.29.14 9.693 0 6.413-.028 7.172-.14 9.694-.103 2.344-.497 3.61-.825 4.453-.431 1.116-.957 1.922-1.79 2.756-.845.844-1.642 1.36-2.757 1.791-.844.328-2.119.722-4.453.825-2.532.112-3.29.14-9.694.14-6.413 0-7.172-.028-9.694-.14-2.343-.103-3.61-.497-4.453-.825-1.115-.431-1.922-.956-2.756-1.79-.844-.844-1.36-1.641-1.79-2.757-.329-.844-.723-2.119-.826-4.453-.112-2.531-.14-3.29-.14-9.694 0-6.412.028-7.172.14-9.694.103-2.343.497-3.609.825-4.453.431-1.115.957-1.921 1.79-2.756.845-.844 1.642-1.36 2.757-1.79.844-.329 2.119-.722 4.453-.825 2.522-.113 3.281-.141 9.694-.141zM24 0c-6.516 0-7.331.028-9.89.14-2.55.113-4.304.526-5.822 1.116-1.585.619-2.926 1.435-4.257 2.775-1.34 1.332-2.156 2.672-2.775 4.247C.666 9.806.253 11.55.141 14.1.028 16.669 0 17.484 0 24s.028 7.331.14 9.89c.113 2.55.526 4.304 1.116 5.822.619 1.585 1.435 2.925 2.775 4.257a11.732 11.732 0 004.247 2.765c1.528.591 3.272 1.003 5.822 1.116 2.56.112 3.375.14 9.89.14 6.516 0 7.332-.028 9.891-.14 2.55-.113 4.303-.525 5.822-1.116a11.732 11.732 0 004.247-2.765 11.732 11.732 0 002.766-4.247c.59-1.528 1.003-3.272 1.115-5.822.113-2.56.14-3.375.14-9.89 0-6.516-.027-7.332-.14-9.891-.112-2.55-.525-4.303-1.115-5.822-.591-1.594-1.407-2.935-2.747-4.266a11.732 11.732 0 00-4.247-2.765C38.194.675 36.45.262 33.9.15 31.331.028 30.516 0 24 0z" /><path d="M24 11.672c-6.806 0-12.328 5.522-12.328 12.328 0 6.806 5.522 12.328 12.328 12.328 6.806 0 12.328-5.522 12.328-12.328 0-6.806-5.522-12.328-12.328-12.328zm0 20.325a7.998 7.998 0 010-15.994 7.998 7.998 0 010 15.994zM39.694 11.184a2.879 2.879 0 11-2.878-2.878 2.885 2.885 0 012.878 2.878z" /></g><defs><clipPath id="clip0_17_63"><path d="M0 0h48v48H0z" /></clipPath></defs></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;