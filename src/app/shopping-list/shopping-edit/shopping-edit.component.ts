import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput', { static: false }) name: ElementRef;
    @ViewChild('amountInput', { static: false }) amount: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
    }

    onAddIngredient() {
        const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
        this.shoppingListService.addIngredient(newIngredient);
    }

}
