
import homeImage from './assets/home image.jpg';
import viewAll from "./assets/view-all.jpg";
import "./Home.css";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

function Home() {
  const [categories, setCategories] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await Axios.get('https://recipe-finder-backend3.onrender.com/api/recipes'); 
        setCategories(response.data.slice(0,4));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchLatestRecipes() {
      try {
        const response = await Axios.get('https://recipe-finder-backend3.onrender.com/api/recipes/latest-recipes');
        setLatestRecipes(response.data);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      }
    }
    fetchLatestRecipes();
  }, []);

  const fetchAllRecipes = async () => {
    try {
      const response = await Axios.get('https://recipe-finder-backend3.onrender.com/api/recipes'); 
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching all recipes:', error);
    }
  };

  return (
    <div class="row">
      <div class="col-lg-6 content">
        <h1 class="heading text-center">
          <Typewriter options={{autoStart: true, loop: true, delay: 50, strings: ["Welcome to our Recipe Finder!"]}}/>
        </h1>
        <p class="fw-bold para text-center">Search and find our huge selection of delicious recipe ideas including: 
          <br/>easy desserts,delicious vegan and vegetarian dinner ideas, gorgeous 
          <br/>pasta recipes, quick bakes, family-friendly meals.
        </p>
        <div class="text-center">
            <Link to="/search"  class="btn btn-danger fw-bold">Find a recipe</Link>
        </div>
      </div>
      <div class="col-lg-6 custom-pic">
        <img src={homeImage} alt="pic...." width="510" height="420" class="image"/>
      </div>

      {/* Categories */}

      <div class="row">
        <h2 class="text-center heading pt-5 pb-5">Our Categories</h2>
        <div class="category d-flex flex-wrap" style={{gap:"20px"}}>
          {categories.map((category) => (
          <div key={category._id} class="category_link">
            <Link to={`/recipes-by-category/${category.name}`} className='link_text'>
              <div class="category_img">
                <img src={`https://recipe-finder-backend3.onrender.com/images/${category.image}`} alt={category.name} width="250" height="250"/> <br/>
                <p class="text-center pt-2 pb-3">{category.name}</p>
             </div>
            </Link>
          </div> 
          ))}
          <div class="category d-flex flex-wrap" style={{marginLeft:"0px"}}>
            <Link to="/categories">
              <div class="category_img">
                <img src={viewAll} alt="view-all" width="250" height="250"/>
                <p class="text-center pt-2 pb-3">View All</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Recipes */}

      <div className="row">
        <h2 className="text-center heading pt-5 pb-5">Latest Recipes</h2>
        <div className="category d-flex flex-wrap" style={{ gap: "20px" }}>
          {latestRecipes.map((recipe) => (
            <div key={recipe._id} className="category_link">
              <Link to={`/recipes/${recipe._id}`} className="link_text">
                <div className="category_img">
                  <img src={`https://recipe-finder-backend3.onrender.com/images/${recipe.image}`} alt={recipe.name} width="250" height="250" /> <br />
                  <p className="text-center pt-2 pb-3">{recipe.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center pt-5 pb-5">
          <Link to="/all-recipes" onClick={fetchAllRecipes} className="btn btn-info fw-bold">View More</Link>
        </div>
      </div>

      {/* Share Recipes */}

      <div className='text-center pb-5'>
        <h1 className="heading pt-3">Share Recipes</h1>
        <p className="para fw-bold">Share your recipes around the world!</p>
        <Link to='/submit-recipes' className='btn btn-success fw-bold'>Share Recipes</Link>
      </div>
      <p className='text-center copyright fw-bold bg-info pt-3 pb-3'><span className='copyright fw-bold'>Build by</span> &copy;  Team 46</p>
    </div>
  );
}

export default Home;
