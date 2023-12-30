import React, { useEffect } from 'react'
import axios from 'axios'

const Homepage = () => {
    const fetch = async () => {
        const {data} = await axios.get("/apicall")

        console.log(data);
    }

    useEffect(() => {
      fetch()
    }, [])
    
  return (
    <div>Home</div>
  )
}

export default Homepage