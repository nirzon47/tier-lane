import Content from '@/components/Content'
import Header from '@/components/Header'
import { SettingsProvider } from './lib/context'

const App = () => {
   return (
      <>
         <SettingsProvider>
            <Header />
            <Content />
         </SettingsProvider>
      </>
   )
}

export default App
