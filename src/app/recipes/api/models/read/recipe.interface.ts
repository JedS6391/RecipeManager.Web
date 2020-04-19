export interface Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
}

export interface Ingredient {
    id: string;
    name: string;
    amount: string;
    recipeId: string;
}

export interface Instruction {
    id: string;
}
