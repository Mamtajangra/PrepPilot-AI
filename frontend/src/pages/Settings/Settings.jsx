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
  const examCategories = {
  "Teaching Exams": [
    "CTET",
    "HTET",
    "REET",
    "UPTET",
    "MPTET",
    "KTET",
    "BTET",
    "TNTET",
    "DSSSB",
    "KVS",
    "NVS",
    "EMRS",
  ],

  "UPSC & Civil Services": [
    "UPSC CSE",
    "UPSC CDS",
    "UPSC NDA",
    "UPSC CAPF",
    "UPSC EPFO",
    "State PSC",
    "HPSC",
    "UPPSC",
    "BPSC",
    "MPPSC",
    "RPSC",
    "WBPSC",
    "APPSC",
    "TSPSC",
  ],

  "SSC Exams": [
    "SSC CGL",
    "SSC CHSL",
    "SSC MTS",
    "SSC CPO",
    "SSC GD",
    "SSC JE",
    "SSC Stenographer",
    "SSC Selection Post",
  ],

  "Railway Exams": [
    "RRB NTPC",
    "RRB Group D",
    "RRB JE",
    "RRB ALP",
    "RPF SI",
    "RPF Constable",
  ],

  "Banking Exams": [
    "IBPS PO",
    "IBPS Clerk",
    "IBPS SO",
    "SBI PO",
    "SBI Clerk",
    "RBI Grade B",
    "RBI Assistant",
    "NABARD",
    "LIC AAO",
    "NIACL AO",
  ],

  "Engineering & Technical": [
    "GATE",
    "ISRO",
    "DRDO",
    "BARC",
    "AAI ATC",
    "ECIL",
    "BEL",
    "HAL",
    "IOCL",
    "ONGC",
    "BHEL",
    "SAIL",
    "NTPC",
  ],

  "Defence": [
    "AFCAT",
    "CDS",
    "NDA",
    "INET",
    "Indian Navy SSR",
    "Indian Air Force",
    "Indian Army Agniveer",
  ],

  "Medical": [
    "NEET UG",
    "NEET PG",
    "AIIMS",
    "INI CET",
    "FMGE",
  ],

  "Higher Education": [
    "CSIR NET",
    "UGC NET",
    "JRF",
    "SET",
    "GATE",
    "IIT JAM",
    "CUET PG",
  ],

  "Law": [
    "CLAT",
    "AILET",
    "Judiciary",
  ],

  "Management": [
    "CAT",
    "XAT",
    "MAT",
    "CMAT",
    "SNAP",
    "NMAT",
  ],

  "Computer Science": [
    "NIELIT",
    "Oracle Java",
    "AWS",
    "Azure",
    "Google Cloud",
  ],

  "Private Jobs": [
    "TCS NQT",
    "Infosys",
    "Wipro",
    "Accenture",
    "Capgemini",
    "Cognizant",
    "HCL",
    "Tech Mahindra",
    "Deloitte",
    "Genpact",
  ],

  "Other": [
    "Other",
  ],
};
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
  {Object.entries(examCategories).map(([category, exams]) => (
    <optgroup
      key={category}
      label={category}
    >
      {exams.map((exam) => (
        <option
          key={exam}
          value={exam}
        >
          {exam}
        </option>
      ))}
    </optgroup>
  ))}
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