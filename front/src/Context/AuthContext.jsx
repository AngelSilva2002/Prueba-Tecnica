import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, profileRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an Authprovider");
    }
    return context;
}

export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const singup = async (values) => {
        try {
            const res = await registerRequest(values);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]); // Clear errors on successful signup
            sessionStorage.setItem("id", res.data.id);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Unknown error occurred";
            setErrors([errorMessage]);
            console.log(error.response.data);
        }
    }

    const singin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data.id);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]); // Clear errors on successful login
            sessionStorage.setItem("id", res.data.id);

        } catch (error) {
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data.map(err => err.message || "Unknown error occurred"));
            } else {
                const errorMessage = error.response?.data?.message || "Unknown error occurred";
                setErrors([errorMessage]);
            }
            console.log(error.response.data);
        }
    }


    const profile = async (id) => {
        try {

            console.log(id)
            const res = await profileRequest(id);
            console.log(res.data);
            return res.data
            

        } catch (error) {
           
            console.log(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{ singup, singin, profile, user, isAuthenticated, setIsAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}
