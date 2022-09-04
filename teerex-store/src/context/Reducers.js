export const cartReducer = (state, action) => {
    switch (action.type) {
      case "GET_DATA":
        return {...state, products: action.payload};
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload.id),
        };
      case "CHANGE_CART_QTY":
        return {
          ...state,
          cart: state.cart.filter((c) =>
            c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
          ),
        };
      default:
        return state;
    }
  };
  
  export const productReducer = (state, action) => {
    switch (action.type) {
      case "FILTER_BY_COLOR":
        // return { ...state, byColor:state.byColor.push(action.payload)};
        return { ...state, byColor:[...state.byColor,action.payload]};
      case "FILTER_BY_GENDER":
        return { ...state, byGender:[...state.byGender,action.payload] };
      case "FILTER_BY_PRICE":
        return { ...state, byPrice:action.payload };
      case "FILTER_BY_TYPE":
        return { ...state, byType:[...state.byType,action.payload] };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { byColor:[], byGender:[], byPrice: [], byType:[] };
      default:
        return state;
    }
  };