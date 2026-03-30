import React , {useEffect}from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import Signup from './pages/Signup'
import Products from './pages/Products'
import Sell from './pages/Sell'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import MyListings from './pages/MyListings'
import EditProduct from './pages/EditProduct'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { setUser } from "./features/authSlice";
import { useDispatch } from 'react-redux'
import MyOrders from './pages/MyOrders'
import PageNotFound from './pages/PageNotFound'


export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/products' element={
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
          
          }/> 
        <Route path='/sell' element={
          <ProtectedRoutes>
            <Sell />
          </ProtectedRoutes>
          
          }/>
        <Route path='/products' element={
          <ProtectedRoutes>
            <sell />
          </ProtectedRoutes>
         
          }/>
        <Route path='/cart' element={
          <ProtectedRoutes>
            <Cart/>
          </ProtectedRoutes>
         
          }/>
        <Route path='/checkout' element={
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
          
          }/>
        <Route path='/my-listing' element={
          <ProtectedRoutes>
            <MyListings />
          </ProtectedRoutes>
        }/>
        <Route path="/edit/:id" element={
          <ProtectedRoutes>
            <EditProduct />
          </ProtectedRoutes>
        }/>
        <Route path='/orders' element={
          <ProtectedRoutes>
            <MyOrders />
          </ProtectedRoutes>
        }/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  )
}
