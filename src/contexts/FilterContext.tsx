import { createContext, useState } from 'react'
import { FilterContextType, FilterType, ShipType } from '@/utils/types'
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
               matches && ship.name.toLowerCase().includes(newFilter.name)
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

   const resetFilters = () => {
      setFilter({
         name: '',
         rarity: [],
         hull: [],
         faction: [],
      })

      setShips(shipList)
   }

   return (
      <FilterContext.Provider
         value={{ filter, updateFilter, ships, resetFilters }}
      >
         {children}
      </FilterContext.Provider>
   )
}

export { FilterContext, FilterProvider }
