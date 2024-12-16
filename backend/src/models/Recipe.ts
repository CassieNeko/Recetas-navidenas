import mongoose, {Schema, Document} from 'mongoose';


export interface IRecipe extends Document {
    _id: string;  
    title: string;
    category: string;
    ingredients: string[];
    instructions: string;
    image?: string;
  }

const RecipeSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, 
    title: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type: String },
  });

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);