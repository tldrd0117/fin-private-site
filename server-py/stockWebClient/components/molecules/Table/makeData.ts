import { faker } from '@faker-js/faker'

export type Setting = {
    _id: string
    type: "site"|"user"
    role: "admin"|"user"|"guest"
    userId: string
    name: string
    value: string
    createAt: string
    updateAt: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}
//type	role	userId	name	value	createAt	updateAt
const newSetting = (): Setting => {
  return {
    _id: faker.name.firstName(),
    type: faker.helpers.shuffle<Setting['type']>([
        'site',
        'user',
      ])[0]!,
    role: faker.helpers.shuffle<Setting['role']>([
        'admin',
        'user',
        "guest"
      ])[0]!,
    userId: faker.name.lastName(),
    name: faker.database.column(),
    value: faker.animal.cat(),
    createAt: faker.date.anytime().toDateString(),
    updateAt: faker.date.anytime().toDateString()
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Setting[] => {
    const len = lens[depth]!
    return range(len).map((d): Setting => {
      return {
        ...newSetting(),
      }
    })
  }

  return makeDataLevel()
}
