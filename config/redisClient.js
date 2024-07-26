import {createClient} from 'redis'

const client = createClient()

client.on('error',err=>{
    console.error('redis Error: ',err);
})


client.connect()

export default client