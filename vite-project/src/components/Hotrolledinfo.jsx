import { useState } from "react";

const tabs = [
  "Chemical composition",
  "Mechanical Properties",
  "Tolerance properties",
];

const data = {
  "Chemical composition": [
    { "name": "Carbon % (Min)", "value": "" },
    { "name": "Carbon % (Max)", "value": "" },
    { "name": "Silicon % (Min)", "value": "" },
    { "name": "Silicon % (Max)", "value": "" },
    { "name": "Manganese % (Min)", "value": "" },
    { "name": "Manganese % (Max)", "value": "" },
    { "name": "Phosphorus % (Min)", "value": "" },
    { "name": "Phosphorus % (Max)", "value": "" },
    { "name": "Sulphur % (Min)", "value": "" },
    { "name": "Sulphur % (Max)", "value": "" },
    { "name": "Aluminium % (Min)", "value": "" },
    { "name": "Aluminium % (Max)", "value": "" },
    { "name": "Nitrogen % (Min)", "value": "" },
    { "name": "Nitrogen % (Max)", "value": "" },
    { "name": "Chromium % (Min)", "value": "" },
    { "name": "Chromium % (Max)", "value": "" },
    { "name": "Boron % (Min)", "value": "" },
    { "name": "Boron % (Max)", "value": "" },
    { "name": "Molybdenum % (Min)", "value": "" },
    { "name": "Molybdenum % (Max)", "value": "" },
    { "name": "Nickel % (Min)", "value": "" },
    { "name": "Nickel % (Max)", "value": "" },
    { "name": "Niobium % (Min)", "value": "" },
    { "name": "Niobium % (Max)", "value": "" },
    { "name": "Titanium % (Min)", "value": "" },
    { "name": "Titanium % (Max)", "value": "" },
    { "name": "Vanadium % (Min)", "value": "" },
    { "name": "Vanadium % (Max)", "value": "" },
    { "name": "Lead % (Min)", "value": "" },
    { "name": "Lead % (Max)", "value": "" },
    { "name": "Niobium + Vanadium + Titanium", "value": "" },
    { "name": "Others", "value": "" },
    { "name": "Cerium % (Max)", "value": "" },
    { "name": "Sulphur + Phosphorus", "value": "" } 
    // { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" }, { name: "Phosphorus %" },
    // ... Add all
  ],
  "Mechanical Properties": [
    { name: "Bend",},
    { name: "Hardness" },
    { name: "Impact " },
    // ... More
  ],
  "Tolerance properties": [
    {name:"*Width (mm) "},
    {name:"*Thickness (mm)  "},  
    {name:"Flatness  "},
    {name:"Camber  "},
    {name:"*Tolerance type  "},
    {name:"*Thickness Tolerance Type "},
    // ... More
  ]
};


export const  Hotrolledinfo = () => {
    const [activeTab, setActiveTab] = useState("Chemical composition");
    const [openAccordion, setOpenAccordion] = useState("");
    return (
      <div>
      <div className="w-3/4  mt-10 md:border md:border-gray-200 rounded-lg">
        {/* Tabs */}
      <div className="hidden md:block">
        <div className="flex  justify-between   flex-wrap gap-0 mb-4  ">
          {tabs.map((tab,index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-poppins text-center flex-1 cursor-pointer hover:text-[#12396d] hover:border-b-2 border-b-[#12396d]
                ${activeTab === tab ? "text-[#12396d] border-b-2 border-[#12396d]  font-semibold  ": "text-black bg-white "}
                     ${index !== tabs.length - 1 ? "border-r border-gray-300" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
  
        {/* Data Table */}
        {/* <div className="overflow-x-auto"> */}
          <table className="min-w-full border table-fixed -mt-4 border-[#f1f1f1] text-sm">
            <thead className="bg-gray-100 text-left">
              {/* <tr>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Min</th>
                <th className="px-4 py-2">Max</th>
              </tr> */}
            </thead>
            <tbody className="w-1/2 ">
              {data[activeTab].map((item, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-2 w-1/2 text-center border-b font-poppins font-medium text-[1rem] border-r border-[#f1f1f1] ">{item.name}</td>
                  {/* {/* <td className="px-4 py-2">{`${item.value}${item.value2}`}</td> */}
                  {/* <td className="px-4 py-2"></td>  */}
                  <td className="px-4 py-2  border-b border-r border-[#f1f1f1] "></td>
              
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
</div>
        <div className="block md:hidden">
        {tabs.map((tab) => (
          <div key={tab} className="border-b-4 border-[#f1f1f1] ">
            <button
              onClick={() =>
                setOpenAccordion(openAccordion === tab ? "" : tab)
              }
              className="w-full flex cursor-pointer justify-between items-center py-3 px-4"
            >
              <span className="text-[16px] font-normal text-[#262626] font-poppins">
                {tab}
              </span>
              <span className="text-xl">{openAccordion === tab ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/></svg>}</span>
            </button>

            {openAccordion === tab && (
              <table className="min-w-full  border-t border-[#f1f1f1] text-sm">
                <tbody>
                  {data[tab].map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 w-1/2 border-b font-poppins font-medium text-[1rem] border-r border-[#f1f1f1]">
                        {item.name}
                      </td>
                      <td className="px-4 py-2 border-b border-r border-[#f1f1f1]"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
      </div>
    //   </div>
    );
  };
  
