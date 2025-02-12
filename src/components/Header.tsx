import logo from '@/assets/images/logo.webp'
import { cn } from '@/utils/cn'
import { TierListContext } from '@/contexts/TierListContext'
import { SettingsContext } from '@/contexts/SettingsContext'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/Tooltip'
import domToImage from 'dom-to-image'
import {
   Camera,
   Eraser,
   HelpCircle,
   Import,
   Forward,
   Highlighter,
   ArrowRightFromLine,
   ArrowLeftFromLine,
   Check,
} from 'lucide-react'
import { useContext, useState } from 'react'
import { Dialog, DialogTrigger } from './ui/Dialog'
import ImportJsonDialog from './dialogs/ImportJsonDialog'
import HelpDialog from './dialogs/HelpDialog'
import { TierShipType, TierType } from '@/utils/types'
import { AnimatePresence, motion } from 'motion/react'

const Header = () => {
   const toggleEdit = useContext(SettingsContext)?.toggleEdit
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const resetTierList = useContext(TierListContext)?.resetTierList
   const toggleHighlightMode = useContext(SettingsContext)?.toggleHighlightMode
   const isCollapsed = useContext(SettingsContext)?.isCollapsed
   const toggleCollapsed = useContext(SettingsContext)?.toggleCollapsed

   const [importDialogOpen, setImportDialogOpen] = useState<boolean>(false)
   const [eraseConfirmationOpen, setEraseConfirmationOpen] =
      useState<boolean>(false)

   const exportTierList = () => {
      const tierList = localStorage.getItem('tierList')
      if (!tierList) {
         return
      }

      const updatedTierList = JSON.parse(tierList)
      updatedTierList.forEach((tier: TierType) => {
         delete tier.id

         tier.ships.forEach((ship: TierShipType) => {
            delete ship.id
         })
      })

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
         JSON.stringify(updatedTierList),
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

   const handleResetTierList = () => {
      setEraseConfirmationOpen(true)
      const timeoutId = setTimeout(() => {
         setEraseConfirmationOpen(false)
      }, 3000)

      if (eraseConfirmationOpen) {
         clearTimeout(timeoutId)
         resetTierList?.()
         setEraseConfirmationOpen(false)
      }
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
               {/* Help button */}
               <Dialog>
                  <DialogTrigger asChild>
                     <div>
                        <Tooltip>
                           <TooltipTrigger className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'>
                              <HelpCircle />
                           </TooltipTrigger>
                           <TooltipContent>Help</TooltipContent>
                        </Tooltip>
                     </div>
                  </DialogTrigger>
                  <HelpDialog />
               </Dialog>

               {/* Reset tier list button */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'
                     onClick={handleResetTierList}
                  >
                     <AnimatePresence mode='wait'>
                        {eraseConfirmationOpen ? (
                           <motion.div
                              key='check'
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.1 }}
                           >
                              <Check color='red' />
                           </motion.div>
                        ) : (
                           <motion.div
                              key='eraser'
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.1 }}
                           >
                              <Eraser />
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </TooltipTrigger>
                  <TooltipContent>
                     {eraseConfirmationOpen
                        ? 'Confirm Reset'
                        : 'Reset tier list'}
                  </TooltipContent>
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
                              <Import />
                           </TooltipTrigger>
                           <TooltipContent>Import JSON</TooltipContent>
                        </Tooltip>
                     </div>
                  </DialogTrigger>
                  <ImportJsonDialog setImportDialogOpen={setImportDialogOpen} />
               </Dialog>

               {/* Export as JSON button */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 text-white duration-150 hover:bg-white/20'
                     onClick={exportTierList}
                  >
                     <Forward />
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

               {/* Highlight mode */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                     onClick={toggleHighlightMode}
                  >
                     <Highlighter />
                  </TooltipTrigger>
                  <TooltipContent>Toggle highlight mode</TooltipContent>
               </Tooltip>

               {/* Collapse/Expand sidebar */}
               <Tooltip>
                  <TooltipTrigger
                     className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                     onClick={toggleCollapsed}
                  >
                     <AnimatePresence>
                        <motion.div
                           initial={{ rotate: 0 }}
                           animate={{
                              rotate: isCollapsed ? 0 : 360,
                           }}
                        >
                           {isCollapsed ? (
                              <ArrowRightFromLine />
                           ) : (
                              <ArrowLeftFromLine />
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </TooltipTrigger>
                  <TooltipContent>
                     {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  </TooltipContent>
               </Tooltip>
            </section>
         </header>
      </TooltipProvider>
   )
}

export default Header
