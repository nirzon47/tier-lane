// import { useState } from 'react'
import { FilterProvider } from '@/lib/context'
import { TierType } from '@/lib/types'
import Main from './Main'
import Sidebar from './Sidebar'

const Content = () => {
   const tierList: TierType[] = [
      { name: 'S', ships: [] },
      { name: 'A', ships: [] },
      { name: 'B', ships: [] },
      { name: 'C', ships: [] },
      { name: 'D', ships: [] },
   ]
   return (
      <>
         <section className='grid flex-1 grid-cols-6 pt-6'>
            <FilterProvider>
               <Sidebar />
            </FilterProvider>
            <Main tierList={tierList} />
         </section>
      </>
   )
}

export default Content
