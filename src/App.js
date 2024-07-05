
import './App.css';

import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import OTP from './components/Pages/OTP';
import Signup from './components/Pages/Signup';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import TokenGenerator from './components/Pages/TokenGenerator';
import ResetPassword from './components/Pages/ResetPassword';
import Denied from './components/Denied';
import ProductList from './components/Pages/Products/ProductList';
import ProductDetails from './components/Pages/Products/ProductDetails';
import Profile from './components/Pages/Profile';
// import { useSelector } from 'react-redux';
import AddCategory from './components/Pages/Category/AddCategory';
import RequireAuth from './components/Auth/RequireAuth';
import GetAllCategory from './components/Pages/Category/GetAllCategory';
// import CategoryCard from './components/Pages/Category/CategoryCard';
import ProductCreation from './components/Pages/Products/ProductCreation';
import Cart from './components/Pages/Products/Cart';
import Account from './components/Pages/Seller/Account';
import Placement from './components/Pages/Order/Placement';
import Verification from './components/Pages/Order/Verification';
import AddSubCategory from './components/Pages/Category/AddSubCategory';
import ProductBySubCat from './components/Pages/Products/ProductBySubCat';
import AvailablePinCodes from './components/Pages/AvailablePinCodes';
import Address from './components/Pages/Profile/Address';
import ShowingAddress from './components/Pages/Order/ShowingAddress';
import OrderList from './components/Pages/Profile/OrderList';
import SellerSideOrderList from './components/Pages/Order/SellerSideOrderList';
import OrderTracking from './components/Pages/Order/OrderTracking';
import Orders from './Admin/Orders';
import UpdateStatus from './Admin/UpdateStatus';

function App() {

    // const data = useSelector((state)=>state.product.productData);
    console.log(window)

return(<div>
<Routes>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/sendotp" element={<OTP></OTP>}></Route>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/generate-token' element={<TokenGenerator></TokenGenerator>}></Route>
    <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>

{/* this need to be changed only customer can view */}
    <Route element={<RequireAuth allowedRoles={["Seller","Admin","Customer"]}></RequireAuth>}>
        <Route path='/all-products' element={<ProductList></ProductList>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin"]}></RequireAuth>}>
    <Route path="/details/:productId" element={<ProductDetails></ProductDetails>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Customer","Seller"]}></RequireAuth>}>
    <Route path="/user/cart" element={<Cart></Cart>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Admin"]}></RequireAuth>}>
    <Route path="/category/create-subcategory" element={<AddSubCategory></AddSubCategory>}></Route>
    </Route>
    

    <Route path="/profile" element={<Profile></Profile>}></Route>

    <Route element={<RequireAuth allowedRoles={["Admin"]}></RequireAuth>}>
       <Route path='/create-category' element={<AddCategory></AddCategory>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Seller","Admin"]}></RequireAuth>}>
       <Route path='/product/add-product' element={<ProductCreation></ProductCreation>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Seller"]}></RequireAuth>}>
       <Route path='/user/add-account' element={<Account></Account>}></Route>
    </Route>

    <Route path='/access-denied' element={<Denied></Denied>}></Route>

    <Route path='/allCategory' element={<GetAllCategory></GetAllCategory>}></Route>

    <Route path='/user/order/:productId' element={<Placement></Placement>}> </Route>
    <Route path='/payment/verify?refrence=/:ref_No' element={<Verification></Verification>}> </Route>

    
    
    <Route element={<RequireAuth allowedRoles={["Seller","Customer","Admin" ]}></RequireAuth>}>
    <Route path='/subcategory-products/:subCatName' element={<ProductBySubCat></ProductBySubCat>}> </Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Admin" ]}></RequireAuth>}>
    <Route path='/add-pincode' element={<AvailablePinCodes></AvailablePinCodes>}> </Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/user/add-address' element={<Address></Address>}> </Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/user/address/details' element={<ShowingAddress/>}> </Route>
    </Route>


    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/user/order/list' element={<OrderList></OrderList>}> </Route>
    </Route>
    
    


    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/order/tracking/:oid/:tid' element={<OrderTracking></OrderTracking>}> </Route>
    </Route>


    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/user/total-orders' element={<SellerSideOrderList></SellerSideOrderList>}> </Route>
    </Route>


    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/admin/total-orders' element={<Orders></Orders>}> </Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Customer","Seller","Admin" ]}></RequireAuth>}>
    <Route path='/admin/update-delivery-status/:oid' element={<UpdateStatus/>}> </Route>
    </Route>

</Routes>

</div>)
}

export default App;
