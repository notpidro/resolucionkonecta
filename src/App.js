import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo-small-CQeKgnf2.svg";
import PlayIcon from "./assets/play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import WifiIcon from "./assets/wifi_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import CatvIcon from "./assets/audio_video_receiver_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import WarningIcon from "./assets/warning_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import RepairIcon from "./assets/construction_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

function App() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [uValue, setUValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Creamos un FormData a partir del formulario
    const formData = new FormData(event.target);
    const currentUValue = formData.get("u"); // Guardamos el valor de "U" antes de resetear

    // Enviamos los datos a Google Forms
    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSc7svaFI8ea7ys7DYzr5fGsh1Dwhg26w_kjAraIS50q3xKF9A/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "no-cors",
      }
    )
      .then(() => {
        // Mostramos el mensaje de confirmación
        setConfirmationVisible(true);

        // Reiniciamos el formulario
        event.target.reset();

        // Restauramos el valor de "U"
        setUValue(currentUValue);

        // Ocultamos el mensaje después de 3 segundos
        setTimeout(() => {
          setConfirmationVisible(false);
        }, 3000);
      })
      .catch(() => {
        alert("❌ Error al enviar la respuesta.");
      });
  };

  return (
    <div className="App">
      {/* Encabezado */}
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="bubble-header">RESOLUCIÓN EN LINEA</div>
      </header>

      {/* Formulario */}
      <form id="formulario" onSubmit={handleSubmit} className="form-container">
        {/* Burbuja: Ingresá tu "u" */}
        <div className="bubble input-bubble">
          <input
            type="text"
            name="u"
            id="u"
            placeholder="Ingresa tu U"
            value={uValue}
            onChange={(e) => setUValue(e.target.value)}
          />
        </div>

        {/* Burbuja: ¿Enviaste Service? */}
        <div className="bubble question-bubble">
          <p>¿Enviaste Service?</p>
          <div className="circle-buttons">
            <label>
              <input type="radio" name="service" value="SI" />
              <div className="circle green">SI</div>
            </label>
            <label>
              <input type="radio" name="service" value="NO" />
              <div className="circle red">NO</div>
            </label>
          </div>
        </div>

        {/* 3 botones negros (FLOW, INTERNET, CATV) */}
        <div className="black-buttons">
          <input type="radio" id="flow" name="motivo" value="FLOW" hidden />
          <label className="black-button" htmlFor="flow">
            <div className="icon">
              <img src={PlayIcon} alt="Play Icon" className="play-icon" />
            </div>
            <div className="text">
              FLOW
              <br />
              (DECOS)
            </div>
            <div className="icon">
              <img src={PlayIcon} alt="Play Icon" className="play-icon" />
            </div>
          </label>

          <input type="radio" id="internet" name="motivo" value="INTERNET" hidden />
          <label className="black-button" htmlFor="internet">
            <div className="icon">
              <img src={WifiIcon} alt="Wifi Icon" className="wifi-icon" />
            </div>
            <div className="text">
              INTERNET
              <br />
              (MODEMS)
            </div>
            <div className="icon">
              <img src={WifiIcon} alt="Wifi Icon" className="wifi-icon" />
            </div>
          </label>

          <input type="radio" id="catv" name="motivo" value="CATV" hidden />
          <label className="black-button" htmlFor="catv">
            <div className="icon">
              <img src={CatvIcon} alt="Catv Icon" className="catv-icon" />
            </div>
            <div className="text">
              CATV
              <br />
              (CABLE-DECOS)
            </div>
            <div className="icon">
              <img src={CatvIcon} alt="Catv Icon" className="catv-icon" />
            </div>
          </label>
        </div>

        {/* Burbuja: Posible Masivo */}
        <div className="bubble masivo-bubble">
          <input type="checkbox" id="posibleMasivo" name="posibleMasivo" hidden />
          <label htmlFor="posibleMasivo">
            <div className="masivo-content">
              <div className="icon">
                <img src={WarningIcon} alt="Warning Icon" className="warning-icon" />
              </div>
              <div className="text">POSIBLE MASIVO</div>
              <div className="icon">
                <img src={WarningIcon} alt="Warning Icon" className="warning-icon" />
              </div>
            </div>
          </label>
        </div>

        {/* Burbuja: N° OT */}
        <div className="bubble ot-bubble">
          <label htmlFor="ot" className="bubble-label">
            <div className="icon">
              <img src={RepairIcon} alt="Repair Icon" className="repair-icon" />
            </div>
            N° OT:
          </label>
          <input type="text" name="ot" id="ot" placeholder="J0000000000012345678" />
        </div>

        {/* Botón ENVIAR */}
        <button type="submit" className="bubble enviar-button">
          <span>ENVIAR</span>
        </button>

        {/* Mensaje de confirmación */}
        {confirmationVisible && (
          <div id="confirmationMessage" style={{ display: "block" }}>
            ¡Respuesta enviada!
          </div>
        )}
      </form>
    </div>
  );
}

export default App;