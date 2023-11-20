import { bannerPath, defaultAvtPath } from "@/assets/exportImage";
import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import { CartEntity } from "@/lib/models/entities/CartEntity/CartEntity";
import { Cart_ItemEntity } from "@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity";
import { Ingredient_TypeEntity } from "@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity";
import { IngredientEntity } from "@/lib/models/entities/IngredientEntity/IngredientEntity";
import { Nutrition_InfoEntity } from "@/lib/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity";
import { OccasionEntity } from "@/lib/models/entities/OccasionEntity/OccasionEntity";
import { PlanEntity } from "@/lib/models/entities/PlanEntity/PlanEntity";
import { Plan_ItemEntity } from "@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity";
import { Recipe_DirectionEntity } from "@/lib/models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity";
import { Recipe_IngredientEntity } from "@/lib/models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import { CookBookEntity } from "../models/entities/CookBookEntity/CookBookEntity";
import { CookBook_RecipeEntity } from "../models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity";

export const accounts: AccountEntity[] = [
  {
    uid: "1",
    name: "Người Dùng Một",
    avatar: defaultAvtPath,
    introduction:
      "Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.",
  },
  {
    uid: "2",
    name: "Người Dùng Hai",
    avatar: defaultAvtPath,
    introduction:
      "Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.",
  },
  {
    uid: "3",
    name: "Người Dùng Ba",
    avatar: defaultAvtPath,
    introduction:
      "Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.",
  },
  {
    uid: "4",
    name: "Người Dùng Bốn",
    avatar: defaultAvtPath,
    introduction: "Xin chào mọi người, tôi là Người Dùng Bốn.",
  },
  {
    uid: "5",

    name: "Người Dùng Năm",
    avatar: defaultAvtPath,
    introduction: "Chúc mọi người một ngày tốt lành! Tôi là Người Dùng Năm.",
  },
  {
    uid: "6",
    name: "Người Dùng Sáu",
    avatar: defaultAvtPath,
    introduction: "Rất vui được gặp bạn. Tôi là Người Dùng Sáu.",
  },
  {
    uid: "7",
    name: "Người Dùng Bảy",
    avatar: defaultAvtPath,
    introduction: "Chào bạn, tôi là Người Dùng Bảy.",
  },
  {
    uid: "8",

    name: "Người Dùng Tám",
    avatar: defaultAvtPath,
    introduction: "Xin chào, tôi là Người Dùng Tám.",
  },
  {
    uid: "9",

    name: "Người Dùng Chín",
    avatar: defaultAvtPath,
    introduction: "Chúc mọi người một ngày vui vẻ! Tôi là Người Dùng Chín.",
  },
  {
    uid: "10",
    name: "Người Dùng Mười",
    avatar: defaultAvtPath,
    introduction: "Rất vui được làm quen với bạn. Tôi là Người Dùng Mười.",
  },
];

