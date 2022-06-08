import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/MainPage.vue'
import News from './components/News.vue'
import BookDetails from './components/BookDetails.vue'
import SearchBooks from './components/SearchBooks.vue'
import Profile from './components/Profile.vue'
import AddBook from './components/AddBook.vue'
import AddPost from './components/AddPost.vue'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name: 'Home', component: MainPage},
        {path:'/news', name: 'News', component: News},
        {path:'/details/:bookId', name: 'Details', component: BookDetails, props:true},
        {path:'/search/:sv?', name: 'Search', component: SearchBooks, props:true},
        {path: '/profile/:userId', name: 'Profile', component: Profile, props:true},
        {path: '/add', name: 'AddBook', component: AddBook},
        {path: '/add-post', name:'AddPost', component: AddPost},
    ]
})