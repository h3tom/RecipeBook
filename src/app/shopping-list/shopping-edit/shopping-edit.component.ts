import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) name: ElementRef;
  @ViewChild('amountInput', { static: false }) amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
  }

}
