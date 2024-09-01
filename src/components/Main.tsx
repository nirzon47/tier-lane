import { cn } from '@/lib/cn'
import { TierListContext } from '@/lib/context'
import { TierShipType, TierType } from '@/lib/types'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useContext, useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'

const Main = () => {
   const tierList = useContext(TierListContext)?.tierList!
   const updateTierList = useContext(TierListContext)?.updateTierList!

   return (
      <main
         id='tier-list'
         className='no-scrollbar col-span-4 grid h-[calc(100vh-88px)] gap-2 overflow-y-auto'
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

   useEffect(() => {
      const el = ref.current
      invariant(el)

      return dropTargetForElements({
         element: el,
         onDragEnter: () => console.log('dragged over'),
         onDragLeave: () => console.log('dragged out'),
         onDrop: ({ source }) => {
            updateTierList(tier.name, source.data as TierShipType)
         },
      })
   }, [])

   return (
      <section
         className={cn(
            'grid gap-4 bg-white/10 p-2',
            tier.ships.length > 0 ? 'h-fit' : 'h-28',
         )}
         ref={ref}
      >
         <div className='flex gap-6'>
            <div className='grid min-w-12 place-content-center'>
               <h3 className='font-zhun text-3xl'>{tier.name}</h3>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
               {tier.ships.map((ship) => (
                  <Ship key={ship.name} ship={ship} />
               ))}
            </div>
         </div>
      </section>
   )
}

const Ship = ({ ship }: { ship: TierShipType }) => {
   return (
      <div className='flex w-[4.5rem] flex-col items-center gap-1'>
         <img src={ship.image} />
         <p className='h-full truncate text-center font-zhun text-xs'>
            {ship.name.split(' ').pop()}
         </p>
      </div>
   )
}

export default Main
