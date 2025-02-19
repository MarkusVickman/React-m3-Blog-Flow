import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
    <Header />
    <main>
    <Outlet />

    </main>
    <footer> <b>Lägg in footer-komponent här istället!</b> </footer>
    </>
  )
}

export default Layout