export const recipes: RecipeEntity[] = [
  {
    id: 1,
    name: "Recipe 1",
    rating: 4.5,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 4,
    introduction:
      "This is recipe 1.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur voluptatum sequi hic eum labore ex iste laudantium alias cum facilis, eveniet aliquid, laborum suscipit exercitationem?",
    author_note: "Author's note for recipe 1",
    is_private: false,
    image: "recipe1.jpg",
    author: "10",
    nutrition_info_id: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Recipe 2",
    rating: 3.8,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 2,
    introduction: "This is recipe 2",
    author_note: "Author's note for recipe 2",
    is_private: true,
    image: "recipe2.jpg",
    author: "9",
    nutrition_info_id: 202,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Recipe 3",
    rating: 4.2,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 3,
    introduction: "This is recipe 3",
    author_note: "Author's note for recipe 3",
    is_private: false,
    image: "recipe3.jpg",
    author: "8",
    nutrition_info_id: 203,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Recipe 4",
    rating: 3.5,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 6,
    introduction: "This is recipe 4",
    author_note: "Author's note for recipe 4",
    is_private: true,
    image: "recipe4.jpg",
    author: "7",
    nutrition_info_id: 204,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Recipe 5",
    rating: 4.0,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 2,
    introduction: "This is recipe 5",
    author_note: "Author's note for recipe 5",
    is_private: false,
    image: "recipe5.jpg",
    author: "6",
    nutrition_info_id: 205,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Recipe 6",
    rating: 4.8,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 8,
    introduction: "This is recipe 6",
    author_note: "Author's note for recipe 6",
    is_private: false,
    image: "recipe6.jpg",
    author: "5",
    nutrition_info_id: 206,
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Recipe 7",
    rating: 3.2,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 1,
    introduction: "This is recipe 7",
    author_note: "Author's note for recipe 7",
    is_private: true,
    image: "recipe7.jpg",
    author: "4",
    nutrition_info_id: 207,
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Recipe 8",
    rating: 4.6,
    totalTime: new Date("2022-01-01T00:30:00.000Z"),
    active_time: new Date("2022-01-01T00:30:00.000Z"),
    serving_size: 4,
    introduction: "This is recipe 8",
    author_note: "Author's note for recipe 8",
    is_private: false,
    image: "recipe8.jpg",
    author: "1",
    nutrition_info_id: 208,
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Recipe 9",
    rating: 3.7,
    totalTime: new Date(" 2022-01-01T00:30:00.000Z"),
    active_time: new Date(" 2022-01-01T00:30:00.000Z"),
    serving_size: 3,
    introduction: "This is recipe 9",
    author_note: "Author's note for recipe 9",
    is_private: true,
    image: "recipe9.jpg",
    author: "2",
    nutrition_info_id: 209,
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Recipe 10",
    rating: 4.4,
    totalTime: new Date(" 2022-01-01T00:30:00.000Z"),
    active_time: new Date(" 2022-01-01T00:30:00.000Z"),
    serving_size: 5,
    introduction: "This is recipe 10",
    author_note: "Author's note for recipe 10",
    is_private: false,
    image: "recipe10.jpg",
    author: "3",
    nutrition_info_id: 210,
    createdAt: new Date(),
  },
];

export const recipeIngredients: Recipe_IngredientEntity[] = [
  {
    amount_per_serving: 5,
    recipe_id: 1,
    ingredient_id: 1,
    note: "Hello, this is a sample note",
  },
  {
    amount_per_serving: 2,
    recipe_id: 1,
    ingredient_id: 2,
    note: "Hello, this is another sample note",
  },
  {
    amount_per_serving: 5,
    recipe_id: 1,
    ingredient_id: 3,
    note: "Hello, this is another sample note",
  },
  {
    amount_per_serving: 2,
    recipe_id: 2,
    ingredient_id: 1,
    note: "Hello, this is another sample note",
  },
  {
    amount_per_serving: 3,
    recipe_id: 2,
    ingredient_id: 2,
    note: "Hello, this is another sample note",
  },
];

export const recipeDirections: Recipe_DirectionEntity[] = [
  {
    recipe_id: 1,
    step: 1,
    direction:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt eaque quisquam cupiditate, consectetur delectus nam id, eos, doloribus numquam sint dolores incidunt quaerat suscipit minus.",
    image: "",
  },
  {
    recipe_id: 1,
    step: 2,
    direction:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, libero!",
    image: "",
  },
  {
    recipe_id: 2,
    step: 1,
    direction:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam natus odio asperiores sapiente, et aliquam nulla deserunt. Saepe odio exercitationem corrupti possimus commodi nam impedit veritatis aliquam at rem officiis, laborum fugiat. Similique, facere voluptatibus?",
    image: "",
  },
];

