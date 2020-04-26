export interface CartDisplayItemIngredient {
    id: string;
    name: string;
    amount: string;
    recipeId: string;
}

export abstract class CartDisplayItem {
    id: string;
    ingredients: CartDisplayItemIngredient[];
}

export class RecipeGroupedCartDisplayItem extends CartDisplayItem {
    recipe: {
        id: string;
        name: string;
    };
}

export class IngredientCategoryGroupedCartDisplayItem extends CartDisplayItem {
    category: {
        id: string;
        name: string;
    };
}
