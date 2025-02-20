import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import './Layout.css';

const Layout = () => {
  return (
    <>
      <div className='page-container'>
        <div className="page-height-without-footer">
          <Header />
          <main>
            <Outlet />

          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
