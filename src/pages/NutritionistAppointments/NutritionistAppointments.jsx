import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getNutritionistsAppointments, deleteAppointment } from "../../services/apiCalls";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const NutritionistAppointments = () => {
  const [nutritionistAppointments, setNutritionistAppointments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData.nutritionist?.id;

  useEffect(() => {
    if (nutritionistAppointments.length === 0) {
      getNutritionistsAppointments(token, id).then((nutritionistAppointments) => {
      
        setNutritionistAppointments(nutritionistAppointments);
      });
    }
  }, [token, id]); 

  const removeButtonHandler = (id) => { 
    deleteAppointment(token, id).then(() => {
      setNutritionistAppointments(nutritionistAppointments.filter((appointments) => appointments.id !== id));
      
    });
  }
  return (
    <Container>
      <h1 className="text-center mt-5 mb-4">Mis citas</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {nutritionistAppointments && nutritionistAppointments.length > 0 ? (
          nutritionistAppointments.map((appointment) => (
            <Col key={appointment.id}>
              <Card className="shadow-sm appointment-card" id="custom-card">
                <Card.Body>
                  <Card.Title className="text-center fs-5">
                    {appointment.client.user.first_name}{" "}
                    {appointment.client.user.last_name}
                  </Card.Title>
                  <hr />
                  <div className="text-center">
                    <p>
                      <strong>Día:</strong> {appointment.date}
                    </p>
                    <p>
                      <strong>Hora:</strong> {appointment.time}
                    </p>
                    <p>
                      <strong>Contacto:</strong>{" "}
                      {appointment.client.user.phone_number}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(appointment.id)}
                  >
                    Borrar cita
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No tienes citas programadas.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

