import { createContext, useEffect, useState } from 'react'
import { TierListContextType, TierShipType, TierType } from '@/utils/types'
import { isTierListArray } from '@/utils/type-validator'
import { nanoid } from 'nanoid'

const TierListContext = createContext<TierListContextType | undefined>(
   undefined,
)

const TierListProvider = ({ children }: { children: React.ReactNode }) => {
   const [tierList, setTierList] = useState<TierType[]>([
      { id: 'tier_1', name: 'S', ships: [] },
      { id: 'tier_2', name: 'A', ships: [] },
      { id: 'tier_3', name: 'B', ships: [] },
      { id: 'tier_4', name: 'C', ships: [] },
      { id: 'tier_5', name: 'D', ships: [] },
      { id: 'tier_6', name: 'E', ships: [] },
   ])

   useEffect(() => {
      if (localStorage.getItem('tierList') && isTierListArray(tierList)) {
         const tierList = JSON.parse(localStorage.getItem('tierList')!)

         tierList.forEach((tier: TierType) => {
            if (!tier.id) {
               tier.id = nanoid()
            }

            tier.ships.forEach((ship: TierShipType) => {
               if (!ship.id) {
                  ship.id = nanoid()
               }
            })
         })

         setTierList(tierList)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const updateTierList = (id: string, ship: TierShipType) => {
      let newTierList: TierType[] = tierList
      const localTierList: TierType[] = JSON.parse(
         localStorage.getItem('tierList')!,
      )

      if (localTierList) {
         newTierList = localTierList
      }

      const currentTier = newTierList.find((t) => t.id === id)

      if (!currentTier) {
         return undefined
      }

      const updatedTierShips = [...currentTier.ships, { id: nanoid(), ...ship }]
      const updatedTier = { ...currentTier, ships: updatedTierShips }

      const updatedTierList = newTierList.map((t) =>
         t.id === id ? updatedTier : t,
      )

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))

      return updatedTierList
   }

   const updatePosition = (
      ship: TierShipType,
      id: string,
      position: 'left' | 'right',
   ) => {
      const tierIndex = tierList.findIndex((t) => id === t.id)

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
         t.id === id ? currentTier : t,
      )

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
   }

   const removeFromTierList = (id: string, ship: TierShipType) => {
      const currentTier = tierList.find((t) => t.id === id)

      if (!currentTier) {
         return
      }

      const index = currentTier.ships.findIndex((s) => s.name === ship.name)

      if (index === -1) {
         return
      }

      currentTier.ships.splice(index, 1)

      const updatedTierList = tierList.map((t) =>
         t.id === id ? currentTier : t,
      )

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
   }

   const resetTierList = () => {
      localStorage.removeItem('tierList')

      const emptyTierList: TierType[] = [
         { id: 'tier_1', name: 'S', ships: [] },
         { id: 'tier_2', name: 'A', ships: [] },
         { id: 'tier_3', name: 'B', ships: [] },
         { id: 'tier_4', name: 'C', ships: [] },
         { id: 'tier_5', name: 'D', ships: [] },
         { id: 'tier_6', name: 'E', ships: [] },
      ]

      setTierList(emptyTierList)
   }

   const importTierList = (newTierList: TierType[]) => {
      setTierList(newTierList)
      localStorage.setItem('tierList', JSON.stringify(newTierList))
   }

   const updateTierListName = (name: string, id: string) => {
      const updatedTierList = tierList.map((t) =>
         t.id === id ? { ...t, name } : t,
      )

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
   }

   const addTier = () => {
      const newTier: TierType = {
         id: nanoid(),
         name: `T${tierList.length + 1}`,
         ships: [],
      }

      setTierList([...tierList, newTier])
      localStorage.setItem('tierList', JSON.stringify([...tierList, newTier]))
   }

   const removeTier = (id: string) => {
      const updatedTierList = tierList.filter((t) => t.id !== id)

      setTierList(updatedTierList)
      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
   }

   return (
      <TierListContext.Provider
         value={{
            tierList,
            setTierList,
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

export { TierListContext, TierListProvider }