export const ingredients: IngredientEntity[] = [
  {
    id: 1,
    name: "Bơ",
    image:
      "https://www.sidechef.com/ingredient/small/434769be-6df9-493e-8b3b-31264065311f.jpg?d=96x96",
    type_id: 1,
    nutrition_info_id: 1,
    isLiquid: true,
    ratio: 0.5,
  },
  {
    id: 2,
    name: "Táo",
    image:
      "https://www.sidechef.com/ingredient/small/434769be-6df9-493e-8b3b-31264065311f.jpg?d=96x96",
    type_id: 2,
    nutrition_info_id: 2,
    isLiquid: false,
    ratio: 0.75,
  },
  {
    id: 3,
    name: "Chuối",
    image:
      "https://www.sidechef.com/ingredient/small/434769be-6df9-493e-8b3b-31264065311f.jpg?d=96x96",
    type_id: 3,
    nutrition_info_id: 3,
    isLiquid: true,
    ratio: 0.6,
  },
  {
    id: 4,
    name: "Ổi",
    image: "image_url_4",
    type_id: 4,
    nutrition_info_id: 4,
    isLiquid: false,
    ratio: 0.9,
  },
  {
    id: 5,
    name: "Ingredient 5",
    image: "image_url_5",
    type_id: 5,
    nutrition_info_id: 5,
    isLiquid: true,
    ratio: 0.7,
  },
  {
    id: 6,
    name: "Ingredient 6",
    image: "image_url_6",
    type_id: 6,
    nutrition_info_id: 6,
    isLiquid: false,
    ratio: 0.8,
  },
  {
    id: 7,
    name: "Ingredient 7",
    image: "image_url_7",
    type_id: 7,
    nutrition_info_id: 7,
    isLiquid: true,
    ratio: 0.4,
  },
  {
    id: 8,
    name: "Ingredient 8",
    image: "image_url_8",
    type_id: 8,
    nutrition_info_id: 8,
    isLiquid: false,
    ratio: 0.65,
  },
  {
    id: 9,
    name: "Ingredient 9",
    image: "image_url_9",
    type_id: 9,
    nutrition_info_id: 9,
    isLiquid: true,
    ratio: 0.55,
  },
  {
    id: 10,
    name: "Ingredient 10",
    image: "image_url_10",
    type_id: 10,
    nutrition_info_id: 10,
    isLiquid: false,
    ratio: 0.85,
  },
];

export const ingredientTypes: Ingredient_TypeEntity[] = [
  {
    id: 1,
    name: "Cá",
  },
  {
    id: 2,
    name: "Thịt",
  },
  {
    id: 3,
    name: "Trái cây",
  },
];

export const occasions: OccasionEntity[] = [
  {
    id: 1,
    name: "Tết Nguyên Đán",
    description: "Lễ Tết truyền thống của Việt Nam",
    start_at: new Date(new Date().getFullYear(), 0, 1),
    end_at: new Date(new Date().getFullYear(), 11, 31),
    image: bannerPath,
  },
  {
    id: 2,
    name: "Ngày Quốc khánh",
    description: "Ngày Quốc khánh Việt Nam",
    start_at: new Date(new Date().getFullYear(), 8, 2),
    end_at: new Date(new Date().getFullYear(), 11, 31),
    image: bannerPath,
  },
  {
    id: 3,
    name: "Ngày Lao động",
    description: "Lễ Quốc tế lao động",
    start_at: new Date(new Date().getFullYear(), 4, 1),
    end_at: new Date(new Date().getFullYear(), 11, 31),
    image: bannerPath,
  },
  {
    id: 4,
    name: "Ngày Quốc tế Phụ nữ",
    description: "Ngày Quốc tế của Phụ nữ",
    start_at: new Date(new Date().getFullYear(), 2, 8),
    end_at: new Date(new Date().getFullYear(), 11, 31),
    image: bannerPath,
  },
  {
    id: 5,
    name: "Ngày Quốc tế Hạnh phúc",
    description: "Ngày Quốc tế Hạnh phúc",
    start_at: new Date(new Date().getFullYear(), 2, 20),
    end_at: new Date(new Date().getFullYear(), 11, 31),
    image: bannerPath,
  },
];

