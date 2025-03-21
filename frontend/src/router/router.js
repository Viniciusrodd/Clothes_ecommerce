import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProduct from '../views/productViews/CreateProduct.vue'
import Product from '../views/productViews/Product.vue'
import EditProduct from '@/views/productViews/EditProduct.vue'
import HomePage from '@/views/RoutesViews/HomePage.vue'
import BuyProd from '@/views/RoutesViews/BuyProd.vue'
import RegisterUser from '@/views/UsersViews/RegisterUser.vue'
import MyAccount from '@/views/UsersViews/MyAccount.vue'
import userCart from '@/views/UsersViews/userCart.vue'
import AccountDetails from '@/views/controlPanelViews/AccountDetails.vue'
import Pedidos from '@/views/controlPanelViews/Pedidos.vue'
import RecentBuys from '@/views/controlPanelViews/RecentBuys.vue'
import Address from '@/views/controlPanelViews/Address.vue'


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
        path: '/edit/:id',
        name: 'EditProduct',
        component: EditProduct
    },
    {
        path: '/homepage',
        name: 'Homepage',
        component: HomePage
    },
    {
        path: '/produto/:id',
        name: 'BuyProd',
        component: BuyProd
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterUser
    },
    {
        path: '/minhaConta',
        name: 'MinhaConta',
        component: MyAccount
    },
    {
        path: '/carrinho',
        name: 'userCart',
        component: userCart
    },
    {
        path: '/detalhesConta/:id',
        name: 'accountDetails',
        component: AccountDetails 
    },
    {
        path: '/pedidos',
        name: 'Pedidos',
        component: Pedidos
    },
    {
        path: '/comprasRecentes',
        name: 'ComprasRecentes',
        component: RecentBuys
    }, 
    {
        path: '/EnderecoDeEntrega',
        name: 'Address',
        component: Address
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
