import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// screens
import HomeScreen from "./screens/HomeScreen";

import Recipes from './screens/RecipesScreen';
import RecipeInfo from "./screens/RecipeInfoScreen";
import CreateRecipe from "./screens/CreateRecipeScreen";
import UpdateRecipe from "./screens/UpdateRecipeScreen";

import Products from "./screens/ProductsScreen";
import ProductInfo from "./screens/ProductInfoScreen";
import CreateProduct from "./screens/CreateProductScreen";
import UpdateProduct from "./screens/UpdateProductScreen";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/info/:id" element={<RecipeInfo />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/recipes/update/:id" element={<UpdateRecipe />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/info/:id" element={<ProductInfo />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/update/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

