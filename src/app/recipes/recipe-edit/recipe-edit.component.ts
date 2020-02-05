import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;
    recipe: Recipe;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router,
        private dataStorageService: DataStorageService) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params.id;
                this.editMode = params.id != null;
                this.initForm();
            }
        );
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onSubmit() {
        if (this.editMode) {
            this.dataStorageService.updateRecipe(this.recipeForm.value).subscribe(
                response => {
                    if (response.success) {
                        alert(response.message)
                        this.dataStorageService.fetchRecipesFromDB().subscribe();
                        this.onCancel()
                    }
                }, error => {
                    if (error.error.message.includes('Validation')) {
                        alert('Validation failed, please fill correctly all required fields.');
                    } else {
                        alert('Unexpected error occurred, please try again later.');
                    }
                }
            );
        } else {
            this.dataStorageService.addRecipe(this.recipeForm.value).subscribe(
                response => {
                    if (response.success) {
                        alert(response.message);
                        this.dataStorageService.fetchRecipesFromDB().subscribe();
                        this.onCancel();
                    }
                }, error => {
                    if (error.error.message.includes('Validation')) {
                        alert('Validation failed, please fill correctly all required fields.');
                    } else {
                        alert('Unexpected error occurred, please try again later.');
                    }
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(['/recipes']);
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                id: new FormControl(null),
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [
                    Validators.required, Validators.pattern('[1-9]+[0-9]*')
                ])
            })
        )
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    private initForm() {
        let recipeId = null;
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeId = recipe.id;
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe.ingredients) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            id: new FormControl(ingredient.id),
                            name: new FormControl(ingredient.name, Validators.required),
                            amount: new FormControl(ingredient.amount, [
                                Validators.required, Validators.pattern('[1-9]+[0-9]*')
                            ])
                        })
                    );
                }
            }
        }

        this.recipeForm = new FormGroup({
            id: new FormControl(recipeId),
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredients: recipeIngredients
        });
    }

}
