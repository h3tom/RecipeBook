import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    editMode = false;
    editedIngredientIndex: number;
    editedIngredient: Ingredient;
    ingredientForm: FormGroup;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingredientForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, [Validators.required, Validators.pattern('[1-9]+[0-9]*')])
        });
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editedIngredientIndex = index;
                this.editMode = true;
                this.editedIngredient = this.shoppingListService.getIngredient(index);
                this.ingredientForm.setValue({
                    name: this.editedIngredient.name,
                    amount: this.editedIngredient.amount
                });
            }
        );
    }

    onSubmit() {
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedIngredientIndex, this.ingredientForm.value);
        } else {
            this.shoppingListService.addIngredient(this.ingredientForm.value);
        }
        this.onClear();
    }

    onClear() {
        this.ingredientForm.reset();
        this.editMode = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
