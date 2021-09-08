const routes = [
    { 
        path: '/', 
        redirect: '/posts'
    },
    { 
        path: '/login', 
        component: () => import('@/components/Layouts/Card'), 
        children: [
        { 
            path: '', 
            name: 'login', 
            component: () => import('@/views/V-Login') 
        }] 
    },
    { 
        path: '/register', 
        component: () => import('@/components/Layouts/Card'), 
        children: [
        {
            path: '', 
            name: 'register', 
            component: () => import('@/views/V-Register')
        }]
    },
    { 
        path: '/posts', 
        component: () => import('@/components/Layouts/MainPage'), 
        children: [
        {
            path: '', 
            name: 'posts', 
            component: () => import('@/views/V-Posts')
        }] 
    },
    { 
        path: '/posts/:id', 
        component: () => import('@/components/Layouts/MainPage'), 
        children: [
        {
            path: '', 
            name: 'post', 
            component: () => import('@/views/V-Post')
        }] 
    },
    { 
        path: '/users', 
        component: () => import('@/components/Layouts/MainPage'), 
        children: [
        {
            path: '', 
            name: 'users', 
            component: () => import('@/views/V-Users')
        }] 
    },
    { 
        path: '/users/:id', 
        component: () => import('@/components/Layouts/MainPage'), 
        children: [
        {
            path: '', 
            name: 'user', 
            component: () => import('@/views/V-UserProfile')
        }] 
    },
    {   
        path: '*', 
        component: () => import('@/components/Layouts/Card'), 
        children: [
        {
            path: '', 
            name: 'not-found', 
            component: () => import('@/views/V-NotFound')
        }] 
    }
]

export default routes