import { TierShipType, TierType } from '@/lib/types'

export const isTierListArray = (value: any): value is TierType[] => {
   if (!Array.isArray(value)) return false

   return value.every(
      (tier) =>
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
}
