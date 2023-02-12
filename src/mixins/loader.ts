const useLoader = () => {

  /**
   * 
   * @param loadTime 대기시간
   * @description 
   * 대기시간을 갖는 비동기 함수를 반환합니다. 
   * 반환되는 함수의 첫번째 인자는 resolve시 callbak, 두번째 인자는 reject 조건입니다.
   * 
   */
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