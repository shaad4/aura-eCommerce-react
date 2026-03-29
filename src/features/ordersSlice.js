import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, fetchOrders } from "../firebase/orderService";

export const addOrderAsync = createAsyncThunk(
  "orders/add",
  async (data, { getState }) => {
    const user = getState().auth.user;

    const order = {
      userId: user.id,
      productId: data.id,
      product: data,
      createdAt: Date.now()
    };

    return await addOrder(order);
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetch",
  async (_, { getState }) => {
    const user = getState().auth.user;
    return await fetchOrders(user.id);
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  }
});

export default ordersSlice.reducer;