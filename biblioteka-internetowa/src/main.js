import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Books from './components/Books.vue'
import News from './components/News.vue'
import BookDetails from './components/BookDetails.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name: 'Home', component: Books},
        {path:'/news', name: 'News', component: News},
        {path:'/details/:bookId', name: 'Details', component: BookDetails, props:true}
    ]
})

createApp(App).use(router).mount('#app')
