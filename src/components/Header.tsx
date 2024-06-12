import logo from '../assets/images/logo.webp'

const Header = () => {
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
		</header>
	)
}

export default Header
