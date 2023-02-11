import { NavigationFailure, useRouter, Router } from "vue-router"

  export const useCustomRouter = () => {

  const router: Router = useRouter()

  return { 
    push: (link: string): Promise<void | NavigationFailure | undefined> => {
      return router.push(link)
    }
  }
}