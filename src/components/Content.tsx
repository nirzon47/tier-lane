import Main from './Main'
import Sidebar from './Sidebar'

const Content = () => {
	return (
		<section className='grid flex-1 grid-cols-6 pt-6'>
			<Sidebar />
			<Main />
		</section>
	)
}

export default Content
