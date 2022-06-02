import { createRouter, createWebHistory } from 'vue-router'
import Books from './components/Books.vue'
import News from './components/News.vue'
import BookDetails from './components/BookDetails.vue'
import Register from './components/Register.vue'
import SearchBooks from './components/SearchBooks.vue'
import Profile from './components/Profile.vue'
import LogIn from './components/LogIn.vue'
import AddBook from './components/AddBook.vue'
import AddPost from './components/AddPost.vue'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name: 'Home', component: Books},
        {path:'/news', name: 'News', component: News},
        {path:'/details/:bookId', name: 'Details', component: BookDetails, props:true},
        {path:'/register', name: 'Register', component: Register},
        {path:'/search/:sv?', name: 'Search', component: SearchBooks, props:true},
        {path: '/profile/:userId', name: 'Profile', component: Profile, props:true},
        {path: '/login', name: 'LogIn', component: LogIn},
        {path: '/add', name: 'AddBook', component: AddBook},
        {path: '/add-post', name:'AddPost', component: AddPost}
    ]
})