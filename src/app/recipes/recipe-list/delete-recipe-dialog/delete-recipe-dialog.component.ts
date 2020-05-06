import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Recipe } from '../../api/models/read/recipe.interface';

export interface DeleteRecipeDialogComponentData {
  recipe: Recipe;
}

export interface DeleteRecipeDialogComponentResult {
  isCancelled: boolean;
}

@Component({
  selector: 'app-delete-recipe-dialog',
  templateUrl: './delete-recipe-dialog.component.html',
  styleUrls: ['./delete-recipe-dialog.component.scss']
})
export class DeleteRecipeDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteRecipeDialogComponentData,
    private dialogRef: MatDialogRef<DeleteRecipeDialogComponent>,
  ) { }

  ngOnInit() {
  }

  public delete() {
    this.dialogRef.close({
      isCancelled: false
    } as DeleteRecipeDialogComponentResult);
  }

  public cancel() {
    this.dialogRef.close({
      isCancelled: true
    } as DeleteRecipeDialogComponentResult);
  }

}
