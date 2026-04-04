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
import { useDispatch, useSelector } from 'react-redux'
import MyOrders from './pages/MyOrders'
import PageNotFound from './pages/PageNotFound'
import { RouteErrorBoundary } from './components/error/RouteErrorBoundary'
import { syncCart } from './features/cartSlice'


export default function App() {
  const dispatch = useDispatch();
  const { items, isCartLoaded } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  
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

  useEffect(() => {
    if (!user || !isCartLoaded) return;
    if (items.length === 0) return;

    console.log("GLOBAL SYNC:", items);

    const timeout = setTimeout(() => {
      dispatch(syncCart({ userId: user.id, cartItems: items }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [items, isCartLoaded, user, dispatch]);

  return (
    <>
      <RouteErrorBoundary>
        <Navbar />
      </RouteErrorBoundary>
      

      <Routes>
        <Route path='/' element={
          <RouteErrorBoundary>
            <Home />
          </RouteErrorBoundary>
         
        }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/products' element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          </RouteErrorBoundary>
        
          }/> 
        <Route path='/sell' element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <Sell />
            </ProtectedRoutes>
          </RouteErrorBoundary>
         
          
        }/>
        
        <Route path='/cart' element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <Cart/>
            </ProtectedRoutes>
          </RouteErrorBoundary>
          
          }/>
        <Route path='/checkout' element={
          <RouteErrorBoundary>
             <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          </RouteErrorBoundary>
         
          
          }/>
        <Route path='/my-listing' element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <MyListings />
            </ProtectedRoutes>
          </RouteErrorBoundary>
          
        }/>
        <Route path="/edit/:id" element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <EditProduct />
            </ProtectedRoutes>
          </RouteErrorBoundary>
          
        }/>
        <Route path='/orders' element={
          <RouteErrorBoundary>
            <ProtectedRoutes>
              <MyOrders />
            </ProtectedRoutes>
          </RouteErrorBoundary>
          
        }/>
        <Route path='*' element={
          <RouteErrorBoundary>
            <PageNotFound />
          </RouteErrorBoundary>
          
        }/>
      </Routes>
    </>
  )
}
