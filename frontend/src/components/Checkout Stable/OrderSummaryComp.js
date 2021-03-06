import React,{useContext} from 'react'
import ItemCardT from './ItemCardComp'
import { CheckOutFormContext } from '../../screens/Stable Checkout Screen/CheckOutIndex'
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap'
import '../../screens/Stable Checkout Screen/orderSummaryStyle.css'
import '../../screens/Stable Checkout Screen/CheckOutStlye.css'

export default function OrderSummaryCompT() {

    const cartList = useSelector(state => state.cartList)

    const checkOutFormObj = useContext(CheckOutFormContext);

    return (
        <>  
            <div style={{ width:'100%'}}>
                <h6>Order Summary</h6>
                <hr/>
            <CartItemsComp />
            <hr/>
            <PriceDetailsComp />
            </div>
        </>
    )


    function CartItemsComp(){
    
        return(
            <div>
                <Row className='m-0 p-0'>
                {cartList.cartItems.map((item, index) => {
                    return (
                        <ItemCardT item={item}/>
                    );
                })}
                </Row>
            </div>
        );
    }


    function PriceDetailsComp(){
        console.log('COD: '+checkOutFormObj.formObject.isCodChecked )
        return(
            <div>
                <div className='f-f d-flex justify-content-between'>
                <h6>Subtotal</h6>
                <h6>{cartList.cartItems.reduce((acc, items) => acc + items.qty * items.price, 0)}</h6>
                </div>
                <div className='f-f d-flex justify-content-between'>
                <h6>Additional Pay</h6>

                {
                    /* cartList.cartItems.reduce((acc, items) => acc + items.qty * items.price, 0) > 500  ? */
                    isCodCheckedFunction() ?
                    <h6>50</h6>
                    : <h6>--</h6>
                }

                </div>
                <div className='f-f d-flex justify-content-between'>
                <h6>Shipping</h6>
                
                {   
                    /* checkOutFormObj.formObject.isCodChecked  */
                    checkPriceIsBelow500()
                    ? <h6>50</h6>
                    : <h6>--</h6>
                }
                
                
                </div>
                <hr />

                <div className='d-flex justify-content-between'>
                <h6 className='f-f-m'>Total</h6>

                <h6 className='f-f-m'>
                    {
                        cartList.cartItems.reduce((acc, items) => acc + items.qty * items.price, 0) +
                        (isCodCheckedFunction() ? 50 : 0) +
                        /* (checkOutFormObj.formObject.isCodChecked ? 50 : 0) + */
                        (
                        cartList.cartItems.reduce((acc, items) => acc + items.qty * items.price, 0) > 500  
                            ? 0
                            : 50
                        )
                    }
                </h6>
                
                </div>
                <div style={{height:'65px'}} />
                <div className='d-flex justify-content-center'>
                    <button type='button' className='continue-shopping-style'> {/*btn btn-outline-secondary*/}
                    Continue Shopping
                    </button>
                </div>
                <div style={{height:'65px'}} />
            </div>
        );
    }

    
    function isCodCheckedFunction(){
        const itemPriceTemp = cartList.cartItems.reduce(
            (acc, items) => acc + items.qty * items.price,
            0
        )

        if(checkOutFormObj.formObject.isCodChecked){
            return itemPriceTemp > 500 ? true : false
        }else{
            return false
        }
    }


    function checkPriceIsBelow500(){

        const itemPriceTemp = cartList.cartItems.reduce(
            (acc, items) => acc + items.qty * items.price,
            0
        )
        
        return itemPriceTemp < 500 ? true : false
        
    }

}
