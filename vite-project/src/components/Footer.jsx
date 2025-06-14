import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareYoutube, faLinkedin, faSquareInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full  bg-white  '>
      <footer className=" gap-5 w-full bottom-0 h-full justify-between font-poppins bg-[linear-gradient(to_right,_#000000,_#111111cc,_#000000)] text-white   pt-5">

        {/* <nav className='flex flex-col sm:justify-center sm:items-center gap-5 w-56 col-span-2 sm:col-span-auto pt-2'>
          <img src="/Group 611.png" className='w-56' alt="Sonatek Logo" />
          <div className='flex sm:justify-center justify-items-start  gap-5 w-40'>
          <a className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"/>
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z" />
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h7.621v-6.961h-2.343v-2.725h2.343v-2.005c0,-2.324 1.421,-3.591 3.495,-3.591c0.699,-0.002 1.397,0.034 2.092,0.105v2.43h-1.428c-1.13,0 -1.35,0.534 -1.35,1.322v1.735h2.7l-0.351,2.725h-2.365v6.965h3.586c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2z" />
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302v3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z" />
                  </g>
                </svg>
              </a>
          </div>
        </nav> */}
<section className="grid grid-cols-1   pb-2 sm:flex sm:flex-row sm:gap-5 gap-5 w-full bottom-0 h-full justify-between font-poppins" >
      <div className='w-full '>
      <div className='grid grid-cols-2 px-5   sm:flex sm:flex-row justify-between lg:px-20 gap-10 sm:gap-5 w-full'>
        <nav className='flex flex-col sm:w-1/4  gap-3'>
          <h3 className="text-lg text-white font-semibold">Buy online</h3>
          <Link to="/hotRolled/sheet" className="text-white hover:underline font-light text-sm">Hot Rolled Sheets</Link>
          <Link to="/hotRolled/coils" className="text-white hover:underline font-light text-sm">Hot Rolled Coils</Link>
          <Link to="/coldRolled/sheet" className="text-white hover:underline font-light text-sm">Cold Rolled Sheets</Link>
          <Link to="/coldRolled/coils" className="text-white hover:underline font-light text-sm">Cold Rolled Coils</Link>
        </nav>

        <nav className='flex flex-col sm:w-1/4 gap-3'>
          <h3 className="text-lg text-white font-semibold">Sonatek</h3>
          <Link to="/about" className="text-white hover:underline font-light text-sm">About us</Link>
          <Link to="/allblogs" className="text-white hover:underline font-light text-sm">Blogs</Link>
          {/* <Link to="#" className="text-white hover:underline font-light text-sm">Sitemap</Link> */}
          {/* <Link to="#" className="text-white hover:underline font-light text-sm">Sonatek</Link> */}
        </nav>

        <nav className='flex flex-col sm:w-1/4 gap-3  '>
          <h3 className="text-lg text-white font-semibold">Policy</h3>
          <a className="text-white hover:underline font-light text-sm">Terms & Conditions</a>
          <a href='/privacy' className="text-white hover:underline font-light text-sm">Privacy Policy</a>
          <a className="text-white hover:underline font-light text-sm">Return Policy</a>
        </nav>
</div>
<div className='sm:flex hidden justify-left sm:px-20 mt-5'>
<img src="/Group 611.png" className='w-full' alt="Sonatek Logo" />
         
