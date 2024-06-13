import { createContext, useState } from 'react'
import { FilterContextType, FilterType } from './types'

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [filter, setFilter] = useState<FilterType>({
		name: '',
		rarity: [],
		hull: [],
		faction: [],
	})

	const updateFilter = (key: keyof FilterType, value: string | string[]) => {
		console.log(filter)

		setFilter((prev) => {
			return { ...prev, [key]: value }
		})
	}

	return (
		<FilterContext.Provider value={{ filter, updateFilter }}>
			{children}
		</FilterContext.Provider>
	)
}

export { FilterContext, FilterProvider }
