import { createContext, useState } from 'react'
import { SettingsContextType } from '@/utils/types'

const SettingsContext = createContext<SettingsContextType | undefined>(
   undefined,
)

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
   const [editEnabled, setEditEnabled] = useState<boolean>(false)
   const [isHighlightMode, setIsHighlightMode] = useState<boolean>(false)

   const toggleEdit = () => {
      setEditEnabled(!editEnabled)
   }

   const toggleHighlightMode = () => {
      setIsHighlightMode(!isHighlightMode)
   }

   return (
      <SettingsContext.Provider
         value={{
            editEnabled,
            toggleEdit,
            isHighlightMode,
            toggleHighlightMode,
         }}
      >
         {children}
      </SettingsContext.Provider>
   )
}

export { SettingsContext, SettingsProvider }
