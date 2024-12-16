import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import useFetchRecipes from '../hooks/useFetchRecipes';

const Home: React.FC = () => {
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
      // Si ya es favorito, lo eliminamos
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setMessage('Recipe removed from favorites!');
    } else {
      // Si no es favorito, lo añadimos
      const updatedFavorites = [...favorites, recipeId];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setMessage('Recipe added to favorites!');
    }
  };

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div>
      <h1>My Added Recipes</h1>

      {/* Mostrar mensaje de retroalimentación */}
      {message && <p className="message">{message}</p>}

      <div className="home cards-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(recipe._id)} // Verificar si es favorito
          />
        ))}
      </div>
    </div>
  );
};

export default Home;