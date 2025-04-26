import { useContext, useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { FilterContext } from '@/contexts/FilterContext'
import { ShipType } from '@/utils/types'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { RotateCcw } from 'lucide-react'
import { TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'
import { Tooltip } from '@radix-ui/react-tooltip'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { SettingsContext } from '@/contexts/SettingsContext'
import { motion, AnimatePresence } from 'motion/react'

const hullTypes = [
   { id: 1, name: 'DD' },
   { id: 2, name: 'CL' },
   { id: 3, name: 'CA' },
   { id: 4, name: 'BB' },
   { id: 5, name: 'CV' },
   { id: 6, name: 'AR' },
   { id: 7, name: 'SS' },
   { id: 8, name: 'Misc' },
]

const factionTypes = [
   { id: 1, name: 'Eagle Union' },
   { id: 2, name: 'Royal Navy' },
   { id: 3, name: 'Sakura Empire' },
   { id: 4, name: 'Iron Blood' },
   { id: 5, name: 'Dragon Empery' },
   { id: 6, name: 'Sardegna Empire' },
   { id: 7, name: 'Northern Parliament' },
   { id: 8, name: 'Iris Libre' },
   { id: 9, name: 'Vichya Dominion' },
   { id: 10, name: 'Kingdom of Tulipa' },
   { id: 11, name: 'Tempesta' },
   { id: 12, name: 'META' },
   { id: 13, name: 'Misc' },
]

const rarityTypes = [
   { id: 1, name: 'Common' },
   { id: 2, name: 'Rare' },
   { id: 3, name: 'Elite' },
   { id: 4, name: 'Super Rare' },
   { id: 5, name: 'Ultra Rare' },
]

const Sidebar = () => {
   const filterContext = useContext(FilterContext)
   const isCollapsed = useContext(SettingsContext)?.isCollapsed

   const handleNameFilterChange = (
      event: React.ChangeEvent<HTMLInputElement>,
   ) => {
      filterContext?.updateFilter('name', event.target.value.toLowerCase())
   }

   return (
      <AnimatePresence>
         {!isCollapsed && (
            <motion.aside
               initial={{ x: -300, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -300, opacity: 0 }}
               transition={{ duration: 0.15 }}
               className='no-scrollbar col-span-2 flex h-[calc(100vh-88px)] flex-col gap-3 overflow-y-auto'
            >
               <section className='flex gap-4'>
                  <input
                     type='text'
                     name='search'
                     id='search'
                     className='max-w-xs flex-1 bg-black/20 px-4 py-1 focus:outline-none'
                     placeholder='Search by name'
                     value={filterContext?.filter.name}
                     onChange={handleNameFilterChange}
                  />

                  {/* Reset filters button */}
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger
                           className='bg-black/20 px-2 py-1 duration-150 hover:bg-black/30'
                           onClick={() => filterContext?.resetFilters()}
                        >
                           <RotateCcw />
                        </TooltipTrigger>
                        <TooltipContent>Reset filters</TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </section>
               <section className='grid gap-2'>
                  <label className='pl-1 text-sm opacity-75'>Index</label>
                  <HullFilters />
               </section>
               <section className='grid gap-2'>
                  <label className='pl-1 text-sm opacity-75'>Faction</label>
                  <FactionFilters />
               </section>
               <section className='grid gap-2'>
                  <label className='pl-1 text-sm opacity-75'>Rarity</label>
                  <RarityFilters />
               </section>
               <section className='flex-1'>
                  <SearchResults />
               </section>
            </motion.aside>
         )}
      </AnimatePresence>
   )
}

const HullFilters = () => {
   return (
      <div className='flex flex-wrap gap-2'>
         {hullTypes.map((hullType) => (
            <HullFilter key={hullType.id} {...hullType} />
         ))}
      </div>
   )
}

// Individual hull filter
const HullFilter = ({ name }: { name: string }) => {
   const filterContext = useContext(FilterContext)

   const handleHullFilterClick = () => {
      if (filterContext?.filter.hull.includes(name)) {
         filterContext?.updateFilter(
            'hull',
            filterContext?.filter.hull.filter((hull) => hull !== name),
         )
      } else {
         filterContext?.updateFilter('hull', [
            ...filterContext.filter.hull,
            name,
         ])
      }
   }

   return (
      <button
         className={cn(
            'w-24 bg-cover bg-center py-1 font-zhun text-sm duration-150 hover:backdrop-brightness-50',
            filterContext?.filter.hull.includes(name)
               ? "bg-[url('./assets/images/button-on.webp')]"
               : "bg-[url('./assets/images/button-off.webp')]",
         )}
         onClick={handleHullFilterClick}
      >
         {name}
      </button>
   )
}

const FactionFilters = () => {
   return (
      <div className='flex flex-wrap gap-2'>
         {factionTypes.map((factionType) => (
            <FactionFilter key={factionType.id} {...factionType} />
         ))}
      </div>
   )
}

// Individual faction filter
const FactionFilter = ({ name }: { name: string }) => {
   const filterContext = useContext(FilterContext)

   const handleFactionFilterClick = () => {
      if (filterContext?.filter.faction.includes(name)) {
         filterContext?.updateFilter(
            'faction',
            filterContext?.filter.faction.filter((faction) => faction !== name),
         )
      } else {
         filterContext?.updateFilter('faction', [
            ...filterContext.filter.faction,
            name,
         ])
      }
   }

   return (
      <button
         className={cn(
            'h-[34px] w-24 bg-cover bg-center px-1 py-px font-zhun text-xs duration-150 hover:backdrop-brightness-50',
            filterContext?.filter.faction.includes(name)
               ? "bg-[url('./assets/images/button-on.webp')]"
               : "bg-[url('./assets/images/button-off.webp')]",
         )}
         onClick={handleFactionFilterClick}
      >
         {name}
      </button>
   )
}

const RarityFilters = () => {
   return (
      <div className='flex flex-wrap gap-2'>
         {rarityTypes.map((rarityType) => (
            <RarityFilter key={rarityType.id} {...rarityType} />
         ))}
      </div>
   )
}

// Individual rarity filter
const RarityFilter = ({ name }: { name: string }) => {
   const filterContext = useContext(FilterContext)

   const handleRarityFilterClick = () => {
      if (filterContext?.filter.rarity.includes(name)) {
         filterContext?.updateFilter(
            'rarity',
            filterContext?.filter.rarity.filter((rarity) => rarity !== name),
         )
      } else {
         filterContext?.updateFilter('rarity', [
            ...filterContext.filter.rarity,
            name,
         ])
      }
   }

   return (
      <button
         className={cn(
            'w-24 bg-cover bg-center py-1 font-zhun text-sm duration-150 hover:backdrop-brightness-50',
            filterContext?.filter.rarity.includes(name)
               ? "bg-[url('./assets/images/button-on.webp')]"
               : "bg-[url('./assets/images/button-off.webp')]",
         )}
         onClick={handleRarityFilterClick}
      >
         {name}
      </button>
   )
}

const SearchResults = () => {
   const ships = useContext(FilterContext)?.ships

   if (ships && ships.length === 0) {
      return (
         <div className='grid h-full items-center px-4'>
            <p className='font-zhun'>No results found</p>
         </div>
      )
   }

   return (
      <div className='flex flex-1 flex-wrap gap-2 pr-8'>
         {ships?.map((ship) => <Ship key={ship.id} ship={ship} />)}
      </div>
   )
}

const Ship = ({ ship }: { ship: ShipType }) => {
   const ref = useRef(null)
   const [image, setImage] = useState<number>(0)
   const [dragging, setDragging] = useState<boolean>(false)

   const cycleImage = () => {
      setImage((prev) => (prev + 1 >= ship.images.length ? 0 : prev + 1))
   }

   useEffect(() => {
      const el = ref.current
      if (!el) {
         return
      }

      return draggable({
         element: el,
         getInitialData: () => ({
            name: ship.name,
            image: `https://raw.githubusercontent.com/niko-993/azur-lane-assets/main/PNG/${ship.images[image]}`,
         }),
         onDragStart: () => setDragging(true),
         onDrop: () => setDragging(false),
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [image])

   return (
      <div
         className={cn(
            'w-16 cursor-move space-y-2 bg-white/10 p-1',
            dragging && 'animate-wiggle opacity-50',
         )}
         ref={ref}
      >
         <LazyLoadImage
            src={`https://raw.githubusercontent.com/niko-993/azur-lane-assets/main/PNG/${ship.images[image]}`}
            alt={ship.name}
            onClick={cycleImage}
            className='w-16'
            draggable='false'
            effect='blur'
            width={56}
            height={56}
         />
         <p className='truncate text-center font-zhun text-[0.625rem]'>
            {ship.name}
         </p>
      </div>
   )
}

export default Sidebar
