import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test', 'descriptionTest', 'https://i2.wp.com/wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400-600x847.jpg'),
    new Recipe('Test Two', 'descriptionTest Two', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Kotlet_schabowy_56.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
