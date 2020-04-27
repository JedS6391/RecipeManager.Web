export interface Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    groups: RecipeGroup[];
}

export interface RecipeGroup {
    id: string;
    name: string;
}

export interface Ingredient {
    id: string;
    name: string;
    amount: string;
    recipeId: string;
    category: IngredientCategory;
}

export interface IngredientCategory {
    id: string;
    name: string;
}

export interface Instruction {
    id: string;
}
