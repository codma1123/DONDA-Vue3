const useLoader = () => {

  const createEffectLoading = (loadTime: number) => {
    return (callback: () => unknown, examine: () => unknown) => new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!examine()) reject()
        resolve(callback())
      }, loadTime)
    })
  }

  return {
    createEffectLoading
  }
} 

export default useLoader