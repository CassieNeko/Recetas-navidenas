import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import useFetchRecipes from '../hooks/useFetchRecipes';

interface Recipe {
  _id: string;
  title: string;
  category: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const Favorites: React.FC = () => {
  const { recipes, loading } = useFetchRecipes();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [message, setMessage] = useState<string>(''); 

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setMessage('Recipe removed from favorites!');
    } else {
      const updatedFavorites = [...favorites, recipeId];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setMessage('Recipe added to favorites!');
    }
  };

  if (loading) return <p>Loading recipes...</p>;

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe._id));

  return (
    <div className="favorites cards-container">
      <h1>My Favorite Recipes</h1>

      {/* Mostrar mensaje de retroalimentación */}
      {message && <p className="message">{message}</p>}

      {favoriteRecipes.length > 0 ? (
        <div className="favorites-list">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              toggleFavorite={toggleFavorite} 
              isFavorite={true} 
            />
          ))}
        </div>
      ) : (
        <p>No favorite recipes yet. Start adding some!</p>
      )}
    </div>
  );
};

export default Favorites;