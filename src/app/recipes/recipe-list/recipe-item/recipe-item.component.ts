import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent implements OnInit {
    @Input('recipeItem') recipe: Recipe;

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    onSelected() {
        this.recipeService.recipeSelected.emit(this.recipe);
    }

}
