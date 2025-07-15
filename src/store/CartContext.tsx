import { createContext, ReactNode, useContext, useReducer } from "react";

export type MealType = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
};

type MealsType = {
  meals: MealType[];
};

type CartContextState = {
  mealsTotalPrice: number;
  onAdd: (meal: MealType) => void;
  onRemove: (id: string) => void;
  clearCart: () => void;
} & MealsType;

type CartContextProviderProps = {
  children: ReactNode;
};
type InitialStateType = {
  meals: MealType[];
  mealsTotalPrice: number;
};
const initialState: InitialStateType = { meals: [], mealsTotalPrice: 0 };
const CartContext = createContext<CartContextState | null>(null);

export function useCartContext() {
  const cartCtx = useContext(CartContext);

  if (cartCtx === null) {
    throw new Error("Cart context error occurred");
  }

  return cartCtx;
}

type AddAction = {
  type: "ADD_MEAL";
  payload: MealType;
};

type RemoveAction = {
  type: "REMOVE_MEAL";
  payload: string;
};

type ClearCart = {
  type: "CLEAR_CART";
};
type Actions = RemoveAction | AddAction | ClearCart;

function cartReducer(state: InitialStateType, action: Actions) {
  switch (action.type) {
    case "ADD_MEAL": {
      const existingItemIndex = state.meals.findIndex(
        (i) => i.id === action.payload.id
      );

      let updatedMeals;

      if (existingItemIndex !== -1) {
        // Copy the current meals array
        updatedMeals = [...state.meals];

        // Get the existing item and update quantity
        const existingItem = updatedMeals[existingItemIndex];

        updatedMeals[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        // Add new meal if not exists
        const newItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          description: action.payload.description,
          image: action.payload.image,
          quantity: action.payload.quantity || 1,
        };

        updatedMeals = [...state.meals, newItem];
      }
      const totalPrice = updatedMeals.reduce(
        (sum, m) => sum + Number(m.price) * m.quantity,
        0
      );

      return { meals: updatedMeals, mealsTotalPrice: totalPrice };
    }

    case "REMOVE_MEAL": {
      const existingItemIndex = state.meals.findIndex(
        (i) => i.id === action.payload
      );

      if (existingItemIndex === -1) return state;

      let updatedMeals;
      updatedMeals = [...state.meals];
      let updatedMeal = updatedMeals[existingItemIndex];
      if (updatedMeal.quantity > 1) {
        updatedMeal = {
          ...updatedMeal,
          quantity: updatedMeal.quantity - 1,
        };
        updatedMeals[existingItemIndex] = updatedMeal;
      } else {
        updatedMeals = updatedMeals.filter((i) => i.id !== action.payload);
      }
      const totalPrice = updatedMeals.reduce(
        (sum, m) => sum + Number(m.price) * m.quantity,
        0
      );
      return { meals: updatedMeals, mealsTotalPrice: totalPrice };
    }

    case "CLEAR_CART": {
      return { meals: [], mealsTotalPrice: 0 };
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const ctx: CartContextState = {
    mealsTotalPrice: state.mealsTotalPrice,
    meals: state.meals,
    onAdd: (meal) => dispatch({ type: "ADD_MEAL", payload: meal }),
    onRemove: (id: string) => dispatch({ type: "REMOVE_MEAL", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };
  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}
