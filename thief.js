const BitcoinCore = require('bitcoin-core')
const mnemonicToAddresses = require('./mnemonic-to-addresses')
const credentials = require('./credentials')

// 3. Connect to Bitcoin Core RPC
const client = new BitcoinCore(credentials)

const check = async () => {
  let addresses = []
  try {
    addresses = await mnemonicToAddresses(
      'february buddy will entry husband finish mirror lake remind design power length',
    )
  } catch (e) {
    console.error(e)
    return
  }

  for (const address of addresses) {
    try {
      const balance = await client.command('getreceivedbyaddress', address)
      console.log(`Address: ${address}, Balance: ${balance} BTC`)
    } catch (err) {
      console.error(`Error fetching balance for ${address}: ${err.message}`)
    }
  }
}

check()