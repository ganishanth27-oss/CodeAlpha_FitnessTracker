import { useEffect, useState } from "react";
import "./App.css";

const defaultData = {
  steps: 6500,
  water: 4,
  workout: 30,
  calories: 350,
};

function App() {
  const [fitnessData, setFitnessData] = useState(() => {
    const savedData = localStorage.getItem("fitnessData");

    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const { steps, water, workout, calories } = fitnessData;

  useEffect(() => {
    localStorage.setItem("fitnessData", JSON.stringify(fitnessData));
  }, [fitnessData]);

  const updateData = (field, value) => {
    setFitnessData((previous) => ({
      ...previous,
      [field]: Number(value),
    }));
  };

  const resetData = () => {
    setFitnessData(defaultData);
  };

  const stepGoal = 10000;
  const workoutGoal = 60;
  const calorieGoal = 500;

  const stepProgress = Math.min((steps / stepGoal) * 100, 100);
  const workoutProgress = Math.min((workout / workoutGoal) * 100, 100);
  const calorieProgress = Math.min((calories / calorieGoal) * 100, 100);

  return (
    <div className="app">
      <div className="tracker-container">

        {/* Header */}
        <header className="header">
          <div className="fitness-icon">♥</div>

          <div>
            <h1>Fitness Tracker</h1>
            <p>Monitor your daily health and fitness progress</p>
          </div>
        </header>

        {/* Today's Summary */}
        <section className="summary-card">
          <h2>Today's Summary</h2>

          <div className="stats">

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">👟</span>
              </div>

              <h3>{steps.toLocaleString()}</h3>
              <p>Steps</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">💧</span>
              </div>

              <h3>{water} L</h3>
              <p>Water Intake</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">🏋️</span>
              </div>

              <h3>{workout} min</h3>
              <p>Workout</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">🔥</span>
              </div>

              <h3>{calories}</h3>
              <p>Calories Burned</p>
            </div>

          </div>
        </section>

        {/* Daily Goals */}
        <section className="progress-card">
          <h2>Daily Goals</h2>

          <div className="progress-list">

            <div className="progress-item">
              <div className="progress-label">
                <span>Steps</span>
<strong>
  {Math.round(stepProgress)}%
</strong>

              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${stepProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span>Workout</span>
                <strong>
                  {workout} / {workoutGoal} %
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${workoutProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span>Calories</span>
                <strong>
                  {calories} / {calorieGoal} %
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${calorieProgress}%` }}
                ></div>
              </div>
            </div>

          </div>
        </section>

        {/* Activity */}
        <section className="activity-card">
          <h2>Log Today's Activity</h2>

          <p className="activity-description">
            Update your fitness information below. Your data is saved
            automatically on this device.
          </p>

          <div className="activity-grid">

            <div className="activity-row">
              <label>Steps</label>

              <input
                type="number"
                min="0"
                value={steps}
                onChange={(e) => updateData("steps", e.target.value)}
              />
            </div>

            <div className="activity-row">
              <label>Water Intake (Litres)</label>

              <input
                type="number"
                min="0"
                step="0.5"
                value={water}
                onChange={(e) => updateData("water", e.target.value)}
              />
            </div>

            <div className="activity-row">
              <label>Workout Duration (Minutes)</label>

              <input
                type="number"
                min="0"
                value={workout}
                onChange={(e) => updateData("workout", e.target.value)}
              />
            </div>

            <div className="activity-row">
              <label>Calories Burned</label>

              <input
                type="number"
                min="0"
                value={calories}
                onChange={(e) => updateData("calories", e.target.value)}
              />
            </div>

          </div>

          <button className="reset-button" onClick={resetData}>
            Reset Today's Data
          </button>
        </section>

        <footer>
          Developed by <strong>Nishanth</strong>
        </footer>

      </div>
    </div>
  );
}

export default App;