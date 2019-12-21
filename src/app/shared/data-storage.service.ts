import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { tap } from 'rxjs/operators'

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
        this.http.post('https://hetom-recipebookbackend.herokuapp.com/recipe', recipe).subscribe(
            (response => {
                if (response === 'OK') {
                    alert('Recipe added');
                    this.fetchRecipesFromDB();
                } else {
                    alert('Could not add Recipe')
                }
            })
        )
    }

    updateRecipe(recipe: Recipe) {
        this.http.put('https://hetom-recipebookbackend.herokuapp.com/recipe', recipe).subscribe(
            (response => {
                if (response === 'OK') {
                    alert('Recipe updated')
                    this.fetchRecipesFromDB();
                } else {
                    alert('Could not update Recipe')
                }
            })
        )
    }

    deleteRecipe(id: number) {
        this.http.delete('https://hetom-recipebookbackend.herokuapp.com/recipe/' + id).subscribe(
            (response => {
                if (response === 'OK') {
                    alert('Recipe deleted');
                    this.fetchRecipesFromDB();
                } else {
                    alert('Could not delete Recipe')
                }
            })
        );
    }

}