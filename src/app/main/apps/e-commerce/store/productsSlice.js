import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsService } from 'app/services/productsService';

export const getProducts = createAsyncThunk(
  'eCommerceApp/products/getProducts',
  async () => {
    const products = await productsService.getProducts();
    return products;
  }
);

export const addProduct = createAsyncThunk(
  'eCommerceApp/products/addProduct',
  async (product) => {
    const newProduct = await productsService.addProduct(product);
    return newProduct;
  }
);

// Add other thunks for update, delete, etc.

