import { cn } from '@/utils/cn'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { useContext, useState } from 'react'
import { isTierListArray } from '@/utils/type-validator'
import { TierListContext } from '@/contexts/TierListContext'

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

         if (importTierList) {
            importTierList(tierList)
            setJSONTextArea('')
            setImportDialogOpen(false)
         }
      } catch (e) {
         console.error(e)
      } finally {
         setValidJSONShape(false)
      }
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
         <DialogDescription className='grid gap-2'>
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
         </DialogDescription>
      </DialogContent>
   )
}

export default ImportJsonDialog
