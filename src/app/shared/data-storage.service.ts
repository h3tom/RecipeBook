import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { tap } from 'rxjs/operators'

interface ApiResponse{
    success: boolean,
    message: string
}

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    fetchRecipesFromDB() {
        return this.http.get<Recipe[]>('https://hetom-recipebookbackend.herokuapp.com/recipe/all').pipe(
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )
    }

    addRecipe(recipe: Recipe) {
        return this.http.post<ApiResponse>('https://hetom-recipebookbackend.herokuapp.com/recipe', recipe);
    }

    updateRecipe(recipe: Recipe) {
        return this.http.put<ApiResponse>('https://hetom-recipebookbackend.herokuapp.com/recipe', recipe);
    }

    deleteRecipe(id: number) {
        return this.http.delete<ApiResponse>('https://hetom-recipebookbackend.herokuapp.com/recipe/' + id);
    }

}