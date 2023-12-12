import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Search() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    Axios.get('https://recipe-finder-backend5.onrender.com/api/recipes/all-recipes')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getImageUrl = (imageName) => {
    return `https://recipe-finder-backend5.onrender.com/images/${imageName}`;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const filteredRecords = data.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecords(filteredRecords);
      setSearched(true); 
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-link">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrmb-item"><Link to="/categories">&nbsp; / Explore Categories</Link></li>
          <li class="breadcrmb-item"><Link to="/all-recipes">&nbsp; / Explore Recipes</Link></li>
          <li class="breadcrmb-item active" aria-current="page">/ Search Recipes</li>
        </ol>
      </nav>
      <h1 className="heading text-center pt-5">Search Your Favorite Recipes!!!</h1>
      <input type="text" className="form-control w-50 mt-5 mb-5 custom-search" placeholder="search a recipe" onChange={handleChange} onKeyUp={handleKeyPress}/>
      {searched && records.length > 0 && ( 
        <>
        <h2 className="fw-bold text-center mt-5 mb-5">Search Results...</h2>
        <div class="category d-flex flex-wrap" style={{gap:"20px"}}>
        {records.map((recipe) => (
          <div key={recipe._id} class="category_link" >
            <Link to={`/recipes/${recipe._id}`} className="link_text">
                <div className="category_img">
                  <img src={getImageUrl(recipe.image)} alt={recipe.name} width="250" height="250" /> <br />
                  <p className="text-center pt-2 pb-3">{recipe.name}</p>
                </div>
            </Link>
          </div> 
          ))}
      </div> 
        </>
      )} 
    </div>
  );
}

export default Search;


