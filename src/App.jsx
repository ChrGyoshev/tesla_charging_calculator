import "./App.css";

import { PriceModal } from "./modal";
import { InfoModal } from "./infoModal";
import { useState } from "react";
import TeslaLogo from "../src/assets/teslaLogo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [model, setModel] = useState("chrisModel3");
  const [currentCharge, setCurrentCharge] = useState("0");
  const [desiredCharge, setDesiredCharge] = useState("0");
  const [costPerKWH, setCostPerKWH] = useState(0.17);
  const [cost, setCost] = useState(0);
  const [neededCapacity, setNeededCapacity] = useState(0);
  const [customBatterySize, setCustomBatterySize] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const batteries = {
    // Model S
    S75: 75,
    S85: 85,
    S100: 100,
    // Model 3
    m3standard: 57.5,
    m3longrange: 75,
    m3performance: 82,
    chrisModel3: 66,
    // Model Y
    mystandard: 60,
    mylongrange: 75,
    myperformance: 78,
  };

  function calculateCost() {
    const current = parseFloat(currentCharge) || 0;
    const desired = parseFloat(desiredCharge) || 0;

    if (current < 0 || current > 100 || desired < 0 || desired > 100) {
      setShowModal(true);
      return;
    }

    const battery = model === "custom" ? customBatterySize : batteries[model];
    const neededKwh = ((desired - current) / 100) * battery;
    const chargeEfficency = neededKwh / 0.9;
    const totalCost = chargeEfficency * costPerKWH;

    setCost(totalCost.toFixed(2));
    setNeededCapacity(neededKwh.toFixed(2));
    setShowModal(true);
  }

  return (
    <>
      {showInfo && (
        <InfoModal showInfo={showInfo} onClose={() => setShowInfo(false)} />
      )}
      {showModal ? (
        <PriceModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          cost={cost}
          neededCapacity={neededCapacity}
        />
      ) : (
        <div className="calculator">
          <div
            className="info d-flex justify-content-end"
            onClick={() => setShowInfo(!showInfo)}
          >
            <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
          </div>
          <div className="tesla-header d-flex justify-content-center flex-column align-items-center">
            <h1 className="tesla-header ">TESLA</h1>

            <img
              src={TeslaLogo}
              alt="Tesla Logo"
              className="tesla-logo"
              style={{ width: "150px", height: "50px" }}
            />
          </div>

          <div className="form-group">
            <label>Model:</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              {/* Model 3 */}
              <optgroup label="Model 3">
                <option value="m3standard">Standard Range (57.5 kWh)</option>
                <option value="m3longrange">Long Range (75 kWh)</option>
                <option value="m3performance">Performance (82 kWh)</option>
                <option value="chrisModel3">
                  Model 3 LR 2021 ~10% degradation (66kWh)
                </option>
              </optgroup>

              {/* Model S */}
              <optgroup label="Model S">
                <option value="S75">Model S 75D (75 kwh)</option>
                <option value="S85">Model S 85D (85 Kwh)</option>
                <option value="S100">Model S 100D (100 Kwh)</option>
              </optgroup>

              {/* Model Y */}
              <optgroup label="Model Y">
                <option value="mystandard">Standard Range (60 Kwh)</option>
                <option value="mylongrange">Long Range (75 Kwh)</option>
                <option value="myperformance">Performance (78 Kwh)</option>
              </optgroup>
              <optgroup label="Other">
                <option value="custom">
                  Custom Battery (Based on your degradation)
                </option>
              </optgroup>
            </select>
          </div>
          {/* Custom battery capacity */}

          {model === "custom" && (
            <div className="form-group CustomBattery">
              <label>Custom Battery Size (kWh):</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                max="100"
                value={customBatterySize}
                onChange={(e) => setCustomBatterySize(Number(e.target.value))}
              />
            </div>
          )}

          <div className="form-group">
            <label>Current Charge (%):</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              max="100"
              value={currentCharge}
              onChange={(e) => setCurrentCharge(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Desired Charge (%):</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              max="100"
              value={desiredCharge}
              onChange={(e) => setDesiredCharge(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Charge Location:</label>
            <select
              value={costPerKWH}
              onChange={(e) => setCostPerKWH(Number(e.target.value))}
            >
              <optgroup label="Home charging">
                <option value="0.29">Peak (0.29BGN)</option>
                <option value="0.17">Off Peak (0.17BGN)</option>
              </optgroup>

              <optgroup label="Public Charging">
                <option value="0.69">Fines (0.69 BGN)</option>
                <option value="0.70">Electrip (0.70 BGN)</option>
                <option value="0.71">
                  Tesla Supercharger Bulgaria (0.71 BGN){" "}
                </option>
                <option value="0.90">ElDrive (0.90 BGN)</option>
              </optgroup>
            </select>
          </div>
          <p className="d-flex justify-content-end fst-italic opacity-75">
            Charging cost calculator
          </p>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-rounded"
              onClick={calculateCost}
            >
              Calculate Cost
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
