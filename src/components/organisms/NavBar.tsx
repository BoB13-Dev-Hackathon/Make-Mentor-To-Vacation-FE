import React from 'react';
import {
    Navbar, 
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';

import { ReactComponent as VacationLogo } from '../atoms/fluent-mdl2--vacation.svg';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar isBordered position="static" className='shadow-md bg-primary-300'>
            <Link to="/">
                <NavbarBrand>
                    <VacationLogo className='size-12'/>
                    <p className='font-serif text-inherit font-bold'> Make Mentor To Vacation</p>
                </NavbarBrand>
            </Link>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex text-sm font-light">
                    #BoBHackathon
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar;