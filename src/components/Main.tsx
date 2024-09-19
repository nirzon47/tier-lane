import { cn } from '@/lib/cn'
import { SettingsContext, TierListContext } from '@/lib/context'
import { TierShipType, TierType } from '@/lib/types'
import { debounce } from '@/utils/debounce'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useContext, useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import invariant from 'tiny-invariant'

const Main = () => {
   const tierList = useContext(TierListContext)?.tierList!
   const updateTierList = useContext(TierListContext)?.updateTierList!

   return (
      <main
         id='tier-list'
         className='no-scrollbar col-span-4 grid h-[calc(100vh-88px)] content-start gap-3 overflow-y-auto pb-2'
      >
         {tierList.map((tier) => (
            <Tier key={tier.name} tier={tier} updateTierList={updateTierList} />
         ))}
      </main>
   )
}

const Tier = ({
   tier,
   updateTierList,
}: {
   tier: TierType
   updateTierList: (name: string, ship: TierShipType) => void
}) => {
   const ref = useRef(null)
   const tierList = useContext(TierListContext)?.tierList!
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const updateTierListName = useContext(TierListContext)?.updateTierListName!

   const handleTierNameInput = debounce(
      (e: React.ChangeEvent<HTMLInputElement>, tierName: string) => {
         updateTierListName(e.target.innerText, tierName)
      },
      600,
   )

   useEffect(() => {
      const el = ref.current
      invariant(el)

      return dropTargetForElements({
         element: el,
         onDrop: ({ source }) => {
            updateTierList(tier.name, source.data as TierShipType)
         },
      })
   }, [tierList])

   return (
      <section
         className={cn(
            'grid gap-4 bg-white/10 p-2',
            tier.ships.length > 0 ? 'h-fit' : 'h-[6.75rem]',
         )}
         ref={ref}
      >
         <div className='flex gap-6'>
            <div className='grid min-w-12 place-content-center'>
               <h3
                  className='font-zhun text-3xl focus:outline-none'
                  contentEditable={editEnabled}
                  suppressContentEditableWarning
                  onInput={(e) => handleTierNameInput(e as any, tier.name)}
               >
                  {tier.name}
               </h3>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
               {tier.ships.map((ship) => (
                  <Ship key={ship.name} ship={ship} tier={tier} />
               ))}
            </div>
         </div>
      </section>
   )
}

const Ship = ({ ship, tier }: { ship: TierShipType; tier: TierType }) => {
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const updatePosition = useContext(TierListContext)?.updatePosition!
   const removeFromTierList = useContext(TierListContext)?.removeFromTierList!

   return (
      <div className='relative'>
         <div className='flex w-[4.5rem] flex-col items-center gap-1 p-1'>
            <LazyLoadImage
               src={ship.image}
               alt={ship.name}
               draggable='false'
               effect='blur'
               className='w-16'
               width={64}
               height={64}
            />
            <p className='h-full truncate text-center font-zhun text-xs'>
               {ship.name.length > 12 ? ship.name.split(' ').pop() : ship.name}
            </p>
         </div>

         {/* Edit Overlays */}
         <div
            className={cn(
               editEnabled
                  ? 'absolute inset-0 z-10 grid items-center bg-black/40'
                  : 'hidden',
            )}
         >
            <div className='flex w-full items-center justify-between'>
               <button onClick={() => updatePosition(ship, tier.name, 'left')}>
                  <ChevronLeft />
               </button>
               <button onClick={() => updatePosition(ship, tier.name, 'right')}>
                  <ChevronRight />
               </button>
            </div>
         </div>
         <div
            className={cn(
               editEnabled ? 'absolute -right-2 -top-2 z-20' : 'hidden',
            )}
         >
            <button
               className='rounded-full bg-red-800 p-0.5'
               onClick={() => removeFromTierList(tier.name, ship)}
            >
               <X className='h-4 w-4' />
            </button>
         </div>
      </div>
   )
}

export default Main
