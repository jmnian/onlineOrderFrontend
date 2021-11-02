import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;

const MyCart = () => {
    const [cartVisible, setCartVisible] = useState(false);
    const [cartData, setCartData] = useState({});
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect( () => {
        // case1: cart is not visible -> return
        // case2: cart is visible
        //  step1 : set loading -> ture
        //  step2: fetch cart data
        //          case1: success -> setCartData(data from the server)
        //          case2: fail -> inform users
        //          set loading -> false
        if (!cartVisible) {
            return;
        }
        setLoading(true);
        getCart()
            .then( cartData => {
                console.log('cart data ->', cartData)
                setCartData(cartData);
            })
            .catch( err => {
                message.error(err.message);
            })
            .finally( () => {
                setLoading(false);
            });
    }, [cartVisible]);

    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width="auto"
                //cart下面的总价，checkout和cancel
                footer={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Text>{`Total Price: $${cartData.totalPrice ? cartData.totalPrice.toFixed(2) : 0}`}</Text>
                        <div>
                            <Button
                                style={{ marginRight: 8 }}
                                onClick={onCloseDrawer}
                            >Cancel</Button>
                            <Button
                                type="primary"
                                onClick={onCheckOut}
                                loading={checking}
                                disabled={ loading || cartData.orderItemList && cartData.orderItemList.length === 0}
                            >Checkout</Button>
                        </div>
                    </div>
                }
            >
                <List
                    dataSource={cartData?.orderItemList}
                    renderItem={
                        item => {
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.menuItem.name}
                                        description={`$${item.price}`}
                                    />
                                </List.Item>
                            )
                        }
                    }
                />
            </Drawer>
        </>
    );
};

export default MyCart;
