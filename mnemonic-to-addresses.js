const { BIP32Factory } = require('bip32')
const ecc = require('tiny-secp256k1')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

const mnemonicToAddresses = async (mnemonic, numAddresses = 10) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase')
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const root = bip32.fromSeed(seed)
  const addresses = []

  for (let i = 0; i < numAddresses; i++) {
    const path = `m/44'/0'/0'/0/${i}`
    const child = root.derivePath(path)
    const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey })
    addresses.push(address)
  }

  return addresses
}

module.exports = mnemonicToAddresses