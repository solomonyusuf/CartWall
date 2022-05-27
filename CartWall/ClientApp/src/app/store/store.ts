import { concat } from "rxjs";

import { get_cart, get_categories } from "./actions";

export interface IAppState{
  categories:any;
  cart:any;
}

export const initial_state : IAppState = {

  categories: [],
  cart:[]
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case get_categories:
      return Object.assign({}, state, { categories: state.categories });
    case get_cart:
      return Object.assign({}, state, { cart: state.cart.concat(Object.assign({}, action.cart)) });
  }

}
