import ContractABI from './Instagram.json'
import Web3 from 'web3'

const address = '0x5eBF5CbD7288e23117a050a9221725C5A60EB308' // goerli export edebilirim
// const address = '0x680100e676E22Dc4019574D79c77ebeC4bb3163d' // ganache local export edebilirim
// export const address = '0xf76Bff8cca4403bEeD9F0d57F8Aa041f20ce7446'

export const createContract = () => {
  const { ethereum } = window
  if (ethereum) {
    const web3 = new Web3(ethereum)
    return new web3.eth.Contract(ContractABI.abi, address)
  }
}

export const modalStyles = {
  content: {
    height: '300px',
    width: '400px',
    margin: 'auto',
    marginTop: '150px',
    display: 'flex',
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 74%)',
  },
}
