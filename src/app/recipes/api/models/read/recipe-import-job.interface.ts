import { Recipe } from './recipe.interface';

export enum RecipeImportJobStatus {
    Created = 'Created',
    Queued = 'Queued',
    Started = 'Started',
    Failed = 'Failed',
    Completed = 'Completed'
}

export interface RecipeImportJob {
    id: string;
    status: RecipeImportJobStatus;
    importedRecipe?: Recipe;
}
