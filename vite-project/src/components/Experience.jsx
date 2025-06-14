import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useAnimation } from 'framer-motion';

const Experience = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counterStarted, setCounterStarted] = useState(false);
  const sectionRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const isInViewport = (element, offset = 0) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight * (0.7 + offset) && rect.bottom >= 0;
    };

    const handleScroll = () => {
      if (!sectionRef.current || !textRef.current) return;

      const textRect = textRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceFromTop = textRect.top;

      let textProgress = 0;
      if (distanceFromTop <= viewportHeight * 0.8) {
        textProgress = 1 - ((distanceFromTop - viewportHeight * 0.2) / (viewportHeight * 0.6));
        textProgress = Math.max(0, Math.min(1, textProgress));
      }
      setScrollProgress(textProgress);

      if (counterRef.current && isInViewport(counterRef.current) && !counterStarted) {
        setCounterStarted(true);
        controls.start({ opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } });
      }
    };

    setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [counterStarted, controls]);

  const topText = "At Sonatek, we take pride in our extensive experience in the steel and industrial solutions sector.";
  const textDivider = Math.floor(scrollProgress * topText.length);

  return (
    <div
      ref={sectionRef}
      className="w-[96%] mx-auto pt-0 flex flex-col lg:flex-row justify-between sm:gap-10  gap-0 sm:mt-20  mt-10 border-t border-gray-200 "
    >
      {/* Left Column */}
      <div className="w-full lg:w-[40%] pt-10 sm:px-10 flex flex-col items-center  border-gray-200 lg:border-r">
        <div className="mb-6">
          {/* Work Experience Label */}
          <div className="w-52 h-12 gap-2 justify-center items-center bg-white flex border-gray-400 border rounded-full">
            <button className="text-sm font-medium">Work Experience</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
              />
            </svg>
          </div>

          {/* Animated Counter */}
          <motion.div
            ref={counterRef}
            className="flex items-end gap-2 mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
          >
            <span className="text-[160px] sm:text-[200px] font-poppins font-bold leading-[1]">
              {counterStarted ? <CountUp start={0} end={11} duration={2.5} /> : '0'}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold mb-6 text-orange-500">years</span>
          </motion.div>

          <p className="text-sm text-[#5c5c5c] font-semibold font-poppins mb-5 text-center lg:text-left">
            Where Vision Meets<br />Innovation for Your Brand.
          </p>

          {/* Logos */}
          <div className="relative flex items-center gap-4">
  {/* SAIL Logo */}
  <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full p-[2px] bg-gradient-to-r from-blue-600 to-orange-500">
    <div className="w-full h-full rounded-full overflow-hidden bg-white">
      <img src="/SAIL_Logo.PNG" alt="SAIL" className="w-full h-full object-cover" />
    </div>
  </div>

  {/* Tata Logo */}
  <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full p-[2px] bg-gradient-to-r from-blue-600 to-orange-500 -ml-6">
    <div className="w-full h-full rounded-full overflow-hidden bg-white">
      <img src="/tata-steel.jpg" alt="Tata" className="w-full h-full object-cover" />
    </div>
  </div>
</div>

          <p className="text-[#333] text-[18px] font-light font-poppins mt-5 text-center lg:text-left">
            Sustainable creativity,<br /> timeless appeal.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[60%] sm:pt-10  px-5 sm:px-10">
        <div ref={textRef} className="flex flex-col justify-center h-full">
          <p className="uppercase font-normal text-[32px] sm:text-[48px] xl:text-[64px] leading-snug font-poppins whitespace-pre-wrap break-words">
            <span className="text-gray-800">{topText.substring(0, textDivider)}</span>
            <span className="text-gray-300">{topText.substring(textDivider)}</span>
          </p>

          <p className="text-[#5c5c5c] font-poppins font-light text-[18px] sm:text-[20px] xl:text-[22px] mt-5">
            "Our customer-first approach, backed by robust supply chain management and strict quality control, has positioned Sonatek  as a trusted partner for leading construction, automotive, and infrastructure companies across India."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
