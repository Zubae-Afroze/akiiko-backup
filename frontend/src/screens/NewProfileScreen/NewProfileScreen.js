import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import ShippingComp from '../../components/ProfileComponent/ShippingComp'
import YourOrdresComp from '../../components/ProfileComponent/YourOrdersComp'
import { AnimatePresence } from 'framer-motion'
import './style.css'
import '../Chekout/style.css'
import ProfileComp from '../../components/ProfileComponent/ProfileComp'
import { getUserProfileByUID } from '../../actions/actionProfile'
import { listMyOrders } from '../../actions/actionOrder'
import { firebaseLogout } from '../../actions/actionAuth'
import { useHistory } from 'react-router-dom'

export const PROFILE_COMP = 'profile'
const SHIPPING_COMP = 'shipping'
const YOUR_ADDRESS_COMP = 'address'

export default function NewProfileScreen() {
  const dispatch = useDispatch()

  const uid = useSelector((state) => state.firebase.auth.uid)

  const [profileScreenDisplayComp, setProfileScreenDisplayComp] =
    useState(PROFILE_COMP)

  const profileDetails = useSelector((state) => state.profile.userProfile)

  const history = useHistory()

  useEffect(() => {
    // history.push('/login?redirect=/')
    dispatch(getUserProfileByUID(uid))
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(listMyOrders())
  })

  const logouthandler = () => {
    dispatch(firebaseLogout())
    history.push('/')
  }

  if (uid === null || uid === undefined) {
    history.push('/login?redirect=/newProfile')
  }

  return (
    <>
      {profileDetails && (
        <div style={{ backgroundColor: '#e2dcd5' }}>
          <Container className='ps-md-5 pe-md-5 d-flex justify-content-center'>
            <Container className='f-f m-xs-1 m-md-5 pt-xs-2 p-md-5'>
              <Row>
                <Col xs={12} md={4}>
                  <div className='px-lg-5 profile-tabs'>
                    <ul style={{ listStyle: 'none' }}>
                      <div className='d-block d-sm-block d-md-none'>
                        {' '}
                        <br />{' '}
                      </div>
                      <li className='f-f'>Welcome Back</li>
                      <li
                        className={
                          'tabs ' +
                          (profileScreenDisplayComp === PROFILE_COMP
                            ? 'f-f-dim-b'
                            : '')
                        }
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setProfileScreenDisplayComp(PROFILE_COMP)
                        }}
                      >
                        {profileDetails.name}
                      </li>
                      <br />
                      <hr />
                      <li
                        className={
                          'tabs ' +
                          (profileScreenDisplayComp === SHIPPING_COMP
                            ? 'f-f-dim-b'
                            : '')
                        }
                        onClick={() => {
                          setProfileScreenDisplayComp(SHIPPING_COMP)
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        Shipping
                      </li>
                      <hr />
                      <li
                        className={
                          'tabs ' +
                          (profileScreenDisplayComp === YOUR_ADDRESS_COMP
                            ? 'f-f-dim-b'
                            : '')
                        }
                        onClick={() => {
                          setProfileScreenDisplayComp(YOUR_ADDRESS_COMP)
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        Your Orders
                      </li>
                      <hr />
                      <li
                        className='tabs'
                        onClick={() => {
                          logouthandler()
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        Log Out
                      </li>
                      <hr />
                    </ul>
                  </div>
                </Col>

                {/* <Col xs={0} md={1} className='p-0 m-0'></Col> */}

                <Col xs={12} md={8} className='p-0'>
                  <AnimatePresence>
                    {profileScreenDisplayComp === PROFILE_COMP ? (
                      <ProfileComp profileDetails={profileDetails} />
                    ) : profileScreenDisplayComp === SHIPPING_COMP ? (
                      <ShippingComp
                        setProfileScreenDisplayComp={
                          setProfileScreenDisplayComp
                        }
                      />
                    ) : (
                      <YourOrdresComp />
                    )}
                  </AnimatePresence>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      )}
    </>
  )
}
