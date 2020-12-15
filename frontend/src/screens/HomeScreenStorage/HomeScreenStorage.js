import React from 'react';
import {  Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import HomeScreenWorkoutProducts from '../../assets/products/HomeScreenStorageProducts';
import './HomeScreenStorage.css';

const HomeScreenWorkout = () => {

    const handleMouseEnter = (product) => {
        document.getElementById(product.productId).src=product.hoverImage
    }

    const handleMouseOut = (product) => {
        document.getElementById(product.productId).src=product.images[0];
    }

    return (
        <div className='home-screen-component'>
            <Row className='home-wrapper workout-cont'>
                <Col sm={3} className='home-button-placement'> 
                    <Link to='/storage/all_products'><button className='home-button home-workout-button'>SHOP ALL</button></Link> 
                </Col>
                <Col sm={9} className='home-wrapper'>
                    <div className='home-title'>STORAGE</div>
                    <div className='home-text'>A thoughtful range of organisers and storage bags to compliment and increase the functionality of your home. 
                    Simplistic and warm, the colour tones and minimal design elevate the mood of your personal spaces and allow for easy declaring. </div>
                </Col>
            </Row>
            <Row>
                <Col sm={5}  className='hero-image-workout'> 

                    <div className='workout-hero-image'>
                        <img src={'/images/home_screen_images/HomeScreenStorageHero.jpg'} alt='home_hero_img'/>
                    </div>
                </Col>
                <Col sm={7} className='workout-container'>
                    <Row className='workout-card-wrapper'>
                        {HomeScreenWorkoutProducts.map(product => (
                            <Col className='home-card-items ' key={product.productId}>
                                <Link to={`/product/${product.productId}`}><div>
                                    <div className='women-img-wrap'>
                                    <img id={product.productId} className='home-card-image' src={product.heroImage} alt='home_1'/>
                                    {product.bestSeller !== undefined ? <span className='label-best label-best-workout'>{product.bestSeller}</span> : null}
                                    {product.quickView !== undefined ? <span className='label-view label-view-workout' onMouseEnter={() => {handleMouseEnter(product)}} onMouseOut={() => {handleMouseOut(product)}}>{product.quickView}</span> : null}
                                    </div>
                                    <div className='home-card-title'>{product.productName}</div>
                                <div className='home-card-text'>View Details - &#x20B9;{product.price !== undefined ? product.price : product.mrpPrice}</div>
                                </div></Link>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <div className='hero-button mobile-view-button'>
                <Link to='/storage/all_products'><button>
                    Shop Now
                </button></Link>
            </div>
        </div>
    )
}
export default HomeScreenWorkout
