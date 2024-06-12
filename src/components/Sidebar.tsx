import { useState } from 'react'
import { cn } from '../lib/cn'

const hullTypes = [
	{ id: 1, name: 'DD' },
	{ id: 2, name: 'CL' },
	{ id: 3, name: 'CA' },
	{ id: 4, name: 'BB' },
	{ id: 5, name: 'CV' },
	{ id: 6, name: 'AR' },
	{ id: 7, name: 'SS' },
	{ id: 8, name: 'Misc' },
]

const factionTypes = [
	{ id: 1, name: 'Eagle Union' },
	{ id: 2, name: 'Royal Navy' },
	{ id: 3, name: 'Sakura Empire' },
	{ id: 4, name: 'Iron Blood' },
	{ id: 5, name: 'Dragon Empery' },
	{ id: 6, name: 'Sardegna Empire' },
	{ id: 7, name: 'Northern Parliament' },
	{ id: 8, name: 'Iris Libre' },
	{ id: 9, name: 'Vichya Dominion' },
	{ id: 10, name: 'Tempesta' },
	{ id: 11, name: 'Misc' },
]

const rarityTypes = [
	{ id: 1, name: 'Common' },
	{ id: 2, name: 'Rare' },
	{ id: 3, name: 'Elite' },
	{ id: 4, name: 'Super Rare' },
	{ id: 5, name: 'Ultra' },
]

const Sidebar = () => {
	return (
		<aside className='col-span-2 grid gap-3'>
			<div className='grid gap-px'>
				<label htmlFor='search' className='pl-1 text-sm opacity-75'>
					Search by name
				</label>
				<input
					type='text'
					name='search'
					id='search'
					className='max-w-xs bg-black/20 px-4 py-1 focus:outline-none'
				/>
			</div>
			<div className='grid gap-2'>
				<label className='pl-1 text-sm opacity-75'>Index</label>
				<HullFilters />
			</div>
			<div className='grid gap-2'>
				<label className='pl-1 text-sm opacity-75'>Faction</label>
				<FactionFilters />
			</div>
			<div className='grid gap-2'>
				<label className='pl-1 text-sm opacity-75'>Faction</label>
				<RarityFilters />
			</div>
		</aside>
	)
}

const HullFilters = () => {
	return (
		<div className='flex flex-wrap gap-x-3 gap-y-2'>
			{hullTypes.map((hullType) => (
				<HullFilter key={hullType.id} {...hullType} />
			))}
		</div>
	)
}

const HullFilter = ({ name }: { name: string }) => {
	const [isOn, setIsOn] = useState<boolean>(false)

	return (
		<button
			className={cn(
				'font-zhun w-24 bg-cover bg-center py-1 text-sm duration-150 hover:backdrop-brightness-50',
				isOn
					? "bg-[url('src/assets/images/button-on.webp')]"
					: "bg-[url('src/assets/images/button-off.webp')]",
			)}
			onClick={() => setIsOn(!isOn)}
		>
			{name}
		</button>
	)
}

const FactionFilters = () => {
	return (
		<div className='flex flex-wrap gap-x-3 gap-y-2'>
			{factionTypes.map((factionType) => (
				<FactionFilter key={factionType.id} {...factionType} />
			))}
		</div>
	)
}

const FactionFilter = ({ name }: { name: string }) => {
	const [isOn, setIsOn] = useState<boolean>(false)

	return (
		<button
			className={cn(
				'font-zhun w-24 bg-cover bg-center px-1 py-px text-xs duration-150 hover:backdrop-brightness-50',
				isOn
					? "bg-[url('src/assets/images/button-on.webp')]"
					: "bg-[url('src/assets/images/button-off.webp')]",
			)}
			onClick={() => setIsOn(!isOn)}
		>
			{name}
		</button>
	)
}

const RarityFilters = () => {
	return (
		<div className='flex flex-wrap gap-x-3 gap-y-2'>
			{rarityTypes.map((rarityType) => (
				<RarityFilter key={rarityType.id} {...rarityType} />
			))}
		</div>
	)
}

const RarityFilter = ({ name }: { name: string }) => {
	const [isOn, setIsOn] = useState<boolean>(false)

	return (
		<button
			className={cn(
				'font-zhun w-24 bg-cover bg-center py-1 text-sm duration-150 hover:backdrop-brightness-50',
				isOn
					? "bg-[url('src/assets/images/button-on.webp')]"
					: "bg-[url('src/assets/images/button-off.webp')]",
			)}
			onClick={() => setIsOn(!isOn)}
		>
			{name}
		</button>
	)
}

export default Sidebar
