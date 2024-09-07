import Content from '@/components/Content'
import Header from '@/components/Header'
import { SettingsProvider, TierListProvider } from './lib/context'

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
