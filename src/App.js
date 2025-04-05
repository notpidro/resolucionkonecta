import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo-small-CQeKgnf2.svg";
import PlayIcon from "./assets/play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import WifiIcon from "./assets/wifi_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import CatvIcon from "./assets/audio_video_receiver_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import WarningIcon from "./assets/warning_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

function App() {
	const [confirmationVisible, setConfirmationVisible] = useState(false);
	const [uValue, setUValue] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); // Evita la recarga de la página
		// Creamos un FormData a partir del formulario
		const formData = new FormData(event.target);
		// Guardamos el valor de U para poder restaurarlo después del reset
		const currentUValue = formData.get("entry.945397952");

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
				setConfirmationVisible(true);
				// Reiniciamos el formulario
				event.target.reset();
				// Restauramos el valor de U (ya que el reset lo limpia)
				setUValue(currentUValue);
				// Ocultamos el mensaje de confirmación después de 3 segundos
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
				{/* Campo U */}
				<div className="bubble input-bubble">
					<input
						type="text"
						name="entry.945397952"
						id="u"
						placeholder="Ingrese U"
						value={uValue}
						onChange={(e) => setUValue(e.target.value)}
						required
					/>
				</div>

				{/* Botones de radio: ¿Envié Services? */}
				<div className="bubble question-bubble">
					<p>¿Envié SERVICES?</p>
					<div className="circle-buttons">
						<label>
							<input type="radio" name="entry.1588399383" value="SI" required />
							<div className="circle green">SI</div>
						</label>
						<label>
							<input type="radio" name="entry.1588399383" value="NO" />
							<div className="circle red">NO</div>
						</label>
					</div>
				</div>

				{/* Botones para seleccionar el motivo (FLOW, INTERNET, CATV) */}
				<div className="black-buttons">
					<input type="radio" id="motivo1" name="entry.1054412819" value="FLOW" hidden required />
					<label className="black-button" htmlFor="motivo1">
						<div className="icon">
							<img src={PlayIcon} alt="Play Icon" className="play-icon" />
						</div>
						<div className="text">
							FLOW <br />
							(DECOS)
						</div>
						<div className="icon">
							<img src={PlayIcon} alt="Play Icon" className="play-icon" />
						</div>
					</label>

					<input type="radio" id="motivo2" name="entry.1054412819" value="INTERNET" hidden />
					<label className="black-button" htmlFor="motivo2">
						<div className="icon">
							<img src={WifiIcon} alt="Wifi Icon" className="wifi-icon" />
						</div>
						<div className="text">
							INTERNET <br />
							(MODEMS)
						</div>
						<div className="icon">
							<img src={WifiIcon} alt="Wifi Icon" className="wifi-icon" />
						</div>
					</label>

					<input type="radio" id="motivo3" name="entry.1054412819" value="CATV" hidden />
					<label className="black-button" htmlFor="motivo3">
						<div className="icon">
							<img src={CatvIcon} alt="Catv Icon" className="catv-icon" />
						</div>
						<div className="text">
							CATV <br />
							(CABLE-DECOS)
						</div>
						<div className="icon">
							<img src={CatvIcon} alt="Catv Icon" className="catv-icon" />
						</div>
					</label>
				</div>

				{/* Checkbox: Posible Masivo */}
				<div className="bubble masivo-bubble">
					<input type="checkbox" id="posibleMasivo" name="entry.689641927" value="SI" hidden />
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

				{/* Campo: Descripción (opcional) */}
				<div className="bubble descripcion-bubble">
					<label htmlFor="descripcion" className="bubble-label">
						Descripción:
					</label>
					<textarea
						id="descripcion"
						name="entry.1267784291"
						placeholder="Ingrese una breve descripción (opcional)"
					></textarea>
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
