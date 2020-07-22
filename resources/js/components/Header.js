import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className='navbar navbar-expanded-md navbar-dark navbar-laravel'>
        <div className='container'>
            <Link className='nav-brand' to='/'>Home</Link>
        </div>
    </nav>
)

export default Header