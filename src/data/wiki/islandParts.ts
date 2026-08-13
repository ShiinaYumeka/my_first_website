import type { IslandPart } from '@/types/wiki'

export const islandParts: IslandPart[] = [
  {
    id: 'scope-rail',
    name: '瞄准导轨',
    attachTo: ['突击步枪', '狙击枪'],
    qualityRange: '普通 ~ 传说',
    conflicts: ['全息瞄准镜'],
    effects: [{ text: '提高腰射精度', range: '4% ~ 12%' }],
  },
  {
    id: 'extended-mag',
    name: '扩容弹匣',
    attachTo: ['突击步枪', '冲锋枪', '手枪'],
    qualityRange: '优秀 ~ 史诗',
    conflicts: ['快速弹匣'],
    effects: [
      { text: '增加弹匣容量', range: '+8 ~ +20' },
      { text: '略微延长换弹时间', range: '0.1s ~ 0.3s' },
    ],
  },
  {
    id: 'muzzle-brake',
    name: '枪口制退器',
    attachTo: ['突击步枪', '轻机枪'],
    qualityRange: '普通 ~ 史诗',
    conflicts: ['消音器', '补偿器'],
    effects: [{ text: '降低垂直后坐力', range: '8% ~ 18%' }],
  },
]
