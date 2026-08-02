import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Settings.css";
import {
  Settings2,
  Moon,
  Bell,
  Clock3,
  Target,
  Save,
  LogOut,
} from "lucide-react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [studyHours, setStudyHours] = useState(2);
  const [preferredExam, setPreferredExam] = useState("HTET");

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings"));

    if (settings) {
      setDarkMode(settings.darkMode);
      setNotifications(settings.notifications);
      setStudyHours(settings.studyHours);
      setPreferredExam(settings.preferredExam);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      darkMode,
      notifications,
      studyHours,
      preferredExam,
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    toast.success("Settings Saved Successfully ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="settings-layout">

      <Sidebar />

      <main className="settings-page">

        <div className="settings-header">

          <div className="hero-badge">
           <Settings2 size={16} />
           <span>Settings</span>
          </div>

          <h1>Application Settings</h1>

          <p>
            Customize your PrepPilot AI experience.
          </p>

        </div>

        <div className="settings-card">

          <div className="setting-item">

            <label>
              <Moon size={18} />
              Dark Mode
            </label>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

          </div>

          <div className="setting-item">

            <label>
              <Bell size={18} />
              Notifications
            </label>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />

          </div>

          <div className="setting-item">

            <label>
              
              <Clock3 size={18} />
              Daily Study Hours
              </label>

            <input
              type="number"
              min="1"
              max="12"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
            />

          </div>

          <div className="setting-item">

            <label>
               <Target size={18} /> 
              Preferred Exam
              </label>

            <select
              value={preferredExam}
              onChange={(e) => setPreferredExam(e.target.value)}
            >
              <option>HTET</option>
              <option>CTET</option>
              <option>UPSC</option>
              <option>SSC</option>
              <option>GATE</option>
              <option>CSIR NET</option>
              <option>Other</option>
            </select>

          </div>

          <div className="settings-buttons">

            <button
              className="save-btn"
              onClick={handleSave}
            >
              <Save size={18} />
              Save Settings
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={18} /> 
              Logout
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;