import { IngredienteReceta } from './ingredienteReceta';

export class Receta {
  id: string;
  name: string;
  description: string;
  servings: string;
  time: string;
  ingredients: IngredienteReceta[];
  tips: string;
  images: string[];
  steps: string[];
  ratingMedia: number;
  createdAt: string;
  calories: string;
  fat: string;
  carbohydrates: string;
  fiber: string;
  sugar: string;
  protein: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.servings = '';
    this.time = '';
    this.ingredients = [];
    this.tips = '';
    this.images = [];
    this.steps = [];
    this.ratingMedia = 0;
    this.createdAt = '';
    this.calories = '';
    this.fat = '';
    this.carbohydrates = '';
    this.fiber = '';
    this.sugar = '';
    this.protein = '';
  }
}
