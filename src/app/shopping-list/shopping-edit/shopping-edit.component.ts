import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    addIngredientForm: FormGroup;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.addIngredientForm = new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [Validators.required, Validators.pattern('[1-9]+[0-9]*')])
        });
    }

    onAddIngredient() {
        this.shoppingListService.addIngredient(this.addIngredientForm.value);
    }

}
