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
  price: string
}

export interface IslandGear {
  id: string
  name: string
  tier: string
  modes: IslandGearMode[]
  effects: string[]
}

export interface WallwarNamedNote {
  name: string
  text: string
}

export interface WallwarAchievement {
  name: string
  condition: string
  reward: string
}

export interface WallwarFactionBlock {
  heading: string
  paragraphs: string[]
  items?: WallwarNamedNote[]
}

export interface WallwarFactionSection {
  heading: string
  paragraphs: string[]
  items?: WallwarNamedNote[]
  achievements?: WallwarAchievement[]
  blocks?: WallwarFactionBlock[]
}

export interface WallwarFaction {
  id: string
  name: string
  summary: string
  sections: WallwarFactionSection[]
}

export interface WallwarItem {
  id: string
  name: string
  category: string
  effects: string[]
}
