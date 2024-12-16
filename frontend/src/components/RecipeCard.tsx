import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Recipe {
  _id: string;
  title: string;
  category: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, toggleFavorite, isFavorite }) => {
  const { _id, title, category, ingredients, instructions, image } = recipe;

  const handleFavoriteClick = () => {
    toggleFavorite(_id);
  };

  return (
    <div className="recipe-card">
      <img src={image || 'default.jpg'} alt={title} />
      <h3>{title}</h3>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{instructions}</p>
      <div className="actions">
        <button onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faHeart} color={isFavorite ? 'red' : 'grey'} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
