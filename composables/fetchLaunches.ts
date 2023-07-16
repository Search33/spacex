import { useScheduler } from '#scheduler'

import fs from 'fs'
import path from 'path'

const folderPath = './public'

export default defineNitroPlugin(() => {
    startScheduler()
})

async function startScheduler() {
    const scheduler = useScheduler()

    scheduler.run(async () => {
        console.log('scheduler starting..')

        const response = await $fetch('https://fdo.rocketlaunch.live/json/launches/next/5') as Response
        const rawData = await response.json()

        const data = correctJsonFormatting(rawData)

        try {
            fs.writeFileSync(path.join(folderPath, 'launches.json'), JSON.stringify(data, null, 4))
            console.log('Data successfully written to file')
        } catch (err) {
            console.log('Failed to write to file:', err)
        }
    }).everyTwoHours()
}

function correctJsonFormatting(obj: any): any {
    if (obj instanceof Object && !(obj instanceof Array)) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, correctJsonFormatting(v)]));
    } else if (obj instanceof Array) {
        return obj.map(correctJsonFormatting);
    } else if (typeof obj === 'string') {
        return obj.replace(/"/g, '\\"');
    } else {
        return obj;
    }
}
