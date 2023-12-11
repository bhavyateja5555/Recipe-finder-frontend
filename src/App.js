
import { useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Categories from './components/Categories';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import ShareRecipe from './components/ShareRecipe';
import Search from './components/Search';
import UpdateRecipe from './components/UpdateRecipe';
import RecipesCategory from './components/RecipeCategory';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <HashRouter>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/all-recipes" element={<Recipes />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
              <Route path="/submit-recipes" element={isLoggedIn ? <ShareRecipe /> : <Navigate to="/userRoute/login" />}/>
              <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/userRoute/login" />}/>
              <Route path="/update-recipe/:recipeId" element={<UpdateRecipe />} />
              <Route path="/recipes-by-category/:categoryName" element={<RecipesCategory />} />
            </>
          )}
          <Route path="/userRoute/register" element={<Registration />} />
          <Route path="/userRoute/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
