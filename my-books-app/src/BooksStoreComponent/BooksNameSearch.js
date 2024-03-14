import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function BooksNameSearch() {
  const [searchTerm, setSearchTerm] = useState('Harry Potter');
  const [results, setResults] = useState([]);
  const [chunkedShows, setChunkedShow] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchUserData = (searchString) => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(searchString))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data.items || []); 
    

  
      
    })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };



  useEffect(() => {
    
    let chunkSize = 3;
    let chunks = [];

    for (let i = 0; i < results.length; i += chunkSize) {
      chunks.push(results.slice(i, i + chunkSize));
    }

    setChunkedShow(chunks);
  }, [results]); 

  const handleSearch = () => {
    fetchUserData(searchTerm);
  };

  return (
    <div  style={{margin:"10px"}}>
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-primary"  onClick={handleSearch}>Search book</button><hr/>
      <div>
      {chunkedShows.map((shows, index) => (
      <div className='row' key={index}>
        
        {shows.map((item, itemIndex) => (
          <div className='col-md-4' key={itemIndex}>
            <img
              src={
                item.volumeInfo.imageLinks
                  ? item.volumeInfo.imageLinks.thumbnail
                  : 'https://via.placeholder.com/150' 
              }
              alt={item.volumeInfo.title}
            />
            <h4>{item.volumeInfo.title}</h4>
          </div>
        ))}
        </div>
      
      ))}
      </div>
    </div>
  );
}

export default BooksNameSearch;