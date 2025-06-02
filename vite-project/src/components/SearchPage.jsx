// src/pages/SearchPage.tsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchbarFeatures from './SearchbarFeatures'
import { hotrolledcoils,coldRolledSheet,hotRollSheet,coldRollCoils } from './data/ProductData' // your data here

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
const allProducts = [
    ...hotrolledcoils,
    ...coldRolledSheet,
    ...hotRollSheet,
    ...coldRollCoils,
  ]

const SearchPage = () => {
  const query = useQuery()
  const searchTerm = query.get('query') || ''

  return (
    <div className="pt-10 px-20 flex  w-[80%]  m-auto justify-center mb-20 items-center"> {/* Padding to avoid header overlap */}
      <SearchbarFeatures data={allProducts} defaultSearch={searchTerm} />
    </div>
  )
}

export default SearchPage
