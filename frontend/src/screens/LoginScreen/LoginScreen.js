import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/actionUsers'

import MyComponent from 'react-fullpage-custom-loader'
import SpinnerIcon from '../../components/Spinner/SpinnerIcon'

import Message from '../../components/Message/Message'

import './LoginScreen.css'

const LoginScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const location = useLocation()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const googleHandler = () => {
    console.log('google')
  }

  const facebookHandler = () => {
    console.log('facebook')
  }

  return (
    <React.Fragment>
      <div className='login-wrap'>
        {loading && (
          <MyComponent
            sentences={[]}
            wrapperBackgroundColor={'rgba(255,255,255)'}
            color={'#6e4e37'}
            loaderType={'ball-spin-clockwise'}
            customLoader={<SpinnerIcon />}
          />
        )}
        {/* <Card className='card-wrap'>
                    <Card.Body>
                        <h1>Sign In</h1>
                        {error && <Message>{error}</Message>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='login-group' controlId='email'>
                                <Form.Label className='fm-label'>Email Address</Form.Label>
                                <Form.Control className='fc-label' type='email' placeholder={'Enter email'} value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control><i className="far fa-envelope icon-email"></i>
                            </Form.Group>

                            <Form.Group className='login-group' controlId='password'>
                                <Form.Label className='fm-label'>Password</Form.Label>
                                <Form.Control className='fc-label' type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control><i class="fas fa-lock icon-email"></i>
                            </Form.Group>

                            <div className='sign-wrap'><button className='sign-button' type='submit'>Sign In</button></div>
                        </Form>
                        <Row className='card-text-wrap'>
                            <Col>
                                <span className='card-text'>Dont have an account? {''}</span>
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}><span style={{ textDecoration: 'underline', textTransform: 'uppercase' }}>Please Register</span></Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card> */}
        <div className='sign-in-web'>
          <div className='sign-in-title'>
            <Link to={'/'}>
              <img
                src='./images/home_screen_images/closes.svg'
                alt='close-img'
                className='close-icons'
              />
            </Link>
            Sign In
          </div>
          {error && <Message>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <div className='sign-in-row-one' controlid='email'>
              <div className='google-sign' onClick={googleHandler}>
                <img
                  src='./images/home_screen_images/google.svg'
                  alt='google-svg'
                  className='google'
                />
                Continue with Google
              </div>
              <input
                type='text'
                placeholder='Email Address'
                className='email-ad'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                <div className='user-reg'>
                  <img
                    src='./images/home_screen_images/user-round.svg'
                    alt='user-svg'
                    className='user-round'
                  />
                  Create an account
                </div>
              </Link>
            </div>

            <div className='sign-in-row-two' controlid='password'>
              <div className='facebook-sign' onClick={facebookHandler}>
                <img
                  src='./images/home_screen_images/facebook.svg'
                  alt='facebook-svg'
                  className='facebook'
                />
                Continue with Facebook
              </div>
              <input
                type='password'
                placeholder='Password'
                className='password-box'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='sign-in-row-three'>
              <div className='sign-btn-grp'>
                <button className='sign-in-button' type='submit'>
                  Sign In
                </button>
                <span className='checkbox-and-forgot-psw'>
                  <span>
                    <input type='checkbox' className='check-box' />
                    Remember me
                  </span>
                  <span>Forgot your password?</span>
                </span>
              </div>
            </div>
          </Form>
        </div>
        <div className='sign-in-tab'>
          <div className='sign-in-title'>
            <Link to={'/'}>
              <img
                src='./images/home_screen_images/closes.svg'
                alt='close-img'
                className='close-icons'
              />
            </Link>
            Sign In
          </div>
          {error && <Message>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <div className='sign-in-row-one' controlid='email'>
              <div className='google-sign' onClick={googleHandler}>
                <img
                  src='./images/home_screen_images/google.svg'
                  alt='google-svg'
                  className='google'
                />
                Continue with Google
              </div>
              <input
                type='text'
                placeholder='Email Address'
                className='email-ad'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='sign-in-row-two' controlid='password'>
              <div className='facebook-sign' onClick={facebookHandler}>
                <img
                  src='./images/home_screen_images/facebook.svg'
                  alt='facebook-svg'
                  className='facebook'
                />
                Continue with Facebook
              </div>
              <input
                type='text'
                placeholder='Password'
                className='password-box'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='sign-in-row-three1'>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                <div className='user-reg'>
                  <img
                    src='./images/home_screen_images/user-round.svg'
                    alt='user-svg'
                    className='user-round'
                  />
                  Create an account
                </div>
              </Link>
              <div className='sign-btn-grp'>
                <button className='sign-in-button' type='submit'>
                  Sign In
                </button>
                <span className='checkbox-and-forgot-psw'>
                  <span>
                    <input type='checkbox' className='check-box' />
                    Remember me
                  </span>
                  <span>Forgot your password?</span>
                </span>
              </div>
            </div>
          </Form>
        </div>
        <div className='sign-in-mobile'>
          <div className='sign-in-mob-grp'>
            <div className='sign-in-title'>
              <Link to={'/'}>
                <img
                  src='./images/home_screen_images/closes.svg'
                  alt='close-img'
                  className='close-icons'
                />
              </Link>
              Sign In
            </div>
            {error && <Message>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <div className='google-sign' onClick={googleHandler}>
                <img
                  src='./images/home_screen_images/google.svg'
                  alt='google-svg'
                  className='google'
                />
                Continue with Google
              </div>
              <div className='facebook-sign' onClick={facebookHandler}>
                <img
                  src='./images/home_screen_images/facebook.svg'
                  alt='facebook-svg'
                  className='facebook'
                />
                Continue with Facebook
              </div>
              <input
                type='text'
                placeholder='Email Address'
                className='email-ad'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='text'
                placeholder='Password'
                className='password-box'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='sign-btn-grp'>
                <button className='sign-in-button' type='submit'>
                  Sign In
                </button>
                <span className='checkbox-and-forgot-psw'>
                  <span>
                    <input type='checkbox' className='check-box' />
                    Remember me
                  </span>
                  <span>Forgot your password?</span>
                </span>
              </div>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                <div className='user-reg'>
                  <img
                    src='./images/home_screen_images/user-round.svg'
                    alt='user-svg'
                    className='user-round'
                  />
                  Create an account
                </div>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginScreen
