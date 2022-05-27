import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Books from './components/Books.vue'
import News from './components/News.vue'
import BookDetails from './components/BookDetails.vue'
import Register from './components/Register.vue'
import SearchBooks from './components/SearchBooks.vue'
import Profile from './components/Profile.vue'
import LogIn from './components/LogIn.vue'
import AddBook from './components/AddBook.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name: 'Home', component: Books},
        {path:'/news', name: 'News', component: News},
        {path:'/details/:bookId', name: 'Details', component: BookDetails, props:true},
        {path:'/register', name: 'Register', component: Register},
        {path:'/search', name: 'Search', component: SearchBooks},
        {path: '/profile/:userId', name: 'Profile', component: Profile, props:true},
        {path: '/login', name: 'LogIn', component: LogIn},
        {path: '/add', name: 'AddBook', component: AddBook},
    ]
})

createApp(App).use(router).mount('#app')
