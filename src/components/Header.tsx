import logo from '@/assets/images/logo.webp'
import { cn } from '@/utils/cn'
import { TierListContext } from '@/contexts/TierListContext'
import { SettingsContext } from '@/lib/context'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip'
import domToImage from 'dom-to-image'
import { Camera, Download, Eraser, Upload } from 'lucide-react'
import { useContext, useState } from 'react'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from './ui/dialog'
import { Textarea } from './ui/textarea'
import { isTierListArray } from '@/utils/type-validator'

const Header = () => {
   const toggleEdit = useContext(SettingsContext)?.toggleEdit
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const resetTierList = useContext(TierListContext)?.resetTierList
   const importTierList = useContext(TierListContext)?.importTierList

   const [JSONTextArea, setJSONTextArea] = useState<string>('')
   const [importDialogOpen, setImportDialogOpen] = useState<boolean>(false)
   const [validJSONShape, setValidJSONShape] = useState<boolean>(false)

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
      } catch (e) {}
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

   const exportTierList = () => {
      const tierList = localStorage.getItem('tierList')
      if (!tierList) {
         return
      }

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
         tierList,
      )}`

      const link = document.createElement('a')
      link.href = jsonString
      link.download = `AL-TierList-${Date.now()}.json`
      link.click()
   }

   const getScreenshot = () => {
      const element = document.getElementById('tier-list')!

      if (!element) {
         return
      }

      const width = element.scrollWidth
      const height = element.scrollHeight

      domToImage
         .toPng(element, {
            width: width,
            height: height,
            style: {
               transform: 'scale(1)',
               transformOrigin: 'top left',
               width: `${width}px`,
               height: `${height}px`,
            },
            quality: 1,
         })
         .then((dataUrl) => {
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = `AL-TierList-${Date.now()}.png`
            link.click()
         })
         .catch((error) => {
            console.error('Screenshot capture failed:', error)
         })
   }

   return (
      <TooltipProvider>
         <header className='flex items-center justify-between'>
            <section className='flex items-center gap-4'>
               <img src={logo} alt='Tier Lane' className='w-10' />
               <div>
                  <h2 className='text-xl font-bold'>Tier Lane</h2>
                  <p className='text-sm font-light opacity-70'>
                     Azur Lane Tier List Maker
                  </p>
               </div>
            </section>
            <section className='flex gap-2'>
               {/* Reset tier list button */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'
                     onClick={resetTierList}
                  >
                     <Eraser />
                  </TooltipTrigger>
                  <TooltipContent>Reset tier list</TooltipContent>
               </Tooltip>

               {/* Import JSON button */}
               <Dialog
                  open={importDialogOpen}
                  onOpenChange={setImportDialogOpen}
               >
                  <DialogTrigger asChild>
                     <div>
                        <Tooltip>
                           <TooltipTrigger className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'>
                              <Upload />
                           </TooltipTrigger>
                           <TooltipContent>Import JSON</TooltipContent>
                        </Tooltip>
                     </div>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogTitle className='font-zhun'>
                        Import JSON
                     </DialogTitle>
                     <DialogDescription className='grid gap-2'>
                        <Textarea
                           placeholder='Paste JSON here'
                           onChange={handleImportTextarea}
                        />

                        <span
                           className={cn(
                              'text-sm',
                              validJSONShape
                                 ? 'text-green-400'
                                 : 'text-red-400',
                           )}
                        >
                           {validJSONShape ? 'Valid Format' : 'Invalid Format'}
                        </span>

                        <button
                           className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'
                           onClick={handleJSONImport}
                        >
                           Import
                        </button>
                     </DialogDescription>
                  </DialogContent>
               </Dialog>

               {/* Export as JSON button */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'
                     onClick={exportTierList}
                  >
                     <Download />
                     <TooltipContent>Export as JSON</TooltipContent>
                  </TooltipTrigger>
               </Tooltip>

               {/* Toggle edit mode */}
               <Tooltip>
                  <TooltipTrigger
                     className={cn(
                        'bg-white/10 px-4 py-2 font-zhun text-white duration-150',
                        editEnabled ? 'bg-white/40' : 'bg-white/10',
                     )}
                     onClick={toggleEdit}
                  >
                     {editEnabled ? 'Edit: On' : 'Edit: Off'}
                  </TooltipTrigger>
                  <TooltipContent>Toggle edit mode</TooltipContent>
               </Tooltip>

               {/* Screenshot button */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                     onClick={getScreenshot}
                  >
                     <Camera />
                  </TooltipTrigger>
                  <TooltipContent>Capture screenshot</TooltipContent>
               </Tooltip>
            </section>
         </header>
      </TooltipProvider>
   )
}

export default Header
