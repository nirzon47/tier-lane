import { cn } from '@/utils/cn'
import { TierListContext } from '@/contexts/TierListContext'
import { SettingsContext } from '@/contexts/SettingsContext'
import { TierShipType, TierType } from '@/utils/types'
import { debounce } from '@/utils/debounce'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { ChevronLeft, ChevronRight, PlusIcon, X } from 'lucide-react'
import { useContext, useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Main = () => {
   const tierList = useContext(TierListContext)?.tierList
   const updateTierList = useContext(TierListContext)?.updateTierList
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const addTier = useContext(TierListContext)?.addTier

   return (
      <main
         id='tier-list'
         className='no-scrollbar col-span-4 grid h-[calc(100vh-88px)] content-start gap-3 overflow-y-auto pb-2'
      >
         {tierList?.map((tier) => (
            <Tier key={tier.id} tier={tier} updateTierList={updateTierList!} />
         ))}
         <div
            className={cn(
               !editEnabled
                  ? 'hidden'
                  : 'grid cursor-pointer place-content-center bg-white/10 p-4 duration-150 hover:bg-white/20',
            )}
            onClick={addTier}
         >
            <PlusIcon />
         </div>
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
   const tierList = useContext(TierListContext)?.tierList
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const updateTierListName = useContext(TierListContext)?.updateTierListName
   const removeTier = useContext(TierListContext)?.removeTier

   const handleTierNameInput = debounce(
      (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
         updateTierListName?.(e.target.innerText, id)
      },
      600,
   )

   useEffect(() => {
      const el = ref.current
      if (!el) {
         return
      }

      return dropTargetForElements({
         element: el,
         onDrop: ({ source }) => {
            updateTierList(tier.id!, source.data as TierShipType)
         },
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tierList])

   return (
      <section
         className={cn(
            'relative grid gap-4 bg-white/10 p-2',
            tier.ships.length > 0 ? 'h-fit' : 'h-[6.75rem]',
         )}
         ref={ref}
      >
         <div className='flex gap-6'>
            <div className='grid min-w-12 place-content-center px-4'>
               <h3
                  className='font-zhun text-3xl focus:outline-none'
                  contentEditable={editEnabled}
                  suppressContentEditableWarning
                  onInput={(e) =>
                     handleTierNameInput(
                        e as React.ChangeEvent<HTMLInputElement>,
                        tier.id,
                     )
                  }
               >
                  {tier.name}
               </h3>
            </div>
            <div className='flex flex-wrap gap-x-2 gap-y-1'>
               {tier.ships.map((ship) => (
                  <Ship key={ship.id} ship={ship} tier={tier} />
               ))}
            </div>
         </div>
         <div
            className={cn(
               !editEnabled
                  ? 'hidden'
                  : 'absolute right-0 grid h-full cursor-pointer place-content-center bg-red-800 px-4 duration-150 hover:bg-red-900',
            )}
            onClick={() => removeTier?.(tier.id!)}
         >
            <X className='h-4 w-4' />
         </div>
      </section>
   )
}

const Ship = ({ ship, tier }: { ship: TierShipType; tier: TierType }) => {
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const updatePosition = useContext(TierListContext)?.updatePosition
   const removeFromTierList = useContext(TierListContext)?.removeFromTierList

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
            <p className='h-full truncate text-wrap text-center font-zhun text-[0.7rem]'>
               {ship.name}
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
               <button onClick={() => updatePosition?.(ship, tier.id!, 'left')}>
                  <ChevronLeft />
               </button>
               <button
                  onClick={() => updatePosition?.(ship, tier.id!, 'right')}
               >
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
               onClick={() => removeFromTierList?.(tier.id!, ship)}
            >
               <X className='h-4 w-4' />
            </button>
         </div>
      </div>
   )
}

export default Main
