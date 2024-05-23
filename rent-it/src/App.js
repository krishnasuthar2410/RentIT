import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body'
import Contact from './components/Contact'
import Error from './components/Error';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Product from './components/Product';
import Login from './components/Login';
import Rent from './components/Rent';
import AccountState from "./states/AccountState";

//Lazy Loading
//Dynamic Bundling
//On-demand loading
const About = lazy(() => import("./components/About"));

const AppLayout = () => {

    return (
      <Provider store={appStore}>
            <div className=' bg-gray-200'>
                <Header/>
                <Outlet />
            </div>        
      </Provider>
    )
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <AppLayout/>,
    children:[
      {
        path:"/",
        element: <Body/>,
      },
      {
        path:"/about",
        element: <Suspense fallback = {<h1>Loading in progress.....</h1>}><About/></Suspense>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/product/:prodid",
        element:<Product />
      },
      {
        path:"/login",
        element:<AccountState><Login/></AccountState>
      },
      {
        path:"/rent",
        element:<Rent/>
      }
    ],
    errorElement: <Error/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);