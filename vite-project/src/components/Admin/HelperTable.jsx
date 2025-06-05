import React from 'react';

const HelperTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full  text-[12px] font-poppins">
        <thead className="">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-gray-400 border-b border-b-gray-200 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={item._id || rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b  border-b-gray-200 max-w-[150px] truncate"
                    title={item[col.key]} 
                  >
                    {col.key === 'createdAt'
                      ? new Date(item[col.key]).toLocaleDateString()
                      : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-2 border-b text-center"
                colSpan={columns.length}
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HelperTable;
