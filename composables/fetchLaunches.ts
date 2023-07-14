import exec from 'child_process'
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

        fs.writeFileSync(path.join(folderPath, 'launches.json'), JSON.stringify(data, null, 4), (err) => {
            if (err) {
                console.log('Failed to write to file:', err)

            } else {
                console.log('Data successfully written to file')
            }
        })
    }).everyFourHours()
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
