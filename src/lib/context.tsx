import { createContext, useState } from 'react'
import {
   FilterContextType,
   FilterType,
   ShipType,
   TierListContextType,
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
   const [tierList, setTierList] = useState<TierType[]>([
      { name: 'S', ships: [] },
      { name: 'A', ships: [] },
      { name: 'B', ships: [] },
      { name: 'C', ships: [] },
      { name: 'D', ships: [] },
   ])

   return (
      <TierListContext.Provider value={{ tierList, setTierList }}>
         {children}
      </TierListContext.Provider>
   )
}

export { FilterContext, FilterProvider, TierListContext, TierListProvider }
