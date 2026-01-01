import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landingpage from './page/Landingpage'
import Anbiyam from './page/Anbiyam'
import AppNavbar from './common/Appnavbar'
import Pious from './page/Pious'
import Survice from './page/Service'
import Gallery from './page/Gallery'
import Contact from './page/Contact'


const route = () => {
  return (
    <div>
        <AppNavbar/>
        <Routes>
            <Route path='/' element={<Landingpage />}></Route>
            <Route path='/anbiyam' element={<Anbiyam />}></Route>
            <Route path='/pious' element={<Pious />}></Route>
            <Route path='/service' element={<Survice/>}></Route>
            <Route path='/gallery' element={<Gallery/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>



        </Routes>
    </div>
  )
}

export default route;