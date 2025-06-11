import React from 'react'
import { Link } from 'react-router-dom';
import Card from './Card';
import useFetchProducts from '../hooks/useFetchProducts';

const CoilsCat = ({ filters }) => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split('-').map(parseFloat);
    return { min, max };
  };

  const isWithinRange = (cardRange, selectedMin, selectedMax) => {
    if (!selectedMin && !selectedMax) return true;
    // You can update this logic based on your cardRange format if needed
    return true;
  };

  const coilProducts = products.filter((p) =>
    p.type?.toLowerCase().includes("hotrolledcoil")
  //  &&
    // p.name?.toLowerCase().includes("hot")
  );

  const filteredData = coilProducts.filter((card) => {
    const gradeFilters = filters.Grade || [];
    if (gradeFilters.length > 0 &&
      !gradeFilters.some(grade =>
        card.name.includes(grade) || card.thickness.includes(grade))
    ) {
      return false;
    }

    if (
      !isWithinRange(
        card.thickness,
        filters.Thickness?.min,
        filters.Thickness?.max
      )
    ) {
      return false;
    }

    if (
      !isWithinRange(card.width, filters.Width?.min, filters.Width?.max)
    ) {
      return false;
    }

    if (
      !isWithinRange(card.length, filters.Length?.min, filters.Length?.max)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className='relative w-full mx-auto'>
      {(filters.Grade.length > 0 ||
        filters.Thickness?.min || filters.Thickness?.max ||
        filters.Width?.min || filters.Width?.max ||
        filters.Length?.min || filters.Length?.max) && (
        <p className="text-sm text-black mb-4 font-poppins font-semibold">
          Filters applied:
          {filters.Grade.length > 0 && (
            <span className="font-medium font-poppins text-[#2241a6] text-sm">
              {" Grade: " + filters.Grade.join(", ")}
            </span>
          )}
          {(filters.Thickness?.min || filters.Thickness?.max) && (
            <span className="font-medium font-poppins text-[#12396d] text-sm">
              {" Thickness: "}
              {filters.Thickness.min && `${filters.Thickness.min}mm`}
              {filters.Thickness.min && filters.Thickness.max && " - "}
              {filters.Thickness.max && `${filters.Thickness.max}mm`}
            </span>
          )}
          {(filters.Width?.min || filters.Width?.max) && (
            <span className="font-medium font-poppins text-[#12396d] text-sm">
              {" Width: "}
              {filters.Width.min && `${filters.Width.min}mm`}
              {filters.Width.min && filters.Width.max && " - "}
              {filters.Width.max && `${filters.Width.max}mm`}
            </span>
          )}
          {(filters.Length?.min || filters.Length?.max) && (
            <span className="font-medium font-poppins text-[#12396d] text-sm">
              {" Length: "}
              {filters.Length.min && `${filters.Length.min}mm`}
              {filters.Length.min && filters.Length.max && " - "}
              {filters.Length.max && `${filters.Length.max}mm`}
            </span>
          )}
        </p>
      )}

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-600 font-poppins font-semibold py-10">
          Product not found.
        </p>
      ) : (
        <div className="grid w-[95%] grid-cols-1 md:grid-cols-2 mx-auto sm:mx-0 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-0 place-items-center">
          {filteredData.map((card, index) => (
            <Link key={card._id || index} to={`/coilproduct/${card._id || index}`}>
              <Card {...card} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoilsCat;
