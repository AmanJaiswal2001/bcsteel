import React, { useRef } from 'react';
import Crousel from './Crousel';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import NewCard, { VariableWidth } from './NewCard';
import Marquee from "react-fast-marquee";
import Numbers from './Numbers';
import { Testimonial } from './Testimonial';
import ConstructionAwardsSection from './ConstructionAwardsSection';
import { Expandingcard } from './Expandingcard';
import { BlogCard } from './BlogCard';
import Founder from './Founder';
import ColorChangeOnScroll from './ColorChangeOnScroll';
import Sliderbaner from './Sliderbaner';
import Experience from './Experience';

const Home = () => {
  const awardsRef = useRef(null);
  const bannerRef = useRef(null);

  const handleSliderComplete = () => {
    awardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    bannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen  overflow-x-hidden scroll-smooth snap-y snap-mandatory">
   {/* Carousel Section */}
   <section className="snap-start w-full h-auto sm:h-screen overflow-hidden">
        <Crousel />
      </section>

      {/* Expanding Cards + Scroll Section */}
      <section ref={bannerRef} className="bg-gray-50 w-full overflow-hidden">
        <ColorChangeOnScroll />
        <div className="w-full  mx-auto px-0 sm:px-6 lg:px-8 py-10">
          <Expandingcard />
        </div>
      </section>

      {/* Slider Section */}
      <section className="w-full overflow-hidden">
        <Sliderbaner onComplete={handleSliderComplete} onBack={handleBackToTop} />
      </section>

      {/* Awards Section */}
      <section ref={awardsRef} className="w-full bg-white py-10 overflow-hidden">
        <ConstructionAwardsSection />
      </section>

      {/* Founder Section */}
      <section className="w-full bg-gray-50  overflow-hidden">
        <Experience />
      </section>
    </div>
  );
};

export default Home;
