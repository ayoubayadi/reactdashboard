import { db } from '../auth/services/firebase/initializeFirebase';

export const productsService = {
  getProducts: async () => {
    try {
      const snapshot = await db.collection('products').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },
  
  addProduct: async (product) => {
    try {
      const docRef = await db.collection('products').add(product);
      return {
        id: docRef.id,
        ...product
      };
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },
  
  updateProduct: async (id, product) => {
    try {
      await db.collection('products').doc(id).update(product);
      return {
        id,
        ...product
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  
  deleteProduct: async (id) => {
    try {
      await db.collection('products').doc(id).delete();
      return id;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};