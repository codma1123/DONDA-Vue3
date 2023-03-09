

const useDebugger = () => {

    const logWatch = <T = any>(o:T, n:T) => {
        console.log(`watch ${o} to ${n}`)
    }

    return {
        logWatch
    }
}

export default useDebugger

export type Dubgg = ReturnType<typeof useDebugger>

