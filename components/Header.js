import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    reload: false
  })
  const {reload} = values;
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
}, [reload]);

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">
            <div id="logo">
              <img src="/static/images/logo.png" data-retina="true" alt="" height="40"/>
					  </div>
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
                <li style={{ cursor: 'pointer' }}>
                  <Link href="/">
                    <NavLink>Home</NavLink>
                  </Link>
                </li>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <ul id="top_access">
                  <li style={{ cursor: 'pointer' }}>
                    <Link href="/signin">
                      <i className="pe-7s-user" title="Login"></i>
                    </Link>
                  </li>
                  <li style={{ cursor: 'pointer' }} className='pr-3'>
                    <Link href="/signup">
                      <i className="pe-7s-add-user" title="Sign Up"></i>
                    </Link>
                  </li>
                </ul>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem style={{ cursor: 'pointer' }}>
                <Link href="/user">
                  <NavLink>{`${isAuth().name.split(' ')[0]}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            
            {isAuth() && isAuth().role === 1 && (
              
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      {/* <Search /> */}
    </React.Fragment>
  );
};

export default Header;
