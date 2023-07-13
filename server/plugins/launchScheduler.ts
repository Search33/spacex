
import { useScheduler } from '#scheduler'
import * as fs from 'node:fs'
import path from 'path'


export default defineNitroPlugin(() => {
    startScheduler()
    
})

function startScheduler() {
    const scheduler = useScheduler()

    scheduler.run(async() => {
        console.log('i run every 15 seconds')
        const response = await $fetch('https://fdo.rocketlaunch.live/json/launches/next/5') as Response
        const data = await response.json()

        // Be careful with the path, it should be a path where your server has write permissions
        const filePath = path.join(__dirname, '~/public/launches.json')
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4))
        
    }).everyFourHours()
}
