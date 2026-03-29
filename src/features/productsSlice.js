import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addProduct, fetchMyProducts, fetchProducts, markProductAsSold } from "../firebase/productService"
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addProductAsync = createAsyncThunk(
    "products/add",
    async (data) => {
        const res = await addProduct(data);
        return res;
    }
)

export const fetchProductsAsync = createAsyncThunk(
    "products/fetch",
    async () => {
        const res = await fetchProducts();
        return res;
    }
)

export const markAsSoldAsync = createAsyncThunk(
    "products/markSolid",
    async (id, { rejectWithValue }) => {
    try {
      await markProductAsSold(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyProductsAsync = createAsyncThunk(
    "products/fetchMy",
    async(_, {getState}) => {
        const userId = getState().auth.user.id;

        const res = await fetchMyProducts(userId);
        return res;
    }
)

export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (id) => {
    await deleteDoc(doc(db, "products", id));
    return id;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const ref = doc(db, "products", id);
    await updateDoc(ref, data);
    return { id, data };
  }
);

const productSlice = createSlice({
    name : "products",
    initialState : {
        products : [],
        myProducts : [],
        loading : false
    },
    reducers : {},

    extraReducers : (builder) => {
        builder
        //fetch products
        .addCase(fetchProductsAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchProductsAsync.rejected, (state) => {
            state.loading = false
        })

        //add products
        .addCase(addProductAsync.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })

        //sold product
        .addCase(markAsSoldAsync.fulfilled, (state, action) => {
            const product = state.products.find(p => p.id === action.payload);
            if(product){
                product.isSold = true;
            }
        })
        //myProducts
        .addCase(fetchMyProductsAsync.fulfilled, (state ,action)=>{
            state.myProducts = action.payload;
        })
        //delete product
        .addCase(deleteProductAsync.fulfilled, (state, action) => {
            state.products = state.products.filter(
                item => item.id !== action.payload
            );
        })
        .addCase(updateProductAsync.fulfilled, (state, action) => {
            const index = state.products.findIndex(
                item => item.id === action.payload.id
            );

            if (index !== -1) {
                state.products[index] = {
                ...state.products[index],
                ...action.payload.data
                };
            }
        });
    }
})

export default productSlice.reducer;