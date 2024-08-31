import { TierListContext } from '@/lib/context'
import { TierType } from '@/lib/types'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useContext, useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'

const Main = () => {
   const tierList = useContext(TierListContext)?.tierList!

   return (
      <main className='col-span-4 grid gap-2'>
         {tierList.map((tier) => (
            <Tier key={tier.name} tier={tier} />
         ))}
      </main>
   )
}

const Tier = ({ tier }: { tier: TierType }) => {
   const ref = useRef(null)
   const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

   useEffect(() => {
      const el = ref.current
      invariant(el)

      return dropTargetForElements({
         element: el,
         onDragEnter: () => console.log('dragged over'),
         onDragLeave: () => setIsDraggedOver(false),
         onDrop: ({ source }) => console.log(source),
      })
   }, [])

   return (
      <div className='grid h-24 gap-4 bg-white/10 p-2' ref={ref}>
         <div className='flex flex-wrap gap-2'>
            <div className='grid w-12 place-content-center'>
               <h3 className='font-zhun text-3xl'>{tier.name}</h3>
            </div>
            <div className='flex flex-wrap gap-2'>
               {tier.ships.map((ship) => (
                  <div key={ship.name} className='flex flex-col'>
                     <div className='flex items-center justify-between'>
                        <div className='text-lg font-bold'>{ship.name}</div>
                        <div className='text-sm'>{ship.rarity}</div>
                     </div>
                     <div className='flex items-center justify-between'>
                        <div className='text-sm'>{ship.hull}</div>
                        <div className='text-sm'>{ship.faction}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Main
