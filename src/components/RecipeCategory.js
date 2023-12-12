
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import "./Home.css";

function RecipesCategory() {
  const { categoryName } = useParams();
  const [categoryRecipes, setCategoryRecipes] = useState([]);

  useEffect(() => {
    async function fetchCategoryRecipes() {
      try {
        const response = await Axios.get(`https://recipe-finder-backend5.onrender.com/api/recipes/recipes-by-category/${categoryName}`);
        setCategoryRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchCategoryRecipes();
  }, [categoryName]);

  const getImageUrl = (imageName) => {
    return `https://recipe-finder-backend5.onrender.com/images/${imageName}`; 
  };

  return (
    <div className='row'>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb pb-2 pt-3">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrmb-item"><Link to="/categories">&nbsp; / Explore Categories</Link></li>
                <li className="breadcrmb-item"><Link to="/all-recipes">&nbsp; / Explore Recipes</Link></li>
                <li className="breadcrmb-item active" aria-current="page">&nbsp; / Recipes by Category</li>
            </ol>
        </nav>
        <h2 className="heading mx-5 pt-5 pb-5">Recipes in Category: {categoryName}</h2>
        <div className="category d-flex flex-wrap" style={{gap:"20px"}}>
            {categoryRecipes.map((recipe) => (
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

export default RecipesCategory;
