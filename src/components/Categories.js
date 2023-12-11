
import { useState, useEffect } from 'react';
import Axios from 'axios';
import "./Home.css";
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await Axios.get('http://localhost:4000/api/recipes/all-categories');
        setCategories(response.data);
      } 
      catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchAllCategories();
  }, []);

  const getImageUrl = (imageName) => {
    return `http://localhost:4000/images/${imageName}`;
  };

  return (
  <div class="row">
    <h2 class="text-center heading pt-5 pb-5">Explore Categories</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb pb-2">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrmb-item active" aria-current="page">&nbsp; / Explore Categories</li>
      </ol>
    </nav>
    <div class="category d-flex flex-wrap" style={{gap:"20px"}}>
      {categories.map((category) => (
        <div key={category._id} className="category_link">
        <Link to={`/recipes-by-category/${category.name}`} className='link_text'>
          <div className="category_img">
            <img src={getImageUrl(category.image)} alt={category.name} width="250" height="250" /> <br/>
            <p className="text-center pt-2 pb-3">{category.name}</p>
          </div>
        </Link>
      </div>
        ))}
    </div>
  </div>
  );
}

export default Categories;
