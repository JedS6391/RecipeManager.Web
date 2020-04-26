export interface RecipeGroupedCartDisplayItem {
    recipe: {
        id: string;
        name: string;
    };
    ingredients: {
        id: string;
        name: string;
        amount: string;
        category: {
        id: string;
        name: string;
        };
    }[];
}

export interface IngredientCategoryGroupedCartDisplayItem {
    category: {
        id: string;
        name: string;
    };
    ingredients: {
        id: string;
        name: string;
        amount: string;
    }[];
}

export type CartDisplayItem = RecipeGroupedCartDisplayItem | IngredientCategoryGroupedCartDisplayItem;
