import { Download, Upload } from 'lucide-react'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/Dialog'
import Divider from '../ui/Divider'

const HelpDialog = () => {
   return (
      <DialogContent className='max-w-2xl'>
         <DialogTitle className='font-zhun'>How do I use this app?</DialogTitle>
         <DialogDescription className='grid gap-2 text-base text-white' asChild>
            <div>
               <p>
                  Other than the simple drag and drop to tiers, there are a few
                  other things you can do!
               </p>
               <p>
                  <a
                     className='text-blue-300 duration-150 hover:text-indigo-300'
                     href='https://www.youtube.com/@JimmyAL'
                     target='_blank'
                  >
                     Jimmy
                  </a>{' '}
                  has done a short tutorial on how to use this app in this{' '}
                  <a
                     className='text-blue-300 duration-150 hover:text-indigo-300'
                     href='https://youtu.be/7Yk8Gqv37eo'
                     target='_blank'
                  >
                     video
                  </a>{' '}
                  if you prefer that.
               </p>
               <Divider />
               <h3 className='font-zhun'>Features:</h3>
               <ol className='list-disc space-y-1 pl-4'>
                  <li>
                     Change the skin of your ship by clicking on the icon of the
                     ship in the sidebar (search results).
                  </li>
                  <li>
                     To edit the position of a ship within a tier, you have to
                     click on the toggle{' '}
                     <strong className='px-2 font-zhun text-sm'>
                        Edit: Off
                     </strong>{' '}
                     button which will toggle the edit mode and give you access
                     to a bunch of other controls.
                  </li>
                  <li>
                     In the same edit mode, you can delete entire tiers, and add
                     new tiers to your liking!
                  </li>
                  <li>
                     You can quickly export your tier list to JSON by clicking
                     on the <Download className='inline h-4' /> button.
                  </li>
                  <li>
                     Have a JSON tier list at hand? Import it using the{' '}
                     <Upload className='inline h-4' /> button.
                  </li>
                  <li>Export the tier list in a semi transparent PNG image.</li>
               </ol>
               <Divider />
               <h3 className='font-zhun'>
                  Things that do not work or is being worked on:
               </h3>
               <ol className='list-disc space-y-1 pl-4'>
                  <li>
                     Drag and Drop ships within tiers- this is quite a task, I
                     might need to redo the entire logic of the existing drag
                     and drop or find a way to do it.
                  </li>
                  <li>
                     Rework the dataset for faster queries with more information
                     so it can be used for other projects.
                  </li>
               </ol>
               <Divider />
               <h3 className='font-zhun'>Credits:</h3>
               <p>
                  You can contact{' '}
                  <span className='px-2 font-mono'>niko_993</span> on discord if
                  you run into any issues. I am always open to suggestions.
                  <br />I also wanted to make this app open source but that will
                  no longer keep my anonymity, I will do that when I am braver.
               </p>
            </div>
         </DialogDescription>
      </DialogContent>
   )
}

export default HelpDialog
