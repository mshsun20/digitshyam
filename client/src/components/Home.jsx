import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const server = 'http://localhost:5050'
    const nav = useNavigate()

    const getLgd = async () => {
        const res = await axios.get(`${server}/home`)
        const data = await res.data
        console.log(data)
        if (data.statuscode===301) {
            nav('/log')
        }
        else {
            console.log(data.message)
        }
    }
    useEffect(() => {
        getLgd()
    }, [])

  return (
    <>
        <div>Home</div>
    </>
  )
}

export default Home