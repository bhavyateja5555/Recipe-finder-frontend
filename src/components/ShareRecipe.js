import { useState } from 'react';
import Axios from 'axios';
import "./ShareRecipe.css";

function ShareRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    description: '',
    category: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:4000/api/recipes/submit-recipes', recipe);
      console.log(response.data);
      window.alert('Recipe created successfully!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };
  const addIngredientField = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };
  const removeIngredientField = (index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  return (
    <div>
      <h1 className='sub_heading text-center'>Share Your Recipe</h1>
      <form onSubmit={handleSubmit} className='w-50 sub_form' enctype="multipart/form-data" method="POST">
        <div className='row'>
          <div className='col-12 pt-5'>
            <label className='form-label fw-bold custom_label pb-2 mx-1' for="name">Recipe Name:</label>
            <input type='text' className='form-control' id='name' name='name' value={recipe.name} onChange={handleChange}></input>
          </div>
          <div className='col-12 pt-3'>
            <label className='form-label fw-bold custom_label pb-2 mx-1' for="ingredients">Ingredients:</label>
            {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className='d-flex align-items-center'>
            <input type="text" className='form-control mb-3' id='ingredients' name='ingredients' placeholder={`Ingredient ${index + 1}`} value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)}/>
            <button type="button" className='btn btn-info fw-bold mb-3' onClick={() => removeIngredientField(index)}>Remove</button>
          </div>
        ))} <br/>
        <button type="button" className='btn btn-primary fw-bold' onClick={addIngredientField}>Add Ingredient</button>
          </div>
          <div className='col-12 pt-3'>
            <label className='form-label fw-bold custom_label pb-2 mx-1' for="description">Description:</label>
            <textarea className='form-control' id='description' name='description' value={recipe.description} onChange={handleChange}></textarea>
          </div>
          <div className='col-12 pt-3'>
            <label className='form-label fw-bold custom_label pb-2 mx-1' for="category">Category:</label>
            <select className='form-select' name='category' value={recipe.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="Thai">Thai</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Desserts">Desserts</option>
              <option value="Soups">Soups</option>
              <option value="French">French</option>
              <option value="Australian">Australian</option>
              <option value="Greek">Greek</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Korean">Korean</option>
              <option value="Russian">Russian</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Argentinian">Argentinian</option>
              <option value="African">African</option>
              <option value="German">German</option>
              <option value="Irish">Irish</option>
              <option value="Swedish">Swedish</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Turkish">Turkish</option>
              <option value="Portugese">Portugese</option>
              <option value="Iranian">Iranian</option>
              <option value="Nigerian">Nigerian</option>
            </select>
          </div>
          <div className='col-12 pt-3'>
            <label className='form-label fw-bold custom_label pb-2 mx-1' for="image">ImageURL:</label>
            <input type='text' className='form-control' id='image' name='image' value={recipe.image} onChange={handleChange}></input>
          </div>
          <div className='col-12 pt-5 text-center pb-5'>
            <button className='btn btn-success fw-bold' type='submit'>Create Recipe</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShareRecipe;
