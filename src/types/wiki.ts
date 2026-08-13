export interface IslandPartEffect {
  text: string
  range: string
}

export interface IslandPart {
  id: string
  name: string
  attachTo: string[]
  qualityRange: string
  conflicts: string[]
  effects: IslandPartEffect[]
}

export interface IslandGearMode {
  name: string
  price: number
}

export interface IslandGear {
  id: string
  name: string
  tier: string
  modes: IslandGearMode[]
  effects: string[]
}

export interface WallwarFaction {
  id: string
  name: string
  summary: string
  details: string[]
}
