import axios from "axios";

const API_URL = "http://localhost:3000";

export const userLogin = async (credentials) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);

    return res.data;
}

export const RegisterUser = async (registerData) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, registerData);
    return res;

};

export const getNutritionists = async () => {
    const res = await axios.get(`${API_URL}/api/users/getAllNutritionists`);
    return res.data;

};

export const getUserProfile = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/${id}`, config);

    return res.data;

};

export const getClientProfile = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/getClientByUser/${id}`, config);

    return res.data;

};

export const getNutritionistProfile = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/getNutritionistByUser/${id}`, config);

    return res.data;

};

export const updateUser = async (token, id, data) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.patch(`${API_URL}/api/users/update/${id}`, data, config);
    return res;
}

export const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/getAllUsers`, config);
    return res.data;

};


export const getAllAppointments = async (token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/appointments/AllAppointments`, config);
    return res.data;

};

export const getMyAppointments = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const res = await axios.get(
        `${API_URL}/api/appointments/myAppointments/${id}`,config);
    return res.data;
};

export const getNutritionistsAppointments = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const res = await axios.get(
        `${API_URL}/api/appointments/myAppointmentsNutritionists/${id}`, config);
    return res.data;
};
export const deleteAppointment = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/api/appointments/DeleteAppointment/${id}`, config);
    return res;

};

export const deleteUser = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/api/users/delete/${id}`, config);
    return res;

};

export const createNewAppointment = async (token, appointmentData) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.post(`${API_URL}/api/appointments/NewAppointment`, appointmentData, config);
    return res;

};

export const updateAppointment = async (token, id, updatedAppointment) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.patch(
      `${API_URL}/api/appointments/UpdateAppointment/${id}`,
      updatedAppointment,
      config
    );
    return res.data;
  };
