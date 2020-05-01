export interface CreateRecipeGroup {
    name: string;
}

export interface AssociateRecipeGroup {
    recipeGroupId: string;
}

export interface UpdateRecipeGroups {
    recipeGroupsToCreate: CreateRecipeGroup[];
    recipeGroupsToAssociate: AssociateRecipeGroup[];
}
