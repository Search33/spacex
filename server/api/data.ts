// import NodeCache from 'node-cache'
// import cron from 'node-cron'



// const storage = new NodeCache()


// async function fetchAndCacheData() {
//     const response = await fetch('https://fdo.rocketlaunch.live/json/launches/next/5')
//     const launches = await response.json()
//     console.log('Fetched launches:', launches)
//     storage.set('launches', launches)

// }

// fetchAndCacheData()


// export default defineEventHandler(async(event) => {
//     if (event.node.req.method === 'GET') {
//         console.log('getting data from nodeCache')
//         const data = storage.get('launches')
//         console.log('data from NodeCache is:', data)
//         if (data)
//             return { body: data }
//         } else {
//             return { 
//                 status: 404, 
//                 body: { error: 'No data found' } }
//         }
//         cron.schedule('0 */4 * * *', fetchAndCacheData)
//     })


