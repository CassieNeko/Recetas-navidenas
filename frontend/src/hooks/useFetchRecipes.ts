import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

interface Recipe {
  _id: string;
  title: string;
  category: string;
  ingredients: string[];
  instructions: string;
  image?: string;  
}

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await apiClient.get('api/recipes');
        console.log(response.data);  
        if (Array.isArray(response.data)) {
          const validRecipes: Recipe[] = response.data.map((recipe: any) => ({
            _id: recipe._id,  
            title: recipe.title,
            category: recipe.category,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            image: recipe.image || '',  
          }));
          setRecipes(validRecipes);
        } else {
          console.error("La respuesta de la API no es un array");
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  
  return { recipes, loading, setRecipes };
};

export default useFetchRecipes;
