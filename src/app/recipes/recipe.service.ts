import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes);
    }

    getRecipes() {
        return this.recipes;
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

}