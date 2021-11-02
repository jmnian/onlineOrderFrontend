import React, { useState, useEffect } from 'react';
import {List, Select, Card, Tooltip, Button, message} from 'antd';
import {addItemToCart, getRestaurants} from "../utils";
import {getMenus} from "../utils";
import { PlusOutlined } from "@ant-design/icons";


const{ Option } = Select;

const AddToCartButton = ( { itemId } ) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        //1. set loading -> ture
        //2. add item to the server
        //2.1: success
        //2.2: fail
        //2.3: finally set loading -> false
        setLoading(true);
        addItemToCart(itemId)
            .then( () =>
                message.success(`Successfully added item`)
            )
            .catch( err =>
                message.error(err.message)
            )
            .finally( () => {
                setLoading(false)
            });
    };
    return (
        <Tooltip title="Add to shopping cart">
            <Button
                icon={ <PlusOutlined />}
                type="primary"
                loading={loading}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

function FoodList(props) {
    const [loading, setLoading] = useState(false);
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [foodData, setFoodData] = useState([]);

    useEffect( () => {
        // 1. set loading status
        // 2. fetch restaurants data from the server
        // 3.1, success, setRestaurants
        // 3.2, failed
        //      finally -> set loading status -> false
        setLoading(true);
        getRestaurants ()
            .then( resData => {
                console.log('res data ->', resData);
                setRestaurants(resData);
            })
            .catch( err => {
                console.log('err -> ', err.message);
            })
            .finally( () => {
                setLoading(false)
            })
    }, []);

    //didUpdate => updated selected restaurant
    useEffect( () => {
        // step1: set loading status -> true
        // step2: get menu from the server
        //  step2.1:
        //      case1: succees, setState
        //      case2: failed
        //      finally: set loading status -> false
        setLoading(true);
        getMenus(curRest)
            .then( menuData => {
                console.log('menu ->', menuData);
                setFoodData(menuData);
            })
            .catch ( err => {
                console.log('err -> ', err.message);
            })
            .finally( () => {
                setLoading(false)
            })
    }, [curRest])

    return (
        <div>
            <Select value={ curRest }
                    loading={ loading }
                    placeholder= "Select a restaurant"
                    style={{ width: 300 }}
                    onSelect={ value => setCurRest(value)}
            >
                {
                    restaurants.map( item => {
                        return <Option key={item.id} value={item.id}>{ item.name }</Option>
                    })
                }
            </Select>
            {
                curRest
                    &&
                <List
                    style={{ marginTop: 20}}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={ item => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{ height: "auto", width: "100%", display: "block" }}
                                />
                                { `Price: ${item.price}` }
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </div>
    );
}

export default FoodList;

// import { Button, Card, List, message, Select, Tooltip } from "antd";
// import { useEffect, useState } from "react";
// import { addItemToCart, getMenus, getRestaurants } from "../utils";
// import { PlusOutlined } from "@ant-design/icons";
//
// const { Option } = Select;
//
// const AddToCartButton = ({ itemId }) => {
//     const [loading, setLoading] = useState(false);
//
//     const AddToCart = () => {
//         setLoading(true);
//         addItemToCart(itemId)
//             .then(() => message.success(`Successfully add item`))
//             .catch((err) => message.error(err.message))
//             .finally(() => {
//                 setLoading(false);
//             });
//     };
//
//     return (
//         <Tooltip title="Add to shopping cart">
//             <Button
//                 loading={loading}
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={AddToCart}
//             />
//         </Tooltip>
//     );
// };
//
// const FoodList = () => {
//     const [foodData, setFoodData] = useState([]);
//     const [curRest, setCurRest] = useState();
//     const [restaurants, setRestaurants] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingRest, setLoadingRest] = useState(false);
//
//     useEffect(() => {
//         setLoadingRest(true);
//         getRestaurants()
//             .then((data) => {
//                 setRestaurants(data);
//             })
//             .catch((err) => {
//                 message.error(err.message);
//             })
//             .finally(() => {
//                 setLoadingRest(false);
//             });
//     }, []);
//
//     useEffect(() => {
//         if (curRest) {
//             setLoading(true);
//             getMenus(curRest)
//                 .then((data) => {
//                     setFoodData(data);
//                 })
//                 .catch((err) => {
//                     message.error(err.message);
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         }
//     }, [curRest]);
//
//     return (
//         <>
//             <Select
//                 value={curRest}
//                 onSelect={(value) => setCurRest(value)}
//                 placeholder="Select a restaurant"
//                 loading={loadingRest}
//                 style={{ width: 300 }}
//                 onChange={() => {}}
//             >
//                 {restaurants.map((item) => {
//                     return <Option value={item.id}>{item.name}</Option>;
//                 })}
//             </Select>
//             {curRest && (
//                 <List
//                     style={{ marginTop: 20 }}
//                     loading={loading}
//                     grid={{
//                         gutter: 16,
//                         xs: 1,
//                         sm: 2,
//                         md: 4,
//                         lg: 4,
//                         xl: 3,
//                         xxl: 3,
//                     }}
//                     dataSource={foodData}
//                     renderItem={(item) => (
//                         <List.Item>
//                             <Card
//                                 title={item.name}
//                                 extra={<AddToCartButton itemId={item.id} />}
//                             >
//                                 <img
//                                     src={item.imageUrl}
//                                     alt={item.name}
//                                     style={{ height: 340, width: "100%", display: "block" }}
//                                 />
//                                 {`Price: ${item.price}`}
//                             </Card>
//                         </List.Item>
//                     )}
//                 />
//             )}
//         </>
//     );
// };
//
// export default FoodList;