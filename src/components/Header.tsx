import logo from '@/assets/images/logo.webp'
import domToImage from 'dom-to-image'

const Header = () => {
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
         <button
            className='bg-white/10 px-4 py-2 font-zhun text-white duration-150 hover:bg-white/20'
            onClick={getScreenshot}
         >
            Screenshot
         </button>
      </header>
   )
}

export default Header
