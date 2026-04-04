import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, saveCart } from "../firebase/cartService";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId) => {
        return await getCart(userId);
    }
);

export const syncCart = createAsyncThunk(
    "cart/syncCart",
    async ({ userId, cartItems }) => {
        await saveCart(userId, cartItems);
        return cartItems;
    }
);



const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : [],
        isCartLoaded : false
    },

    reducers : {
        addToCart : (state, action) => {
            const exists = state.items.find(
                item => item.id === action.payload.id
            );

            if (!exists) {
                state.items.push(action.payload)
            }
        },

        removeFromCart : (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },

        clearCart : (state) => {
            state.items = [];
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isCartLoaded = true;
            })
            .addCase(syncCart.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    }
})

export const { addToCart , removeFromCart, clearCart } =  cartSlice.actions;
export default cartSlice.reducer;