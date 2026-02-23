import { lazy } from "react"
import { Routes, Route } from "react-router"

const MenuListPage = lazy(() => import('../pages/MenuListPage/MenuListPage'))
// const MenuDetailsPage = lazy(() => import('../pages/MenuDetailsPage/MenuDetailsPage'))
export const AppRoutes = () => {
    return <Routes>
        <Route path='/menus' element={<MenuListPage />} />
    </Routes>
}