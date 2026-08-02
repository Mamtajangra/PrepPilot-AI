import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Camera, Save, RotateCcw, User } from "lucide-react";
import "./Profile.css";

const examCategories = {
  Teaching: [
    "HTET",
    "CTET",
    "REET",
    "KVS",
    "NVS",
    "DSSSB",
  ],

  Government: [
    "UPSC CSE",
    "SSC CGL",
    "SSC CHSL",
    "SSC MTS",
    "IBPS PO",
    "IBPS Clerk",
    "SBI PO",
    "RRB NTPC",
    "RRB Group D",
    "NDA",
    "CDS",
    "AFCAT",
  ],

  Engineering: [
    "GATE",
    "ESE (IES)",
    "IIT JAM",
  ],

  "Higher Studies": [
    "CSIR NET",
    "UGC NET",
    "CUET PG",
    "PhD Entrance",
  ],

  Tech: [
    "Python Interview",
    "Java Interview",
    "Frontend Interview",
    "Backend Interview",
    "Full Stack Interview",
    "DSA Interview",
    "Machine Learning",
    "Data Science",
    "AI / GenAI",
    "DevOps",
    "AWS Certification",
    "Azure Certification",
    "Google Cloud",
  ],

  International: [
    "IELTS",
    "PTE",
    "TOEFL",
    "GRE",
    "GMAT",
    "SAT",
  ],

  Medical: [
    "NEET UG",
    "NEET PG",
    "AIIMS",
  ],

  Other: [
    "Other",
  ],
};

function Profile() {

  const [profile, setProfile] = useState({
    name:"",
    email:"",
    phone:"",
    category:"Teaching",
    exam:"HTET",
    bio:"",
  });

  const [savedProfile,setSavedProfile]=useState(null);

  useEffect(()=>{

    const data=JSON.parse(localStorage.getItem("profile"));

    if(data){

      setProfile(data);

      setSavedProfile(data);

    }

  },[]);

  const handleChange=(e)=>{

    setProfile({

      ...profile,

      [e.target.name]:e.target.value,

    });

  };

  const handleCategoryChange=(e)=>{

    const category=e.target.value;

    setProfile({

      ...profile,

      category,

      exam:examCategories[category][0],

    });

  };

  const handleSave=()=>{

    localStorage.setItem(

      "profile",

      JSON.stringify(profile)

    );

    setSavedProfile(profile);

    toast.success("Profile Updated Successfully");

  };

  const handleReset=()=>{

    if(savedProfile){

      setProfile(savedProfile);

      toast.info("Profile Reset");

    }

  };

  const getInitials=()=>{

    if(!profile.name.trim()) return <User size={45}/>;

    return profile.name

      .split(" ")

      .map((word)=>word[0])

      .join("")

      .toUpperCase();

  };

  return (

    <div className="profile-layout">

      <Sidebar/>

      <main className="profile-page">

        <div className="profile-header">

          <div className="hero-badge">

            <User size={16}/>

            <span>Profile</span>

          </div>

          <h1>My Profile</h1>

          <p className="profile-subtitle">

            Manage your personal information and study preferences.

          </p>

        </div>

        <div className="profile-card">

          <div className="profile-avatar">

            {getInitials()}

          </div>

          <button

            className="change-photo-btn"

            onClick={()=>toast.info("Profile photo upload coming soon.")}

          >

            <Camera size={18}/>

            Change Photo

          </button>

          <div className="profile-form">
            {/* Full Name */}

<div className="form-group">
  <label>Full Name</label>

  <input
    type="text"
    name="name"
    value={profile.name}
    onChange={handleChange}
    placeholder="Enter your full name"
  />
</div>

{/* Email */}

<div className="form-group">
  <label>Email</label>

  <input
    type="email"
    name="email"
    value={profile.email}
    onChange={handleChange}
    placeholder="Enter your email"
  />
</div>

{/* Phone */}

<div className="form-group">
  <label>Phone Number</label>

  <input
    type="text"
    name="phone"
    value={profile.phone}
    onChange={handleChange}
    placeholder="Enter phone number"
  />
</div>

{/* Category */}

<div className="form-group">
  <label>Exam Category</label>

  <select
    value={profile.category}
    onChange={handleCategoryChange}
  >
    {Object.keys(examCategories).map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>
</div>

{/* Preferred Exam */}

<div className="form-group full-width">
  <label>Preferred Exam</label>

  <select
    name="exam"
    value={profile.exam}
    onChange={handleChange}
  >
    {examCategories[profile.category].map((exam) => (
      <option
        key={exam}
        value={exam}
      >
        {exam}
      </option>
    ))}
  </select>
</div>

{/* Bio */}

<div className="form-group full-width">
  <label>Bio</label>

  <textarea
    rows="5"
    name="bio"
    value={profile.bio}
    onChange={handleChange}
    placeholder="Write something about yourself..."
  />
</div>

</div>

{/* Buttons */}

<div className="profile-actions">

  <button
    className="reset-btn"
    onClick={handleReset}
  >
    <RotateCcw size={18} />
    Reset
  </button>

  <button
    className="save-btn"
    onClick={handleSave}
  >
    <Save size={18} />
    Save Profile
  </button>

</div>

</div>

</main>

</div>

);

}

export default Profile;