import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getNutritionistProfile, getClientProfile, updateUser } from "../../services/apiCalls";
import { userData } from "../userSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../components/CustomInput/CustomInput.css"
import { CustomInput } from "../../components/LoginInput/LoginImput";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [userUpdate, setUserUpdate] = useState({username: "", email: "", first_name: "", last_name: "", phone_number: ""});
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();

  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData.id;
  const decoded = userRdxData.credentials.userData;

  useEffect(() => {
    const isClient = decoded.roles.some(role => role.name === "client")
    const isAdmin = decoded.roles.some(role => role.name === "admin")

    if (!token) {
      navigate("/register");
    } else if (isClient){
      getClientProfile(token, id).then((res) => {
        setProfileData(res);
      });
    } else if (isAdmin){
      getUserProfile(token, id).then((res) => {
        setProfileData(res);
      });
    } else {
      getNutritionistProfile(token, id).then((res) => {
        setProfileData(res);
      });
    }
  }, []);

  const buttonHandlerEdit = () => {
    setEditable(!editable);
  }

  const buttonHandlerSave = () => {
    updateUser(token, id, userUpdate).then((res) => {
      setProfileData((prevState) => ({
        ...prevState,
        username: userUpdate.username || profileData.username,
        email: userUpdate.email || profileData.email,
        first_name: userUpdate.first_name || profileData.first_name,
        last_name: userUpdate.last_name || profileData.last_name,
        phone_number: userUpdate.phone_number || profileData.phone_number,
      }))
    });
  }

  const inputHandlerUser = (event) => {
    setUserUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="profileData">
      <Card className="modernCard">
        {decoded.roles.some(role => role.name === "admin") ? (
          <Card.Header as="h5">Estos son los datos de su perfil de administrador {profileData.first_name}</Card.Header>
        ) : (
          <Card.Header as="h5">Estos son los datos de su perfil {profileData.first_name}</Card.Header>
        )}
        <Card.Body>
          <Card.Title>{profileData.username}</Card.Title>
          <Card.Text>Nombre: {profileData.first_name}</Card.Text>
          {profileData.last_name ? (
            <Card.Text>Apellido: {profileData.last_name}</Card.Text>
          ) : null}
          {profileData.speciality ? (
            <Card.Text>Especialidad: {profileData.speciality}</Card.Text>
          ) : null}
          <Card.Text>Email: {profileData.email}</Card.Text>
          <Card.Text>Teléfono: {profileData.phone_number}</Card.Text>
          <Button variant="dark" onClick={() => buttonHandlerEdit()}>Editar mis datos</Button>
          {editable ? (
            <div className="EditingData">
              <br />
              ¿Quiere cambiar su nombre de usuario?: <CustomInput
                placeholder={"escriba su username"}
                type={"username"}
                name={"username"}
                handler={inputHandlerUser}
              />
              <br />
              ¿Quiere cambiar su email?: <CustomInput
                placeholder={"escriba su email"}
                type={"email"}
                name={"email"}
                handler={inputHandlerUser}
              />
              <br />
              ¿Quiere cambiar su nombre?: <CustomInput
                placeholder={"escriba su nombre"}
                type={"first_name"}
                name={"first_name"}
                handler={inputHandlerUser}
              />
              <br />
              ¿Quiere cambiar su apellido?: <CustomInput
                placeholder={"escriba su apellido"}
                type={"last_name"}
                name={"last_name"}
                handler={inputHandlerUser}
              />
              <br />
              ¿Quiere cambiar su teléfono?: <CustomInput
                placeholder={"escriba su teléfono"}
                type={"phone_number"}
                name={"phone_number"}
                handler={inputHandlerUser}
              />
              <br />
              <Button variant="dark" onClick={() => buttonHandlerSave()}>Guardar cambios</Button>
            </div>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
};
