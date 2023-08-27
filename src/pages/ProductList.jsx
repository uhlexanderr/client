import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from '../responsive';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

const Container = styled.div`
 
`;
const Title = styled.h1`
 margin: 20px;
`;
const FilterContainer = styled.div`
 display: flex;
 justify-content: space-between;
`;
const Filter = styled.div`
 margin: 20px;
 ${mobile({margin: "0px 20px",display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
 font-size: 20px;
 font-weight: 600;
 margin-right: 20px;
 ${mobile({marginRight: "0px" })}
`;
const Select = styled.select`
 padding: 10px;
 margin-right: 20px;
 ${mobile({margin: "5px 0px" })}
`;
const Option = styled.option`
 
`;
const ClearFiltersButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #000000;
  border: 1px solid #000000;
  cursor: pointer;
  
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters ({
      ...filters,
      [e.target.name]: value,
    });
  }
  const handleClearFilters = () => {
    setFilters({});
    setSort("newest");
    document.getElementById("color-dropdown").value = ""; // Set color dropdown value to empty string
    document.getElementById("size-dropdown").value = ""; // Set size dropdown value to empty string
    document.getElementById("sort-dropdown").value = "newest"; // Set sort dropdown value to "newest"
  };


  return (
<Container>
  <Navbar />
  <Announcement />
  <Title>{cat}</Title>

  <FilterContainer>
    <Filter>
      <FilterText>Filter Products:</FilterText>
      <Select
        id="color-dropdown"
        name="color"
        onChange={handleFilters}
        defaultValue=""
      >
        <Option value="" disabled>
          Select Color
        </Option>
        <Option value="white">White</Option>
        <Option value="black">Black</Option>
        <Option value="red">Red</Option>
        <Option value="blue">Blue</Option>
        <Option value="yellow">Yellow</Option>
        <Option value="green">Green</Option>
        <Option value="gold">Gold</Option>
        <Option value="gray">Gray</Option>
        <Option value="orange">Orange</Option>
        <Option value="brown">Brown</Option>
      </Select>

      <Select
        id="size-dropdown"
        name="size"
        onChange={handleFilters}
        defaultValue=""
      >
        <Option value="" disabled>
          Select Size
        </Option>
        <Option value="Small">Small</Option>
        <Option value="Medium">Medium</Option>
        <Option value="Large">Large</Option>
      </Select>
    </Filter>

    <Filter>
      <FilterText>Sort Products:</FilterText>
      <Select
        id="sort-dropdown"
        onChange={(e) => setSort(e.target.value)}
       defaultValue="newest" // Set the initial value of the sort dropdown to "newest"
      >
        <Option value="newest">Newest</Option>
        <Option value="asc">Price (asc)</Option>
        <Option value="desc">Price (desc)</Option>
      </Select>

      <ClearFiltersButton onClick={handleClearFilters}>
      Clear All Filters
      </ClearFiltersButton>
    </Filter>
    </FilterContainer>

  <Products cat={cat} filters={filters} sort={sort} />
  <Footer />
</Container>

  )
}

export default ProductList
