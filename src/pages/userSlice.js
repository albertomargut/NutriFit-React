import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    // el nombre del pasillo con el que el store identificará este pasillo, 
    // y la información que contiene ese pasillo nada más abrir
    name: "user",
    initialState: {
        credentials: {},
        // vecesLoginLogout: 0
    },

    // los reducers no son más que funciones que reciben el estado actual y la modificación que queremos 
    // hacer sobre él como parámetros (state, action), y devuelve el nuevo estado con la modificación hecha.
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload,

            }
        },
        
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload,

            }
        },

        resetLog: (state, action) => {
            return {
                ...state,

            }
        }
    }
})

export const { login, logout } = userSlice.actions;

// este const es el nombre de la sección del almacén a la que tendré que ir,
// const userRdxDetail = useSelector(userDetailId)
export const userData = (state) => state.user;

export default userSlice.reducer;