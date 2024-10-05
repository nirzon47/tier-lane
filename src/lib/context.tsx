import { createContext, useEffect, useState } from 'react'
import {
   SettingsContextType,
   TierListContextType,
   TierShipType,
   TierType,
} from '@/utils/types'
import { isTierListArray } from '@/utils/type-validator'

const TierListContext = createContext<TierListContextType | undefined>(
   undefined,
)

const TierListProvider = ({ children }: { children: React.ReactNode }) => {
   const [tierList, setTierList] = useState<TierType[]>([
      { name: 'S', ships: [] },
      { name: 'A', ships: [] },
      { name: 'B', ships: [] },
      { name: 'C', ships: [] },
      { name: 'D', ships: [] },
      { name: 'E', ships: [] },
   ])

   useEffect(() => {
      if (localStorage.getItem('tierList') && isTierListArray(tierList)) {
         setTierList(JSON.parse(localStorage.getItem('tierList')!))
      }
   }, [])

   const updateTierList = (tier: string, ship: TierShipType) => {
      const currentTier = tierList.find((t) => t.name === tier)

      if (!currentTier || currentTier.ships.find((s) => s.name === ship.name)) {
         return
      }

      const updatedTierShips = [...currentTier.ships, ship]
      const updatedTier = { ...currentTier, ships: updatedTierShips }

      const updatedTierList = tierList.map((t) =>
         t.name === tier ? updatedTier : t,
      )

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
   }

   const updatePosition = (
      ship: TierShipType,
      tier: string,
      position: 'left' | 'right',
   ) => {
      const tierIndex = tierList.findIndex((t) => tier === t.name)

      if (tierIndex === -1) {
         return
      }

      const currentTier = tierList[tierIndex]

      const index = tierList[tierIndex].ships.findIndex(
         (s) => s.name === ship.name,
      )

      if (
         index === -1 ||
         (position === 'left' && index === 0) ||
         (position === 'right' && index === tierList.length - 1)
      ) {
         return
      }

      if (position === 'left') {
         currentTier.ships.splice(
            index - 1,
            0,
            currentTier.ships.splice(index, 1)[0],
         )
      }

      if (position === 'right') {
         currentTier.ships.splice(
            index + 1,
            0,
            currentTier.ships.splice(index, 1)[0],
         )
      }

      const updatedTierList = tierList.map((t) =>
         t.name === tier ? currentTier : t,
      )

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
   }

   const removeFromTierList = (tier: string, ship: TierShipType) => {
      const currentTier = tierList.find((t) => t.name === tier)

      if (!currentTier) {
         return
      }

      const index = currentTier.ships.findIndex((s) => s.name === ship.name)

      if (index === -1) {
         return
      }

      currentTier.ships.splice(index, 1)

      const updatedTierList = tierList.map((t) =>
         t.name === tier ? currentTier : t,
      )

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
   }

   const resetTierList = () => {
      localStorage.removeItem('tierList')

      const emptyTierList: TierType[] = [
         { name: 'S', ships: [] },
         { name: 'A', ships: [] },
         { name: 'B', ships: [] },
         { name: 'C', ships: [] },
         { name: 'D', ships: [] },
         { name: 'E', ships: [] },
      ]

      setTierList(emptyTierList)
   }

   const importTierList = (newTierList: TierType[]) => {
      setTierList(newTierList)
      localStorage.setItem('tierList', JSON.stringify(newTierList))
   }

   const updateTierListName = (name: string, tierName: string) => {
      const updatedTierList = tierList.map((t) =>
         t.name === tierName ? { ...t, name } : t,
      )

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
   }

   const addTier = () => {
      const newTier: TierType = {
         name: `T${tierList.length + 1}`,
         ships: [],
      }

      setTierList([...tierList, newTier])
      localStorage.setItem('tierList', JSON.stringify([...tierList, newTier]))
   }

   const removeTier = (name: string) => {
      const updatedTierList = tierList.filter((t) => t.name !== name)

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
   }

   return (
      <TierListContext.Provider
         value={{
            tierList,
            updateTierList,
            updatePosition,
            removeFromTierList,
            resetTierList,
            importTierList,
            updateTierListName,
            addTier,
            removeTier,
         }}
      >
         {children}
      </TierListContext.Provider>
   )
}

const SettingsContext = createContext<SettingsContextType | undefined>(
   undefined,
)

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
   const [editEnabled, setEditEnabled] = useState<boolean>(false)

   const toggleEdit = () => {
      setEditEnabled(!editEnabled)
   }

   return (
      <SettingsContext.Provider value={{ editEnabled, toggleEdit }}>
         {children}
      </SettingsContext.Provider>
   )
}

export { TierListContext, TierListProvider, SettingsContext, SettingsProvider }
