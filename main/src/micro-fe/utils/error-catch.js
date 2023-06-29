export function errorCatch(fn) {
    return () => {
        try {
            fn()
        } catch (error) {
            console.log(error);
        }
    }
}