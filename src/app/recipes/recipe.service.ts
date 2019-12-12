import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Test',
            'descriptionTest',
            'https://i2.wp.com/wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400-600x847.jpg',
            [
                new Ingredient('Salmon', 1),
                new Ingredient('Lemon', 2)
            ]),
        new Recipe(
            'Test Two',
            'descriptionTest Two',
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/Kotlet_schabowy_56.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}