export const nutritionInfos: Nutrition_InfoEntity[] = [
  {
    id: 1,
    calories: 200,
    fat: 10,
    saturated_fat: 2,
    trans_fat: 0,
    cholesterol: 20,
    carbohydrates: 25,
    fiber: 5,
    sugars: 10,
    protein: 15,
    sodium: 300,
    vitaminD: 10,
    calcium: 150,
    iron: 2,
    potassium: 400,
  },
];

export const carts: CartEntity[] = [
  {
    id: 1,
    accountId: "1",
    recipeId: 1,
    serving_size: 4,
  },
  {
    id: 2,
    accountId: "1",
    recipeId: 2,
    serving_size: 2,
  },
];

export const cartItems: Cart_ItemEntity[] = [
  {
    cartId: 1,
    ingredientId: 1,
    amount: 5,
    isBought: true,
  },
  {
    cartId: 1,
    ingredientId: 2,
    amount: 2,
    isBought: true,
  },
  {
    cartId: 1,
    ingredientId: 3,
    amount: 5,
    isBought: false,
  },
  {
    cartId: 2,
    ingredientId: 1,
    amount: 2,
    isBought: false,
  },
  {
    cartId: 2,
    ingredientId: 2,
    amount: 3,
    isBought: false,
  },
];

export const plans: PlanEntity[] = [
  {
    id: 1,
    account_id: "1",
    date: new Date("2023-10-30"),
  },
  {
    id: 2,
    account_id: "1",
    date: new Date("2023-10-31"),
  },
  {
    id: 3,
    account_id: "1",
    date: new Date("2023-11-01"),
  },
  {
    id: 4,
    account_id: "1",
    date: new Date("2023-11-02"),
  },
  {
    id: 5,
    account_id: "1",
    date: new Date("2023-11-03"),
  },
  {
    id: 6,
    account_id: "1",
    date: new Date("2023-11-04"),
  },
  {
    id: 7,
    account_id: "1",
    date: new Date("2023-11-05"),
  },
  {
    id: 8,
    account_id: "1",
    date: new Date("2023-10-29"),
  },
];

export const planItems: Plan_ItemEntity[] = [
  {
    id: 1,
    planId: 1,
    recipeId: 1,
    order: 1,
    serving_size: 4,
  },
  {
    id: 2,
    planId: 1,
    recipeId: 2,
    order: 2,
    serving_size: 2,
  },
  {
    id: 3,
    planId: 2,
    recipeId: 1,
    order: 1,
    serving_size: 4,
  },
  {
    id: 4,
    planId: 3,
    recipeId: 3,
    order: 1,
    serving_size: 3,
  },
  {
    id: 5,
    planId: 3,
    recipeId: 4,
    order: 2,
    serving_size: 3,
  },
  {
    id: 6,
    planId: 3,
    recipeId: 5,
    order: 3,
    serving_size: 3,
  },
  {
    id: 7,
    planId: 8,
    recipeId: 1,
    order: 1,
    serving_size: 4,
  },
];

export const cookbooks: CookBookEntity[] = [
  {
    id: 1,
    name: "Cookbook 1",
    owner: "1",
  },
  {
    id: 2,
    name: "Cookbook 2",
    owner: "1",
  },
  {
    id: 3,
    name: "Cookbook 3",
    owner: "1",
  },
  {
    id: 4,
    name: "Cookbook 4",
    owner: "1",
  },
];

export const cookbookRecipes: CookBook_RecipeEntity[] = [
  {
    cook_book_id: 1,
    recipe_id: 1,
  },
  {
    cook_book_id: 1,
    recipe_id: 2,
  },
  {
    cook_book_id: 2,
    recipe_id: 3,
  },
  {
    cook_book_id: 2,
    recipe_id: 4,
  },
];
