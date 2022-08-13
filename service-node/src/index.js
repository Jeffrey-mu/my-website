const { createClient } = require('redis');

async function init() {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));
  console.log(client);
  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
  console.log(value);
}
init()
