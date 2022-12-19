import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    // const authSore = useAuthStore()
    const { checkAuth } = useAuthStore()
    const { ssrContext } = useNuxtApp()
    if(process.server) {
        checkAuth(ssrContext?.event.node.req.headers.cookie)
        // console.log(ssrContext?.event.node.req.headers.cookie)
    } else {
        checkAuth(undefined)
    }

})