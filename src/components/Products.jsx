import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    let filteredItems = products;
    
    if (filters) {
      filteredItems = filteredItems.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      );
    }

    if (sort === "newest") {
      filteredItems = filteredItems.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "asc") {
      filteredItems = filteredItems.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filteredItems = filteredItems.sort((a, b) => b.price - a.price);
    }

    // Filter out products with inStock set to false
    filteredItems = filteredItems.filter((item) => item.inStock);

    setFilteredProducts(filteredItems);
  }, [products, filters, sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products.slice(0, 12).map((item) => <Product key={item._id} item={item} />)
      }
    </Container>
  );
};

export default Products;