</div>
</div>

        <nav className='flex flex-col sm:w-1/2 gap-3 px-5  sm:border-l-1 sm:px-10 sm:border-l-gray-50'>
          <h3 className="text-lg text-white font-semibold">Support</h3>
          <a href="tel:+919891998846" className="flex gap-2 items-center">
            <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"/>
            </svg>
            <span className="text-white hover:underline font-light text-sm">+91-9891998846</span>
          </a>
          <a href="mailto:sonateksteels@gmail.com" className="flex gap-2 items-center">
            <svg className='text-white  sm:w-6 ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4z"/>
            </svg>
            <span className="text-white  w-52 hover:underline font-light text-sm  overflow-hidden whitespace-nowrap text-ellipsis" title="sonateksteels@gmail.com">
                    sonateksteels@gmail.com
                  </span>   </a>
          <a href="https://maps.app.goo.gl/7yYhBbbtVX3gRJMQ9?g_st=com.google.maps.preview.copy" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center">
            <svg className='text-white  sm:w-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2h.5q.25 0 .5.05v2.025q-.25-.05-.488-.063T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35q3.05-2.8 4.525-5.087T18 10.2V10h2v.2q0 2.5-1.987 5.438T12 22m0-10q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m6-4h2V5h3V3h-3V0h-2v3h-3v2h3z"/>
            </svg>
            <span className="text-white hover:underline font-light text-sm">X-7, Loha Mandi, Naraina, New Delhi - 110028</span>
          </a>
          {/* <iframe
  title="Sonatek Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.177416217808!2d77.12863467544926!3d28.64403307564907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0346b30ab7fb%3A0x59f12276fefde7f4!2sX-7%2C%20Loha%20Mandi%2C%20Naraina%2C%20New%20Delhi%2C%20Delhi%20110028!5e0!3m2!1sen!2sin!4v1715687450919!5m2!1sen!2sin"
  width="100%"
  height="100"
  className="rounded-md border-0"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/> */}
<a href="https://maps.app.goo.gl/7yYhBbbtVX3gRJMQ9?g_st=com.google.maps.preview.copy" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center">
       
<div className='flex justify-left w-full sm:h-28 h-full rounded-lg mt-0'>
<img src="/map.png" className='w-full f-full object-cover rounded-lg' alt="Sonatek Logo" />
         
</div>
</a>

        </nav>

        <div className='flex sm:hidden justify-left px-5 sm:px-20 sm:mt-5'>
<img src="/Group 611.png" className='w-full' alt="Sonatek Logo" />
         
</div>
<div className='sm:hidden flex w-full justify-center  gap-5'>
              <a target='_blank' href='https://www.youtube.com/channel/UCUmUCit141YxyIbTmjioJfA' className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"/>
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.instagram.com/sonateksteels/" className="link link-hover" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.facebook.com/people/Sonatek-Steels-Private-Limited/61557799228243/" className="link link-hover" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h7.621v-6.961h-2.343v-2.725h2.343v-2.005c0,-2.324 1.421,-3.591 3.495,-3.591c0.699,-0.002 1.397,0.034 2.092,0.105v2.43h-1.428c-1.13,0 -1.35,0.534 -1.35,1.322v1.735h2.7l-0.351,2.725h-2.365v6.965h3.586c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.linkedin.com/in/adish-jain-b10107310/?originalSubdomain=in" className="link link-hover" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302v3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z" />
                  </g>
                </svg>
              </a>
            </div>
</section>

     
      </footer>
     

      <div className='h-16  w-full sm:px-24     bg-black   flex sm:justify-between  items-center'>
      <div className='sm:flex w-full hidden   gap-5'>
              <a target='_blank' href='https://www.youtube.com/channel/UCUmUCit141YxyIbTmjioJfA' className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"/>
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.instagram.com/sonateksteels/" className="link link-hover" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.facebook.com/people/Sonatek-Steels-Private-Limited/61557799228243/" className="link link-hover" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h7.621v-6.961h-2.343v-2.725h2.343v-2.005c0,-2.324 1.421,-3.591 3.495,-3.591c0.699,-0.002 1.397,0.034 2.092,0.105v2.43h-1.428c-1.13,0 -1.35,0.534 -1.35,1.322v1.735h2.7l-0.351,2.725h-2.365v6.965h3.586c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.linkedin.com/in/adish-jain-b10107310/?originalSubdomain=in" className="link link-hover" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302v3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z" />
                  </g>
                </svg>
              </a>
            </div>
       
        <hr className=' bg-white'></hr>
        <div className=' flex sm:justify-center px-2'>
        <p className='text-white sm:w-[280px] font-poppins text-sm pt-2'>© Copyright 2025 Sonatek. Designed by</p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://ganesyx.com/'
          className='text-white font-bold  font-poppins mx-0 text-sm pt-2 hover:underline'>Ganesyx
        </a>
        </div>
       
      </div>
    </div>
  )
}

export default Footer
