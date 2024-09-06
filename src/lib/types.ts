export type FilterType = {
   name: string
   rarity: string[]
   hull: string[]
   faction: string[]
}

export type FilterContextType = {
   filter: FilterType
   updateFilter: (key: keyof FilterType, value: string | string[]) => void
   ships: ShipType[]
}

export type ShipType = {
   name: string
   images: string[]
   hull: string
   faction: string
   rarity: string
   id: string
}

export type TierShipType = {
   name: string
   image: string
}

export type TierType = {
   name: string
   ships: TierShipType[]
}

export type TierListContextType = {
   tierList: TierType[]
   updateTierList: (tier: string, ship: TierShipType) => void
}

export type SettingsContextType = {
   editEnabled: boolean
   toggleEdit: () => void
}
