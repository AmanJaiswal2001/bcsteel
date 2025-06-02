// import React from 'react';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

// const cardData = [
//   {
//     title: "SAIL SeQR TMT Bars",
//     image: "/tmt-bars.png" // replace with actual image path
//   },
//   {
//     title: "TATA Tiscon",
//     image: "/tata-tiscon.png"
//   },
//   {
//     title: "JSW Neosteel",
//     image: "/jsw-neosteel.png"
//   }
// ];

// const TmtCardCarousel = () => {
//   const options = {
//     margin: 15,
//     responsiveClass: true,
//     autoplay: true,
//     loop: true,
//     dots: false,
//     responsive: {
//       0: { items: 1 },
//       600: { items: 2 },
//       1000: { items: 3 }
//     }
//   };

//   return (
//     <OwlCarousel className="owl-theme" {...options}>
//       {cardData.map((item, index) => (
//         <div className="item" key={index}>
//           <div style={styles.card}>
//             <div style={styles.cardImageContainer}>
//               <img src={item.image} alt={item.title} style={styles.image} />
//               <div style={styles.exploreBadge}>
//                 <div style={styles.exploreArrow}>↗</div>
//               </div>
//             </div>
//             <div style={styles.cardTitle}>{item.title}</div>
//           </div>
//         </div>
//       ))}
//     </OwlCarousel>
//   );
// };

// const styles = {
//   card: {
//     width: '220px',
//     textAlign: 'center',
//     fontFamily: 'Arial, sans-serif'
//   },
//   cardImageContainer: {
//     position: 'relative',
//     width: '100%',
//     overflow: 'hidden',
//     clipPath: 'ellipse(90% 75% at 50% 45%)',
//     borderRadius: '20px'
//   },
//   image: {
//     width: '100%',
//     height: 'auto',
//     display: 'block'
//   },
//   exploreBadge: {
//     position: 'absolute',
//     bottom: '10px',
//     right: '10px',
//     width: '60px',
//     height: '60px',
//     background: 'white',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
//   },
//   exploreArrow: {
//     fontSize: '20px',
//     transform: 'rotate(45deg)',
//     zIndex: 1
//   },
//   cardTitle: {
//     marginTop: '10px',
//     fontWeight: 'bold',
//     fontSize: '14px'
//   }
// };

// export default TmtCardCarousel;