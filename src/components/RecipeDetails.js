
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import "./RecipeDetails.css";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await Axios.get(`https://recipe-finder-crfi.onrender.com/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } 
      catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }
    fetchRecipe();
  }, [recipeId]);

  const getImageUrl = (imageName) => {
    if (imageName.startsWith('http')) {
      return imageName; 
    } 
    else {
      return `https://recipe-finder-crfi.onrender.com/images/${imageName}`; 
    }
  };

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this recipe?');
      if (confirmation) {
        console.log('Deleting recipe ID:', recipeId);
        await Axios.delete(`https://recipe-finder-crfi.onrender.com/api/recipes/${recipeId}`);
        console.log('Recipe deleted successfully!');
        alert('Recipe deleted successfully!');
        navigate('/');
      }
    } 
    catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details d-flex">
        <div className="recipe-image">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb pb-2">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrmb-item"><Link to="/categories">&nbsp; / Explore Categories</Link></li>
                    <li class="breadcrmb-item"><Link to="/search">&nbsp; / Search Recipes</Link></li>
                    <li class="breadcrmb-item active" aria-current="page">/ Explore Recipes</li>
                </ol>
            </nav>
            <img src={getImageUrl(recipe.image)} alt={recipe.name} width="450" height="450" />
        </div>
        <div className="recipe-info">
            <h2 className="recipe-name fw-bold">{recipe.name}</h2>
            <h2><i className="fas fa-tag"></i> &nbsp; {recipe.category}</h2>
            <h3 className="recipe-name fw-bold">Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3 className="recipe-name fw-bold">Instructions:</h3>
            <p>{recipe.description}</p>
            <Link className="text-decoration-none text-light me-4" to={`/update-recipe/${recipeId}`}>
              <button className="btn btn-success fw-bold mt-2"><FaEdit className="me-2" /> Update Recipe</button>
            </Link>
            <button className='btn btn-danger fw-bold mt-2' onClick={handleDelete}><FaTrash className="me-2" /> Delete Recipe</button>
        </div>
    </div>
  );
}

export default RecipeDetails;
