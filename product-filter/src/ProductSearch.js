import React, { useState } from 'react';

const ProductSearch = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={filter}
        onChange={handleFilterChange}
      />
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <img src= {product.image}/>
            <h3>{product.title}</h3>

          </div>
        ))}
      </div>
    </div>
  );
};


export default ProductSearch;