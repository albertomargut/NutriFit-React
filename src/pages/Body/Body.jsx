import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Nutritionists } from "../Nutritionists/Nutritionists"
import { Appointments } from "../Appointments/Appointments"
import { NutritionistAppointments } from "../NutritionistAppointments/NutritionistAppointments"
import { ClientAppointments } from "../ClientAppointments/ClientAppointments"
import { AdminAppointments } from "../AdminAppointments/AdminAppointments"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Login } from "../Login/Login"
import { userData } from "../userSlice"
import { useSelector } from "react-redux"


export const Body = () => {
    const userRdxData = useSelector(userData)
    const isLoggedIn = userRdxData.credentials.token
  


    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/nutritionists" element={<Nutritionists />} />
                {isLoggedIn && (<>
                <Route path="/newappointments" element={<Appointments/>}/>
                <Route path="/myappointments" element={<ClientAppointments/>}/>
                <Route path="/myappointmentsNutritionists" element={<NutritionistAppointments/>}/>
                <Route path="/Allappointments" element={<AdminAppointments/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                </>
                )}
            </Routes>
        </>
    )
}