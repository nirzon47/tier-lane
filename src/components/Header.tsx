import logo from '@/assets/images/logo.webp'
import { cn } from '@/lib/cn'
import { SettingsContext } from '@/lib/context'
import domToImage from 'dom-to-image'
import { useContext } from 'react'

const Header = () => {
   const toggleEdit = useContext(SettingsContext)?.toggleEdit
   const editEnabled = useContext(SettingsContext)?.editEnabled

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
            link.download = 'screenshot.png'
            link.click()
         })
         .catch((error) => {
            console.error('Screenshot capture failed:', error)
         })
   }

   return (
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
            <button
               className={cn(
                  'bg-white/10 px-4 py-2 font-zhun text-white duration-150',
                  editEnabled ? 'bg-white/40' : 'bg-white/10',
               )}
               onClick={toggleEdit}
            >
               {editEnabled ? 'Edit Off' : 'Edit On'}
            </button>
            <button
               className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
               onClick={getScreenshot}
            >
               Screenshot
            </button>
         </section>
      </header>
   )
}

export default Header
