// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './Redux/Store';
// import CoinListTable from './CoinListTable/CoinListTable';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Crypto Coins List</h1>
//         <CoinListTable />
//       </div>
//     </Provider>
//   );
// };

// export default App;


// // src/App.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './Redux/Store';
// import CoinListTable from './CoinListTable/CoinListTable';
// import CartPage from './CartPage/CartPage';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { Button } from '@mui/material';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <div>
//           <h1>Crypto Coins List</h1>
//           {/* <Button component={Link} to="/" variant="contained" color="primary" style={{ marginRight: 10 }}>
//             Coin List
//           </Button> */}
//           <Button component={Link} to="/cart" variant="contained" color="secondary">
//             View Cart
//           </Button>
//           <Routes>
//             <Route path="/" element={<CoinListTable />} />
//             <Route path="/cart" element={<CartPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './Redux/Store';
import CoinListTable from './CoinListTable/CoinListTable';
import CartPage from './CartPage/CartPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartIcon = () => {
  const totalItems = useSelector((state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <IconButton component={Link} to="/cart">
      <Badge badgeContent={totalItems} color="secondary" sx={{ml:2}}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1 style={{marginLeft:10}}>Crypto Coins List</h1>
          <CartIcon />
          <Routes>
            <Route path="/" element={<CoinListTable />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
