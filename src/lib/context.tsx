import { createContext, useState } from 'react'
import {
   FilterContextType,
   FilterType,
   SettingsContextType,
   ShipType,
   TierListContextType,
   TierShipType,
   TierType,
} from './types'
import shipList from '@/assets/shiplist.json'

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
   const [filter, setFilter] = useState<FilterType>({
      name: '',
      rarity: [],
      hull: [],
      faction: [],
   })
   const [ships, setShips] = useState<ShipType[]>(shipList)

   const updateFilter = (key: keyof FilterType, value: string | string[]) => {
      const newFilter = { ...filter, [key]: value }

      // Apply filter to ships
      const filteredShips = shipList.filter((ship: ShipType) => {
         let matches = true

         if (newFilter.name) {
            matches =
               matches && ship.name.toLowerCase().startsWith(newFilter.name)
         }

         if (newFilter.rarity.length > 0) {
            matches = matches && newFilter.rarity.includes(ship.rarity)
         }

         if (newFilter.hull.length > 0) {
            matches = matches && newFilter.hull.includes(ship.hull)
         }

         if (newFilter.faction.length > 0) {
            matches = matches && newFilter.faction.includes(ship.faction)
         }

         return matches
      })

      setShips(filteredShips)
      setFilter(newFilter)
   }

   return (
      <FilterContext.Provider value={{ filter, updateFilter, ships }}>
         {children}
      </FilterContext.Provider>
   )
}

const TierListContext = createContext<TierListContextType | undefined>(
   undefined,
)

const TierListProvider = ({ children }: { children: React.ReactNode }) => {
   const [tierList, setTierList] = useState<TierType[]>(
      localStorage.getItem('tierList')
         ? JSON.parse(localStorage.getItem('tierList')!)
         : [
              { name: 'S', ships: [] },
              { name: 'A', ships: [] },
              { name: 'B', ships: [] },
              { name: 'C', ships: [] },
              { name: 'D', ships: [] },
           ],
   )

   const updateTierList = (tier: string, ship: TierShipType) => {
      const currentTier = tierList.find((t) => t.name === tier)

      if (!currentTier) {
         return
      }
      if (currentTier.ships.find((s) => s.name === ship.name)) {
         return
      }

      currentTier.ships.push(ship)

      const updatedTierList = tierList.map((t) => {
         if (t.name === tier) {
            return currentTier
         }
         return t
      })

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
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

      const updatedTierList = tierList.map((t) => {
         if (t.name === tier) {
            return currentTier
         }
         return t
      })

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

      const updatedTierList = tierList.map((t) => {
         if (t.name === tier) {
            return currentTier
         }
         return t
      })

      localStorage.setItem('tierList', JSON.stringify(updatedTierList))
      setTierList(updatedTierList)
   }

   return (
      <TierListContext.Provider
         value={{
            tierList,
            updateTierList,
            updatePosition,
            removeFromTierList,
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

export {
   FilterContext,
   FilterProvider,
   TierListContext,
   TierListProvider,
   SettingsContext,
   SettingsProvider,
}
