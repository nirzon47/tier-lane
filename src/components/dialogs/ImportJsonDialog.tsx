import { cn } from '@/utils/cn'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/Dialog'
import { Textarea } from '../ui/Textarea'
import { useContext, useState } from 'react'
import { isTierListArray } from '@/utils/type-validator'
import { TierListContext } from '@/contexts/TierListContext'
import { nanoid } from 'nanoid'
import { TierType } from '@/utils/types'

const ImportJsonDialog = ({
   setImportDialogOpen,
}: {
   setImportDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
   const importTierList = useContext(TierListContext)?.importTierList

   const [validJSONShape, setValidJSONShape] = useState<boolean>(false)
   const [JSONTextArea, setJSONTextArea] = useState<string>('')

   const handleJSONImport = () => {
      try {
         const tierList = JSON.parse(JSONTextArea)
         if (!isTierListArray(tierList)) {
            throw new Error('Invalid JSON')
         }

         tierList.forEach((tier) => {
            tier.id = nanoid()

            tier.ships.forEach((ship) => {
               ship.id = nanoid()
            })
         })

         if (importTierList) {
            importTierList(tierList)
            setJSONTextArea('')
            setImportDialogOpen(false)
         }
      } catch (e) {
         console.error('Importing JSON failed:', e)
      } finally {
         setValidJSONShape(false)
      }
   }

   const importJimmyTierList = (
      type: 'battleships' | 'carriers' | 'vanguards' | 'seasonal',
   ) => {
      switch (type) {
         case 'battleships': {
            const battleshipsTierList: TierType[] = JSON.parse(
               localStorage.getItem('battleships')!,
            )

            importTierList?.(
               battleshipsTierList.map((tier) => ({
                  ...tier,
                  id: nanoid(),
                  ships: tier.ships.map((ship) => ({
                     ...ship,
                     id: nanoid(),
                  })),
               })),
            )
            break
         }

         case 'carriers': {
            const carriersTierList: TierType[] = JSON.parse(
               localStorage.getItem('carriers')!,
            )

            importTierList?.(
               carriersTierList.map((tier) => ({
                  ...tier,
                  id: nanoid(),
                  ships: tier.ships.map((ship) => ({
                     ...ship,
                     id: nanoid(),
                  })),
               })),
            )
            break
         }

         case 'vanguards': {
            const vanguardsTierList: TierType[] = JSON.parse(
               localStorage.getItem('vanguards')!,
            )

            importTierList?.(
               vanguardsTierList.map((tier) => ({
                  ...tier,
                  id: nanoid(),
                  ships: tier.ships.map((ship) => ({
                     ...ship,
                     id: nanoid(),
                  })),
               })),
            )
            break
         }

         case 'seasonal': {
            const seasonalTierList: TierType[] = JSON.parse(
               localStorage.getItem('seasonal')!,
            )

            importTierList?.(
               seasonalTierList.map((tier) => ({
                  ...tier,
                  id: nanoid(),
                  ships: tier.ships.map((ship) => ({
                     ...ship,
                     id: nanoid(),
                  })),
               })),
            )
            break
         }
      }

      setJSONTextArea('')
      setImportDialogOpen(false)
   }

   const handleImportTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJSONTextArea(e.target.value)
      try {
         const tierList = JSON.parse(e.target.value)

         if (isTierListArray(tierList)) {
            setValidJSONShape(true)
         }
      } catch (error) {
         setValidJSONShape(false)
      }
   }
   return (
      <DialogContent>
         <DialogTitle className='font-zhun'>Import JSON</DialogTitle>
         <DialogDescription className='grid gap-2' asChild>
            <div>
               <Textarea
                  placeholder='Paste JSON here'
                  onChange={handleImportTextarea}
               />

               <span
                  className={cn(
                     'text-sm',
                     validJSONShape ? 'text-green-400' : 'text-red-400',
                  )}
               >
                  {validJSONShape ? 'Valid Format' : 'Invalid Format'}
               </span>

               <button
                  className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20 disabled:cursor-not-allowed disabled:hover:bg-white/10'
                  disabled={!validJSONShape}
                  onClick={handleJSONImport}
               >
                  Import
               </button>

               <section className='mt-8 gap-3'>
                  <p className='mb-2 font-zhun text-white'>
                     Import Jimmy's tier lists
                  </p>
                  <div className='grid grid-cols-3 items-center justify-center gap-2'>
                     <button
                        className='bg-white/10 px-4 py-2 font-bold text-white duration-150 hover:bg-white/20'
                        onClick={() => importJimmyTierList('vanguards')}
                     >
                        Vanguards
                     </button>
                     <button
                        className='bg-white/10 px-4 py-2 font-bold text-white duration-150 hover:bg-white/20'
                        onClick={() => importJimmyTierList('carriers')}
                     >
                        Carriers
                     </button>
                     <button
                        className='bg-white/10 px-4 py-2 font-bold text-white duration-150 hover:bg-white/20'
                        onClick={() => importJimmyTierList('battleships')}
                     >
                        Battleships
                     </button>

                     <div></div>

                     <button
                        className='bg-white/10 px-4 py-2 font-bold text-white duration-150 hover:bg-white/20'
                        onClick={() => importJimmyTierList('seasonal')}
                     >
                        Seasonal
                     </button>
                  </div>
               </section>
            </div>
         </DialogDescription>
      </DialogContent>
   )
}

export default ImportJsonDialog
