
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import "./Home.css";

function Recipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  useEffect(() => {
    async function fetchAllRecipes() {
      try {
        const response = await Axios.get('https://recipe-finder-backend3.onrender.com/api/recipes/all-recipes');
        setAllRecipes(response.data);
      } 
      catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    }
    fetchAllRecipes();
  }, []);

  const getImageUrl = (imageName) => {
    return `https://recipe-finder-backend3.onrender.com/images/${imageName}`; 
  };

  return (
    <div className="row">
    <h2 className="text-center heading pt-5 pb-5">Explore Recipes</h2>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb pb-2">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrmb-item"><Link to="/categories">&nbsp; / Explore Categories</Link></li>
        <li className="breadcrmb-item active" aria-current="page">&nbsp; / Explore Recipes</li>
      </ol>
    </nav>
    <div className="category d-flex flex-wrap" style={{gap:"20px"}}>
      {allRecipes.map((recipe) => (
        <div key={recipe._id} className="category_link">
          <Link to={`/recipes/${recipe._id}`} className="link_text">
              <div className="category_img">
                <img src={getImageUrl(recipe.image)} alt={recipe.name} width="250" height="250" /> <br />
                <p className="text-center pt-2 pb-3">{recipe.name}</p>
              </div>
          </Link>
        </div> 
        ))}
    </div>
  </div>
  );
}

export default Recipes;
