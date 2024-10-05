// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...args: any[]) => any, delay: number) => {
   let timeoutId: ReturnType<typeof setTimeout>

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
         func.apply(this, args)
      }, delay)
   }
}
