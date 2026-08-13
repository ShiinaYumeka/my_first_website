import type { IslandGear } from '@/types/wiki'

export const islandGear: IslandGear[] = [
  {
    id: 'iron-helmet',
    name: '精铁头盔',
    tier: 'II',
    modes: [
      { name: '经典', price: 80 },
      { name: '竞技', price: 120 },
    ],
    effects: ['减少头部伤害 15%', '轻微降低移速'],
  },
  {
    id: 'scout-vest',
    name: '侦察背心',
    tier: 'I',
    modes: [{ name: '经典', price: 50 }],
    effects: ['提高潜行移速 10%', '降低被探测距离'],
  },
  {
    id: 'heavy-boots',
    name: '重装战靴',
    tier: 'III',
    modes: [
      { name: '经典', price: 140 },
      { name: '竞技', price: 180 },
      { name: '乱斗', price: 160 },
    ],
    effects: ['减少爆炸击退', '免疫短暂减速'],
  },
]
