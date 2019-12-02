import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test', 'descriptionTest', 'https://i2.wp.com/wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400-600x847.jpg'),
    new Recipe('Test', 'descriptionTest', 'https://i2.wp.com/wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400-600x847.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
