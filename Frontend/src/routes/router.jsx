
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home';
import Instructors from '../pages/Instructors';
import Classes from '../pages/Classes';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import SingleClasses from '../pages/Classes/SingleClasses';


const router = createBrowserRouter([

    {
        path:"/",
        element: <MainLayout/>,
        children:[
           {path: "/",
            element: <Home/>,

           },
           {
            path: "instructors",
            element: <Instructors/>
           },
           {
            path:"classes",
            element:<Classes/>
           },
           {
            path:"/login",
            element:<Login/>
           },
           {
            path:"/register",
            element: <Register/>
           },
           {
            path:"/dashboard",
            element: <Dashboard/>
           },
           {
            path:"class/:id",
            element: <SingleClasses/>,
            // loader: ({params}) => fetch (`http://localhost:5000/class/${params._id}`)
           },

        ]
    }
]);


export default router
 