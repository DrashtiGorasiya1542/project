import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinsTable from '../components/CoinsTable'

const Homepage = ({change,check}) => {
  return (
    <>
   <Banner/>
   <CoinsTable change={change} check={check}/>
    </>
  )
}

export default Homepage
