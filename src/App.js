import React, { useState, useEffect } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import SkillList from "./components/SkillList";
import SearchFilter from "./components/SearchFilter";

export default function App() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    standard: "",
    dob: "",
    phoneNumber: "",
    profilePicture: null,
    skills: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }, [profile]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleSkillAdd = (newSkill) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: [...prevProfile.skills, newSkill],
    }));
  };

  const handleSkillUpdate = (updatedSkills) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: updatedSkills,
    }));
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleProfilePictureUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const filteredSkills = profile.skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || skill.category === filterCategory)
  );

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Student Profile Management
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ProfileForm
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
              isEditing={isEditing}
              onEditComplete={toggleEditing}
              onProfilePictureUpload={handleProfilePictureUpload}
            />
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
            <SkillList
              groupedSkills={groupedSkills}
              onSkillAdd={handleSkillAdd}
              onSkillUpdate={handleSkillUpdate}
              isEditing={isEditing}
            />
          </div>
          <div>
            <ProfileCard
              profile={profile}
              groupedSkills={groupedSkills}
              isEditing={isEditing}
              onEditClick={toggleEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
