

import { useEffect, useState } from 'react';
import axios from 'axios';
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE


const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
  const res = await axios.get(`${BASE_URL}/api/admin/product/getAllProduct`);
      console.log(res.data);
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
