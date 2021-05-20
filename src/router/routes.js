const routes = [

    {
        path: '/',
        component: () => import('pages/home'),
        name: 'home.index',
    },
    {
        path: '/books',
        component: () => import('pages/books/index'),
        name: 'books.index',
    },



    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
