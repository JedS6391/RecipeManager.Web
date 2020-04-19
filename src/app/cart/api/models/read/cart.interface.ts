import { Ingredient } from 'src/app/recipes/api/models/read/recipe.interface';

export interface Cart {
    id: string;
    createdAt: Date;
    isCurrent: boolean;
    items: CartItem[];
}

export interface CartItem {
    id: string;
    cartId: string;
    createdAt: Date;
    ingredient: Ingredient;
}
