
import React from "react";
import Slider from "react-slick";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


const products = [
    {
      id: 1,
      // image: "/hotrolledsheet.jpg",
      label: " India’s leading supplier and stockist of Cold Rolled (CR), Hot Rolled (HR), Galvanised Iron (GI), and Hot Rolled Pickled Oil (HRPO) steel sheets and coils. ",
    },
    // {
    //   id: 2,
    //   image: "/hotsheet.jpg",
    //   label: "Hot Rolled Sheet",
    // },
    // {
    //   id: 3,
    //   image: "/cold1.jpg",
    //   label: "Cold Rolled Coil",
    // },
    // {
    //   id: 4,
    //   image: "/coil.jpg",
    //   label: "Hot Rolled Sheet",
    // },
  ];
  
  const NewCard = () => {
    const imageStyle = {
      objectFit: "cover",
      width: "450px",
      height: "400px",
      borderRadius:"10%"
    };
  
    const textStyle = {
      position: "absolute",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      fontFamily: "sans-serif",
      background: "#003375",
      top: "200px",
      left: "200px",
     
     
    };
  
    return (
      <div className="flex flex-wrap gap-2 ">
        <style>
          {`
            .inverted-radius {
              --r: 40px;
              --s: 60px;
              --x: 10px;
              --y: 10px;
  
              width: 300px;
              aspect-ratio: 1;
              background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);
              border-radius: var(--r);
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              
  
              --_m: /calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%, #0000 72%);
              --_g: conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)), #0000 25%, #000 0);
              --_d: (var(--s) + var(--r));
              mask:    calc(100% - var(--_d) - var(--x)) 100% var(--_m),
                      100% calc(100% - var(--_d) - var(--y)) var(--_m),
                      radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)),
                      var(--_g) calc(-1*var(--_d) - var(--x)) 0,
                      var(--_g) 0 calc(-1*var(--_d) - var(--y));
              mask-repeat: no-repeat;
            }
          `}
        </style>
  
        {products.map((product) => (
          <div key={product.id} className="relative flex flex-col    ">
            <div className="inverted-radius  ">
              {/* <img src={product.image} alt={product.label} style={imageStyle} /> */}
              <span className=" font-poppins font-wrap p-5 overflow-hidden text-lg font-medium">
              {product.label}
            </span>
            </div>
            <Link to="#">
            <span style={textStyle}>
            <svg className="text-[#003375] " width="50" height="50" viewBox="0 0 254 255" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M204 0.00362778L253.842 50.0261L180.604 122.998L251.077 180.462V255H180.462V123.14L50.2419 252.889L0.400116 202.866L133.132 70.615H-0.000274658V-0.000278473H204V0.00362778Z" fill="white"/>
</svg> </span>
  
            </Link>
            
            
  
            {/* <div className="bg-[#12396d] cursor-pointer w-72 rounded-full flex justify-center h-16 items-center gap-2 text-white mt-4">
              <button className="text-sm font-normal font-poppins">
                ViewBrochure
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
                />
              </svg>
            </div> */}
          </div>
        ))}
      </div>
    );
  };
  
  export default NewCard;
  





// const slides = [
//     {
//       image: "https://sail.co.in/sites/default/files/2021-01/slide1.jpg",
//       title: "Bhilai Steel Plant",
//       description: "Universal Rail Mill at Bhilai Steel Plant"
//     },
//     {
//       image: "https://sail.co.in/sites/default/files/2021-01/slide2.jpg",
//       title: "Durgapur Steel Plant",
//       description: "Wheel & Axle Plant at Durgapur Steel Plant"
//     },
//     {
//       image: "https://sail.co.in/sites/default/files/2021-01/slide3.jpg",
//       title: "Bokaro Steel Plant",
//       description: "Cold Rolling Mill at Bokaro Steel Plant"
//     }
//   ];
  




  
const images = [
   
    "/banner-07.webp",
    "/desktop__1_.webp",
    "/banner-07.webp",
    "/desktop__1_.webp",
  ];
  
  
    export const VariableWidth=()=> {
        const settings = {
            className: "slider variable-width",
            dots: true,
            infinite: true,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
          };    
          const reversedImages = [...images].reverse();
          return (
            <div className="slider-container ">
            <Slider {...settings}>
            
            {/* <div className=" flex flex-col gap-10"> */}
            {images.map((img, idx) => (
          <div key={idx} style={{ width: 1424 }} className="px-2 rounded-lg">
            <div className="rounded-2xl  shadow-lg">
              <img
                className="w-full h-96 object-cover rounded-2xl "
                src={img}
                alt={`Slide ${idx + 1}`}
              />
            </div>
          </div>
        ))}
              {/* </div> */}
              {/* <div style={{ width: 225 }}>
                <p>225</p>
              </div>
              <div style={{ width: 175 }}>
                <p>175</p>
              </div> */}
            </Slider>
          </div>
        );
      };
      
       



 

