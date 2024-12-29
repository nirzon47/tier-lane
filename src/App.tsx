import Content from '@/components/Content'
import Header from '@/components/Header'
import { TierListProvider } from '@/contexts/TierListContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { useCallback, useEffect } from 'react'

const App = () => {
   const fetchTierLists = useCallback(
      async (type: 'battleships' | 'carriers' | 'vanguards') => {
         const res = await fetch(
            `https://raw.githubusercontent.com/niko-993/jmm-tl/refs/heads/main/${type}.json`,
         )
         const data = await res.json()

         return data
      },
      [],
   )

   useEffect(() => {
      const BB = fetchTierLists('battleships')
      const CV = fetchTierLists('carriers')
      const VG = fetchTierLists('vanguards')

      Promise.all([BB, CV, VG]).then((data) => {
         localStorage.setItem('battleships', JSON.stringify(data[0]))
         localStorage.setItem('carriers', JSON.stringify(data[1]))
         localStorage.setItem('vanguards', JSON.stringify(data[2]))
      })
   }, [fetchTierLists])

   return (
      <>
         <SettingsProvider>
            <TierListProvider>
               <Header />
               <Content />
            </TierListProvider>
         </SettingsProvider>
      </>
   )
}

export default App
