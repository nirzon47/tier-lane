import Content from '@/components/Content'
import Header from '@/components/Header'
import { TierListProvider } from '@/contexts/TierListContext'
import { SettingsProvider } from '@/lib/context'

const App = () => {
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
