import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Test', 'descriptionTest', 'https://i2.wp.com/wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400-600x847.jpg'),
        new Recipe('Test Two', 'descriptionTest Two', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Kotlet_schabowy_56.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}