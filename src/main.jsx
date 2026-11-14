import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Protected} from './components/index.js'
import {Home,Login,Signup,Addpost,Allposts,Editpost,Post} from './pages/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false} >
            <Login/>
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false} >
            <Signup/>
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={true} >
            <Allposts/>
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true} >
            <Addpost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true} >
            <Editpost/>
          </Protected>
        )
      },{
        path: "/post/:slug",
        element: <Post/>
      },
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
