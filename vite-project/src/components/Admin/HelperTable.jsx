import React from 'react';

const HelperTable = ({ columns, data }) => {
  return (
    <table className="w-full table-auto border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="px-4 py-2 text-left border-b">
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
                <td key={colIndex} className="px-4 py-2 border-b">
                  {col.key === 'createdAt'
                    ? new Date(item[col.key]).toLocaleDateString()
                    : item[col.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-4 py-2 border-b text-center" colSpan={columns.length}>
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default HelperTable;
