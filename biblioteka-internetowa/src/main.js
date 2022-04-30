import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Books from './components/Books.vue'
import News from './components/News.vue'
import BookDetails from './components/BookDetails.vue'
import NewsDetails from './components/NewsDetails.vue'
import Register from './components/Register.vue'
import SearchBooks from './components/SearchBooks.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name: 'Home', component: Books},
        {path:'/news', name: 'News', component: News},
        {path:'/details/:bookId', name: 'Details', component: BookDetails, props:true},
        {path:'/news/:newsId', name: 'newsDetails', component: NewsDetails, props:true},
        {path:'/register', name: 'Register', component: Register},
        {path:'/search', name: 'Search', component: SearchBooks},
    ]
})

createApp(App).use(router).mount('#app')
