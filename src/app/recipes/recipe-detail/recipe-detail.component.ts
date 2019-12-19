import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(
        private shoppingListService: ShoppingListService,
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router,
        private dataStorageService: DataStorageService) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params.id;
                this.recipe = this.recipeService.getRecipe(this.id);
            }
        );
    }

    onAddToShoppingList() {
        this.shoppingListService.addIngredients(this.recipe.ingredients);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onDeleteRecipe() {
        this.dataStorageService.deleteRecipe(this.recipe.id);
        this.router.navigate(['/recipes']);
    }

}
