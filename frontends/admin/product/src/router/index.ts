import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/Product/ProductList/ProductList.vue';
import ProductForm from '../components/Product/ProductForm/ProductForm.vue';
import AddProduct from '../components/Product/AddProduct/AddProduct.vue';

const routes = [
  { path: '/catalog', name: 'Product List', component: ProductList },
  {
    path: '/catalog/add',
    name: 'Add Product',
    component: ProductForm,
  },
  {
    path: '/catalog/edit/:slug',
    component: ProductForm,
  },
  {
    path: '/catalog/brand',
    component: () => import('../components/Brand/AddBrand.vue'),
  },
  {
    path: '/catalog/category',
    component: () => import('../components/Category/AddCategory.vue'),
  },
  {
    path: '/catalog/attribute',
    component: () => import('../components/Attribute/AttributeList.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
