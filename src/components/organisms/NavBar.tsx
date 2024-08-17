import React from 'react';
import {
    Navbar, 
    NavbarBrand,
} from '@nextui-org/react';

import { ReactComponent as VacationLogo } from '../atoms/fluent-mdl2--vacation.svg';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar isBordered position="static" className='shadow-md bg-primary-300'>
            <Link to="/">
                <NavbarBrand>
                    <VacationLogo className='size-12'/>
                    <p className='font-serif text-inherit'> Make Mentor To Vacation</p>
                </NavbarBrand>
            </Link>
        </Navbar>
    )
}

export default NavBar;