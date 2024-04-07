import { useEffect, useState } from "react";
import { getNutritionists } from "../../services/apiCalls";
import * as React from "react";
import "./Nutritionists.css";
import Avatar from "@mui/material/Avatar";

export const Nutritionists = () => {
  const [nutritionists, setNutritionists] = useState([]);

  useEffect(() => {
    if (nutritionists.length === 0) {
      getNutritionists().then((data) => {
        setNutritionists(data);
      });
    }
  }, []);

  return (
    <>
      <h1 className="nutritionist-team">CONOCE A LOS MEJORES NUTRICIONISTAS</h1>
      <div className="nutritionist-container">
        {nutritionists && nutritionists.length > 0 ? (
          nutritionists.map((nutritionist) => (
            <div key={nutritionist.id} className="nutritionist-card">
              <div className="card-content">
                <Avatar
                  alt={nutritionist.user.first_name}
                  src={`/static/images/avatar/${String(nutritionist.id)}.jpg`}
                  className="avatar"
                />
                <div className="nutritionist-info">
                  <p className="nutritionist-name">
                    {nutritionist.user.first_name} {nutritionist.user.last_name}
                  </p>
                  <p className="nutritionist-style">
                    Estilo: {nutritionist.speciality}
                  </p>
            
                  <p className="nutritionist-experience">
                    Años de experiencia: {nutritionist.work_experience} años.
                  </p>
                  <p className="nutritionist-description">
                    Descripción: {nutritionist.user.first_name} ha llegado a
                    esta clínica como una de las entidades más prestigiosas en
                    el área de {nutritionist.especiality}. Los{" "}
                    {nutritionist.work_experience} años que lleva en el sector
                    le han hecho ganar algunos premios y ser uno de los más
                    codiciados por los profesionales.
                  </p>
                  <p className="nutritionist-phone">
                    Contacto: {nutritionist.user.phone_number}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="error-nutritionist">
            Lo siento, no hemos encontrado a tu nutricionista.
          </p>
        )}
      </div>
    </>
  );
};
