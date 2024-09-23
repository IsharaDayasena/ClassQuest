
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home';
import Instructors from '../pages/Instructors';
import Classes from '../pages/Classes';

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
           } 
        ]
    }
]);


export default router
