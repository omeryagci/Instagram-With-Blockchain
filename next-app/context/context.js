import {createContext, useContext, useState, useEffect} from 'react'
import { createContract } from '../utils/constants'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import Web3 from 'web3'



export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [posts, setPosts] = useState([]) 
    const [userAddress, setUserAddress] = useState('') 
    
    const {address} = useAccount()

    useEffect(() => {
        getAllImages()
    }, [])

    useEffect ( () => {
     setUserAddress((address))
    }, [address])

    const getAllImages = async () => {
        const contract = createContract()

        try { 
            const imageCount = await contract.methods.imageCount().call()

            let newPosts = []

            for(let index=1; index <= imageCount; index++) {
                const image = await contract.methods.images(index).call()

                newPosts.push({
                    id: image.id,
                    url : image.url,
                    caption: image.caption,
                    totalTipped: image.totalTipped,
                    author: image.author,
                })
            }

            setPosts(newPosts.reverse())
         } catch  (error) {
            console.log(error.message)
        }
    }

    const uploadImage = async (imgUrl, caption) => {
        if (!address) return 
        const contract = createContract()

        try {
            const data = contract.methods.uploadImage(imgUrl, caption).send({
                from: address,
                gas: 3000000,
            })

            await toast.promise(data, {
                pending: 'Uploading image ... This can take a minute',
                success: 'Image uploaded successfully!',
                error: 'Something went wrong. Please try again later',
            })

            getAllImages()
        } catch(error) {
            console.error(error.message)
        }
        
    }

    const tipOwner = async (imageId) => {
        if (!address) return 
        const contract = createContract()

        try {
            const amount = Web3.utils.toWei('0.01', 'ether')

            const tx = contract.methods.tipImageOwner(imageId).send({
                from: address,
                gas: 3000000,
                value: amount,
                gasLimit: null,
            })

            toast.promise(tx, {
                pending: 'Sending tip...',
                success: 'Tip sent!',
                error: 'Error sending tip',
            })
        } catch (error) {
            console.error(error.message)
        }
    }
    

    return (
        <AppContext.Provider value = {{userAddress, posts, uploadImage, tipOwner}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)