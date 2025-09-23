

1. **Slice (`counterSlice.js`)** → state + reducers + actions.
2. **Store (`store.js`)** → configure Redux store.
3. **React components** → `CounterDisplay`, `AddButton`, `RemoveButton`.

---

### 1️⃣ `counterSlice.js`

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 }, // initial state = 0
  reducers: {
    addProduct: (state) => {
      state.value += 1; // increment
    },
    removeProduct: (state) => {
      state.value -= 1; // decrement
    }
  }
});

// Export actions for components
export const { addProduct, removeProduct } = counterSlice.actions;

// Export reducer for store
export default counterSlice.reducer;
```

---

### 2️⃣ `store.js`

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
```

---

### 3️⃣ React Components

#### `CounterDisplay.js`

```js
import React from 'react';
import { useSelector } from 'react-redux';

const CounterDisplay = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <h2>Products in Stock: {count}</h2>
  );
};

export default CounterDisplay;
```

---

#### `Buttons.js`

```js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from './counterSlice';

const Buttons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(addProduct())}>Add Product</button>
      <button onClick={() => dispatch(removeProduct())}>Remove Product</button>
    </div>
  );
};

export default Buttons;
```

---

### 4️⃣ Main App Setup (`App.js`)

```js
import React from 'react';
import CounterDisplay from './CounterDisplay';
import Buttons from './Buttons';

function App() {
  return (
    <div>
      <h1>🛒 E-commerce Product Counter</h1>
      <CounterDisplay />
      <Buttons />
    </div>
  );
}

export default App;
```

---

### 5️⃣ Entry Point (`index.js`)

Make sure Redux `Provider` wraps your app.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

### ✅ How it works:

* **Initial state** → `0`.
* Click **“Add Product”** → increments by 1.
* Click **“Remove Product”** → decrements by 1.
* **CounterDisplay** always shows the current count from Redux store.

