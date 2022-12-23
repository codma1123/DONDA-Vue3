import { NavigationFailure, useRouter } from "vue-router"

export const customRouter = () => {

  const router = useRouter()

  const push = (link: string): Promise<void | NavigationFailure | undefined> => router.push(link)

  return {
    push
  }
}