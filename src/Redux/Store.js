// import { configureStore } from '@reduxjs/toolkit';
// import coinReducer from './coinSlice';

// export const store = configureStore({
//   reducer: {
//     coins: coinReducer,
//   },
// });


// src/Redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './coinSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    coins: coinReducer,
    cart: cartReducer,
  },
});

