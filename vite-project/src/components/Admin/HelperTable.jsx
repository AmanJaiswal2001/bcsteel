import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteButton'; // Adjust path if needed

// Helper function to get data from nested keys (e.g., 'author.fullName')
const getValueFromKey = (item, key) => {
  return key.split('.').reduce((acc, part) => acc && acc[part], item);
};

const HelperTable = ({ columns, data, isAdmin = false, onDelete, onEdit, title }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      {title && <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>}
      <table className="w-full text-[12px] font-poppins">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-gray-400 border-b border-b-gray-200 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            {isAdmin && (
              <th className="px-4 py-2 text-left text-gray-400 border-b border-b-gray-200">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={item._id || rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-b-gray-200 max-w-[150px] truncate"
                    title={getValueFromKey(item, col.key)} // Access data with the helper function
                  >
                    {col.key === 'createdAt'
                      ? new Date(getValueFromKey(item, col.key)).toLocaleDateString()
                      : getValueFromKey(item, col.key)}
                  </td>
                ))}
                {isAdmin && (
                  <td className="px-4 py-2 border-b border-b-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item._id)}
                        className="bg-[#12396d] text-white p-2 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                          />
                        </svg>
                      </button>

                      <DeleteButton onConfirm={() => onDelete(item._id)} />
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-2 border-b text-center"
                colSpan={columns.length + (isAdmin ? 1 : 0)}
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
