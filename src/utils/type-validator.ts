import { TierShipType, TierType } from '@/lib/types'

export const isTierListArray = (value: any): value is TierType[] => {
   return (
      Array.isArray(value) &&
      value.every(
         (tier: TierType) =>
            typeof tier === 'object' &&
            typeof tier.name === 'string' &&
            Array.isArray(tier.ships) &&
            tier.ships.every(
               (ship: TierShipType) =>
                  typeof ship === 'object' &&
                  typeof ship.name === 'string' &&
                  typeof ship.image === 'string',
            ),
      )
   )
}
