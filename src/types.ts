export type RecipeType = {
    id: number;
    title: string;
    ingredients: string;
    preparation: string;
}

export type IngredientsType = {
    data: Array<string>
}

export type PreparationType = {
    data: Array<string>
}

export type ProductType = {
    id: number;
    name: string;
    price: number;
    category: string;
}