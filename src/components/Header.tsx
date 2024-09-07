import logo from '@/assets/images/logo.webp'
import { cn } from '@/lib/cn'
import { SettingsContext, TierListContext } from '@/lib/context'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip'
import domToImage from 'dom-to-image'
import { Camera, Download, Eraser } from 'lucide-react'
import { useContext } from 'react'

const Header = () => {
   const toggleEdit = useContext(SettingsContext)?.toggleEdit
   const editEnabled = useContext(SettingsContext)?.editEnabled
   const resetTierList = useContext(TierListContext)?.resetTierList

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
                  <TooltipTrigger>
                     <button
                        className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                        onClick={resetTierList}
                     >
                        <Eraser />
                     </button>
                  </TooltipTrigger>
                  <TooltipContent>Reset tier list</TooltipContent>
               </Tooltip>

               {/* Export as JSON button */}
               <Tooltip>
                  <TooltipTrigger>
                     <button
                        className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                        onClick={exportTierList}
                     >
                        <Download />
                     </button>
                     <TooltipContent>Export as JSON</TooltipContent>
                  </TooltipTrigger>
               </Tooltip>

               <button
                  className={cn(
                     'bg-white/10 px-4 py-2 font-zhun text-white duration-150',
                     editEnabled ? 'bg-white/40' : 'bg-white/10',
                  )}
                  onClick={toggleEdit}
               >
                  {editEnabled ? 'Edit: On' : 'Edit: Off'}
               </button>

               {/* Screenshot button */}
               <Tooltip>
                  <TooltipTrigger>
                     <button
                        className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
                        onClick={getScreenshot}
                     >
                        <Camera />
                     </button>
                  </TooltipTrigger>
                  <TooltipContent>Capture screenshot</TooltipContent>
               </Tooltip>
            </section>
         </header>
      </TooltipProvider>
   )
}

export default Header
