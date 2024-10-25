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
   resetFilters: () => void
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
   id?: string
   name: string
   image: string
}

export type TierType = {
   id?: string
   name: string
   ships: TierShipType[]
}

export type TierListContextType = {
   tierList: TierType[]
   updateTierList: (tier: string, ship: TierShipType) => void
   removeFromTierList: (tier: string, ship: TierShipType) => void
   resetTierList: () => void
   importTierList: (newTierList: TierType[]) => void
   updateTierListName: (name: string, tierName: string) => void
   addTier: () => void
   removeTier: (name: string) => void
   updatePosition: (
      ship: TierShipType,
      id: string,
      position: 'left' | 'right',
   ) => void
}

export type SettingsContextType = {
   editEnabled: boolean
   toggleEdit: () => void
}
