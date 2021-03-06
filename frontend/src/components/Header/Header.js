import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Modal,
  ModalBody,
  Badge,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Menubar from '../Menubar/Menubar'
import './Header.css'
import MobileNav from '../MobileNav/MobileNav'

import { getUserProfileByUID } from '../../actions/actionProfile'

import { addToCart, removeFromCart } from '../../actions/actionCart'
//import { logout } from '../../actions/actionUsers'

import { firebaseLogout } from '../../actions/actionAuth'
import { listMyOrders } from '../../actions/actionOrder'

const Header = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  //const userLogin = useSelector((state) => state.userLogin)
  //const { userInfo } = userLogin

  const auth = useSelector((state) => state.firebase.auth)

  const [cartModalShow, setCartModalShow] = useState(false)

  const logouthandler = () => {
    dispatch(firebaseLogout())
    history.push('/')
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=checkout')
    setCartModalShow(false)
  }

  const continueShoppinghandler = () => {
    history.push('/')
    setCartModalShow(false)
  }

  const uid = useSelector((state) => state.firebase.auth.uid)

  useEffect(() => {
    dispatch(getUserProfileByUID(uid))
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch])

  function CartModal(props) {
    return (
      <Modal {...props} animation={false}>
        <ModalBody className='scroll-modal'>
          <div className='head-cart-header'>
            Shopping Cart
            <img src='/images/font_images/cart.svg' alt='cart-icon' />{' '}
            <img
              src='/images/font_images/times.svg'
              alt='trash_icon'
              className='cart-modal-close'
              onClick={() => setCartModalShow(false)}
            />
            <span>
              {cartItems.reduce((acc, items) => acc + Number(items.qty), 0)}
            </span>
          </div>
          <>
            {cartItems.length === 0 ? (
              <div className='head-cart-empty'>Your Cart is empty</div>
            ) : (
              <>
                <div className='head-cart-scroll'>
                  {cartItems.map((items, index) => (
                    <div className='head-cart-wrap' key={index}>
                      <div className='head-cart-img'>
                        <img src={items.image} alt='cart_1' />
                      </div>
                      <div className='head-cart-details'>
                        <div className='head-cart-subg'>{items.subGroup}</div>
                        <div className='head-cart-prodn'>
                          {items.productName}
                          <img
                            src='/images/font_images/times.svg'
                            alt='trash_icon'
                            onClick={() => removeFromCartHandler(items.product)}
                          />
                        </div>
                        <div className='head-cart-root'>
                          <div className='head-cart-qty'>
                            <span
                              className='head-cart-dum'
                              onClick={() =>
                                (items.qty =
                                  items.qty > 1
                                    ? dispatch(
                                        addToCart(items.product, items.qty - 1)
                                      )
                                    : 1)
                              }
                            >
                              -
                            </span>
                            {items.qty}
                            <span
                              className='head-cart-div'
                              onClick={() =>
                                (items.qty = dispatch(
                                  addToCart(items.product, items.qty + 1)
                                ))
                              }
                            >
                              +
                            </span>
                          </div>
                          <div className='head-cart-price'>
                            &#x20B9;{items.price * items.qty}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='head-cart-bottom-wrap'>
                  {/* <div className='head-cart-showmore'>
                    <Link to='/cart'>
                      <button onClick={() => setCartModalShow(false)}>
                        Go To Cart Page
                      </button>
                    </Link>
                  </div> */}
                  <div className='head-cart-sub-price-wrap'>
                    <div className='head-cart-sub-price-label'>
                      Subtotal Price
                    </div>
                    <div className='head-cart-sub-price'>
                      &#x20B9;
                      {cartItems.reduce(
                        (acc, items) => acc + items.qty * items.price,
                        0
                      )}
                    </div>
                  </div>
                  <div className='head-cart-purchase-button-wrap'>
                    <button
                      id='continue'
                      onClick={continueShoppinghandler}
                      style={{ backgroundColor: '#977257' }}
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                  <div className='head-cart-purchase-button-wrap'>
                    <button onClick={checkoutHandler}>
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <>
      <Container>
        <div className='padding-class'></div>
        <Navbar fixed='top'>
          <SideNav />
          <Navbar.Brand>
            <Link to='/'>akiiko</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto title-icon-wrap'>
              <Nav className='title-bar-icon title-search'>
                <Link to='/search'>
                  <img
                    src={'/images/font_images/search.svg'}
                    alt='search_icon'
                    onClick={() => {
                      let rootCss = document.querySelector(':root')
                      rootCss.style.setProperty('--nav-bar-display', 'none')
                    }}
                  />
                </Link>
              </Nav>
              <Nav className='title-bar-icon'>
                {auth.uid ? (
                  <NavDropdown
                    title={
                      auth.photoURL ? (
                        <img
                          className='image-of-profile'
                          src={
                            auth.photoURL
                              ? auth.photoURL
                              : '/images/font_images/user.svg'
                          }
                          alt='profile'
                        />
                      ) : (
                        <div
                          style={{
                            marginTop: '5px',
                            paddingTop: '2px',
                            width: '21px',
                            height: '21px',
                            backgroundColor: '#977257',
                            borderRadius: '50%',
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontSize: '15px',
                          }}
                          className='d-flex justify-content-center align-items-center'
                        >
                          {auth.email[0]}
                        </div>
                      )
                    }
                  >
                    <LinkContainer to='/newprofile'>
                      <NavDropdown.Item>
                        Hello, {auth.displayName}
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to='/newProfile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logouthandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link to={'/login'}>
                    <img src={'/images/font_images/user.svg'} alt='user_icon' />
                  </Link>
                )}
              </Nav>
              <Nav className='title-bar-icon'>
                <>
                  <img
                    src={'/images/font_images/cart.svg'}
                    alt='cart_icon'
                    onClick={() => setCartModalShow(true)}
                  />
                  <Badge pill variant='primary'>
                    {cartItems.reduce(
                      (acc, items) => acc + Number(items.qty),
                      0
                    )}
                  </Badge>{' '}
                </>
              </Nav>
            </Nav>
          </Navbar.Collapse>
          <CartModal
            show={cartModalShow}
            onHide={() => setCartModalShow(false)}
          />
        </Navbar>
        <Menubar />
        <MobileNav />
      </Container>
    </>
  )
}

export default Header

function SideNav(){
  return(
    <div id="menuToggle">
    <input type="checkbox" value={false} /> {/* checked={false} */}
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Info</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
}
