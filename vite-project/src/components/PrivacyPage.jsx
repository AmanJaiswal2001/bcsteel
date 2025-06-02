import { privacyPolicyData } from "./data/privacyPolicyData";

const PrivacyPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24 text-[#262626] font-poppins">
      {privacyPolicyData.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">{section.title}</h2>
          {section.lastUpdated && (
            <p className="text-xs sm:text-sm mb-2 text-gray-600">Last updated: {section.lastUpdated}</p>
          )}
          {section.content?.map((text, i) => (
            <p key={i} className="mb-2 text-sm sm:text-base leading-relaxed">{text}</p>
          ))}
          {section.subSections?.map((sub, j) => (
            <div key={j} className="ml-4 sm:ml-6 mt-4">
              <h3 className="text-sm sm:text-base font-semibold mb-1">{sub.subTitle}</h3>
              {sub.content.map((line, k) => (
                <p key={k} className="text-sm sm:text-base mb-1">{line}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPage;
