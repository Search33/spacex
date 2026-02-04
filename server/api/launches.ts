import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  if (process.env.NODE_ENV === 'production') {
    return await $fetch('https://fdo.rocketlaunch.live/json/launches/next/5')
  }

  const data = readFileSync(resolve('public/launches.json'), 'utf-8')
  return JSON.parse(data)
})
