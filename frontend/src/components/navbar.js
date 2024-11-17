import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user, logout }) {
  const navigate = useNavigate();

  const renderNavigation = () => {
    if (!user) {
      return [
        { name: 'Sign In', href: '/signin' },
        { name: 'Sign Up', href: '/signup' },
      ];
    }
    if (user.role === 'admin') {
      return [
        { name: 'Stock', href: '/stock' },
        { name: 'Orders', href: '/orders' },
        { name: 'Log Out', onClick: logout },
      ];
    }
    return [
      { name: 'Products', href: '/' },
      { name: 'Shopping Cart', href: '/cart' },
      { name: 'Log Out', onClick: logout },
    ];
  };

  const navigation = renderNavigation();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex-shrink-0">
                  <span className="text-white font-bold text-lg">Ecommerce CEI</span>
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>

              {/* Links for larger screens */}
              <div className="hidden sm:flex sm:space-x-4">
                
              </div>

              {/* User Profile or Auth Links */}
              <div className="hidden sm:flex sm:items-center">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href || '#'}
                    onClick={item.onClick}
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href || '#'}
                  onClick={item.onClick}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}