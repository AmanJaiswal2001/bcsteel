import { useEffect, useRef, useState } from 'react';

const About = () => {
  const expRef = useRef(null);
  const repeatRef = useRef(null);
  const [experience, setExperience] = useState(0);
  const [repeatCustomers, setRepeatCustomers] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startExp = 0;
          let startRepeat = 0;
          const interval = setInterval(() => {
            startExp += 1;
            startRepeat += 1;

            if (startExp <= 10) setExperience(startExp);
            if (startRepeat <= 95) setRepeatCustomers(startRepeat);

            if (startExp >= 10 && startRepeat >= 95) {
              clearInterval(interval);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );

    if (expRef.current) observer.observe(expRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div>
        <div className="  w-full mb-20  pt-20 sm:pt-0">
        <div className="w-full relative">
        <img className='w-full h-full object-cover' src="/about.jpg" />
<div className='flex items-center justify-center'>
<p className='absolute text-white top-[50%] text-center font-extrabold flex items-center md:text-9xl  m-auto font-poppins'>About Us</p>
 
</div>
           </div>


  <div className=" justify-between pt-10 xl:gap-40 gap-5 p-5  flex flex-col lg:px-40   lg:flex lg:flex-row w-full">
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" */}
     


    <div className='xl:w-4/3 w-full text-wrap  flex flex-col gap-3 sm:pt-5'>
      <p className="text-5xl  font-bold font-poppins uppercase text-[#12396d] ">ABOUT OUR COMPANY  </p>
      {/* <p className="text-5xl leading-16 font-extrabold font-poppins uppercase text-[#12396d] ">for your industrial needs</p> */}
      <p className="  text-[#666666]  text-[15px] font-normal  font-poppins border-box">
      Established in 2014, Sonatek Steels Pvt. Ltd. are the distributors of flat steelproducts in Northern India. We are a one-stop solution for all flat steel product requirements and have a customer base that is spread across corporate clients,OEMs, and various industrial segments.
      </p>
      <p className="  text-[#666666]  text-[15px] font-normal  font-poppins border-box">
      We are the MOU Dealer of India’s leading steel producers, Steel Authority of India Ltd. and perform distribution for their entire range of Cold Rolled (CR) steel  products.    </p>
    </div>
    <div className='xl:w-1/3 w-full  xl:h-96'>
    <div className="flex flex-col h-full p-5  bg-[#12396d] xl:w-96 justify-center relative">
    <p className='font-bold text-lg px-12 text-white font-poppins'>Our mission</p> 
    <br></br>
    <p className='text-[16px] font-normal text-white xl:mt-5 px-10'>is to maintain customer satisfaction through constant improvement
and modernization of our products. Through our team of experienced and
qualified professionals, we aim to engineer excellence in everything we do.</p>

<hr className='w-10 xl:mt-10 mt-5 border-b-4   text-white mx-10'></hr>

  {/* <iframe
    src="https://www.instagram.com/reel/DIwB0C2yVux/embed"
    width="800"
    height="400"
    frameBorder="0"
    allowFullScreen
    className="rounded-lg shadow-md"
  ></iframe> */}
</div>
</div>
  </div>


  <div className=" justify-between pt-10 gap-5 flex flex-col  lg:flex lg:flex-row w-full">
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" */}
     


      <div className='xl:w-[57%] w-full text-wrap flex flex-col sm:pt-5'>
      <div className='w-full h-full relative '>
        <img className='w-full object-cover h-full transition-transform duration-500 ease-in-out hover:scale-110'
        
         src="/Galvalume.webp" />
        <div className='flex absolute bottom-0 right-0'>
          <div ref={expRef} className='w-48 h-48 bg-[#12396d] flex flex-col'>
            <p className='font-poppins text-5xl text-white text-center pt-10'>{experience}+</p>
            <p className='font-poppins text-lg text-center text-white w-32 pl-10'>YEARS OF EXPERIENCE</p>
          </div>

          <div ref={repeatRef} className='w-48 h-48 bg-black flex flex-col'>
            <p className='font-poppins text-5xl text-center text-white pt-10'>
              {repeatCustomers}
              <span className='text-white'>%</span>
            </p>
            <p className='font-poppins text-lg text-center text-white w-32 pl-10'>REPEAT CUSTOMERS</p>
          </div>
        </div>
      </div>
    </div>


    <div className='xl:w-1/2 w-full pr-10  xl:h-96'>
    <div className="flex flex-col xl:mt-20 pl-8 xl:pl-16 h-full xl:w-full justify-center relative">
    <p className='font-medium text-lg  text-gray-600 font-poppins'> What We Do?  </p> 
    <br></br>
    <p className='text-4xl font-bold text-black mt-5 '>We Provide Comprehensive Range Of Steel Products            </p>
<p className='font-normal text-sm  pt-2 text-gray-600 font-poppins mt-5'>We supply the complete product range of SAIL, including Cold Rolled (CR)
Coils/Sheets, Hot Rolled (HR) Coils & Sheet\Plates, HSM Plates and Chequered
Plates of any grade/specification. We pride ourselves on being the largest
stockists in Northern India who have the entire range of Flat Steel Products in
their product portfolio.	</p>
<p className='text-black font-poppins font-bold mt-5 '> Made for Life, Your Supplier of Choice</p>
<hr className='w-[100%] mt-5 border-b-2 text-gray-100   '></hr>
<p className='font-normal text-sm  mt-5 text-gray-600 font-poppins'>By selecting Sonatek Steels as your supplier, you make the choice of innovative and high-performance solutions and local technical assistance to support you in your projects.</p>
 
</div>
</div>
  </div>



  <div className=" justify-between pt-5 sm:pt-0  flex flex-col  lg:flex lg:flex-row-reverse w-full">
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" */}
     


    <div className='lg:w-[49%] w-full xl:pl-5 text-wrap flex flex-col  '>
     <div className='w-full   relative '>
     <img className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 ' src="/coil-steel.jpg"/>
     
     
     </div>
    
     
     
     
     
     
     
      </div>



    <div className='xl:w-1/2 w-full   xl:h-96'>
    <div className="flex flex-col h-full pt-5 xl:pt-0 pl-5  sm:pl-20 xl:w-full justify-center relative">
    <p className='font-medium text-lg  text-gray-600 font-poppins'> Leadership With A Vision </p> 
    <br></br>
    <p className='text-4xl font-bold text-black mt-5 '>Our Management       </p>
<p className='font-normal text-sm  pt-2 text-gray-600 font-poppins mt-5'>Our team works as a partner to develop the relationship and at the same time delivering results. We have highly qualified management, using time and timely product delivery based model. We are also specialized in providing personalize service to our customers in this area. Our team is a mix of one of the strongest leaders in this industry. 
their product portfolio.	</p>
{/* <p className='text-black font-poppins font-bold mt-5 '> Made for Life, Your Supplier of Choice</p>
<hr className='w-[100%] mt-5 border-b-2 text-gray-100   '></hr>
<p className='font-normal text-sm  mt-5 text-gray-600 font-poppins'>By selecting Sonatek Steels as your supplier, you make the choice of innovative and high-performance solutions and local technical assistance to support you in your projects.</p>
  */}
</div>
</div>
  </div>


{/* section 3 */}


<div className=" justify-between   flex flex-col  lg:flex lg:flex-row w-full">
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" */}
     


    <div className='xl:w-[55%] pt-5 xl:pt-0 w-full text-wrap flex flex-col  '>
     <div className='w-full  h-full  relative '>
     <img className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110' src="/health.jpg"/>
     
     
     </div>
    
     
     
     
     
     
     
      </div>



    <div className='xl:w-1/2 w-full pr-10  xl:h-96'>
    <div className="flex flex-col h-full pt-5 xl:pt-0 pl-5 xl:pl-20 xl:w-full justify-center relative">
    <p className='font-medium text-lg  text-gray-600 font-poppins'>Technical Solutions</p> 
    <br></br>
    <p className='text-4xl font-bold text-black mt-5 '>Health & Safety      </p>
<p className='font-normal text-sm  pt-2 text-gray-600 font-poppins mt-5'>Safety is the utmost priority at Sonatech Steels. Everyone adheres to the policies and guidelines to ensure their well-being and the welfare of other people, property and environment. 	</p>
<div className='pt-5 flex flex-col  justify-center gap-2'>


<div className='flex gap-2  '>
<svg className='  text-[#12396d] sm:w-5 sm:h-5 w-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
<p className='font-poppins sm:text-sm  text-[12px] font-normal '>Comply with applicable legislation, protocols and regulations</p>
</div>
<div className='flex gap-2 '>
<svg className=' text-[#12396d] sm:w-5 sm:h-5 w-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
<p className='font-poppins sm:text-sm  text-[12px] font-normal '>
Report workplace hazards and take proactive action to mitigate potential incidents </p>
</div>

<div className='flex gap-2  '>
<svg className=' text-[#12396d] sm:w-5 sm:h-5 w-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
<p className='font-poppins sm:text-sm  text-[12px] font-normal '>Maintain fire protection and other emergency systems and facilities</p>
</div>
<div className='flex gap-2 '>
<svg className=' text-[#12396d]  sm:w-5 sm:h-5 w-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
<p className='font-poppins sm:text-sm  text-[12px] font-normal '>Regular checking of internaional safety standards and procedures</p>
</div>
<div className='flex gap-2 '>
<svg className='sm:w-5 sm:h-5  w-5 text-[#12396d] ' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
<p className='font-poppins sm:text-sm  text-[12px] font-normal '>Maintain Occupation Health Center (OHC)</p>
</div>
</div>

</div>
</div>
  </div>

</div>
    </div>
  )
}

export default About