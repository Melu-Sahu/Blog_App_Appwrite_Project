import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name: "Signup",
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: "Add post",
      slug: '/add-post',
      active: authStatus
    },
    {
      name: "Profile",
      slug: '/profile',
      active: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 '>
            <Link to='/' ><Logo className='w-70' /></Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) =>
                item.active ? (<li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 mx-2 py-2 duration-200 bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>) : null
              )
            }
            {authStatus && (
              <li><LogoutBtn /></li>
            )}
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header
