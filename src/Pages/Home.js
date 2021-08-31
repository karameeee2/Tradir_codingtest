import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../Style/home.css';


const Home = () => {
  return (
    <div className="Home">
      <Button className='beerBtn' shape='round'>
        <Link to='/beerlist'>🍺 Beer List 🍻</Link>
      </Button>
    </div>
  )
}

export default Home
