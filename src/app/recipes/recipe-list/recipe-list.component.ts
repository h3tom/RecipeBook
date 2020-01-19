import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[];
    subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private recipeService: RecipeService) { }

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe(
            (recipes => {
                this.recipes = recipes;
            })
        )
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
