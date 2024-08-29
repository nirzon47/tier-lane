import { TierType } from '@/lib/types'

const Main = ({ tierList }: { tierList: TierType[] }) => {
   return (
      <main className='col-span-4 grid gap-2'>
         {tierList.map((tier) => (
            <div key={tier.name} className='grid h-24 gap-4 bg-white/10 p-2'>
               <div className='flex flex-wrap gap-2'>
                  <div className='grid w-12 place-content-center'>
                     <h3 className='font-zhun text-3xl'>{tier.name}</h3>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                     {tier.ships.map((ship) => (
                        <div key={ship.name} className='flex flex-col'>
                           <div className='flex items-center justify-between'>
                              <div className='text-lg font-bold'>
                                 {ship.name}
                              </div>
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
         ))}
      </main>
   )
}

export default Main
