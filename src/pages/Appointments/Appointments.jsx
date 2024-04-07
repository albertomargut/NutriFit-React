import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewAppointment, getNutritionists } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./Appointments.css";

export const Appointments = () => {
  const userRdxData = useSelector(userData);
  const clientId = userRdxData.credentials.userData.client;

  const [newAppointment, setNewAppointment] = useState({
    client_id: clientId,
    nutritionist_id: "",
    time: "",
    date: "",
  });
  const [nutritionists, setNutritionists] = useState([]);

  useEffect(() => {
    if (nutritionists.length === 0) {
      getNutritionists().then((nutritionists) => {
        setNutritionists(nutritionists);
      });
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    const token = userRdxData.credentials.token;
    if (!token) {
      return;
    }

    createNewAppointment(token, newAppointment)
      .then((res) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };

        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        console.error("Ha ocurrido un error al crear su cita", err);
      });
  };

  return (
    <div className="container">
      <Card className="appointmentCard">
        <Card.Body>
          <Card.Title className="cardTitle">Establecer Cita</Card.Title>
          <Form>
            <Form.Group controlId="nutritionist_id">
              <Form.Label>Nutricionista</Form.Label>
              <Form.Control
                as="select"
                name="nutritionist_id"
                value={newAppointment.nutritionist_id}
                onChange={inputHandler}
              >
                <option value="">Seleccione su nutricionista</option>
                {nutritionists.map((nutritionist) => (
                  <option key={nutritionist.id} value={nutritionist.id}>
                    {nutritionist.user.first_name} {nutritionist.user.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={inputHandler}
              />
            </Form.Group>
            <Button variant="dark" onClick={buttonHandler}>
              Confirmar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
