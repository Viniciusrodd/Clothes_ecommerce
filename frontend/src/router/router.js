import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProduct from '../views/productViews/CreateProduct.vue'
import Product from '../views/productViews/Product.vue'
import EditProduct from '@/views/productViews/EditProduct.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/createProduct',
        name: 'CreateProduct',
        component: CreateProduct
    },
    {
        path: '/product',
        name: 'Product',
        component: Product
    },
    {
        path: '/edit',
        name: 'EditProduct',
        component: EditProduct
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
