import React from "react";

export default function ProfileCard({
  profile,
  groupedSkills,
  isEditing,
  onEditClick,
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                {profile.name.charAt(0)}
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {profile.name}
            </h2>
          </div>
          <button
            onClick={onEditClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors text-sm sm:text-base"
          >
            {isEditing ? "View Profile" : "Edit Profile"}
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Standard</p>
            <p className="font-semibold">{profile.standard}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Date of Birth</p>
            <p className="font-semibold">{profile.dob}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Phone Number</p>
            <p className="font-semibold">{profile.phoneNumber}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Skills</h3>
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-100 rounded-lg p-3">
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-gray-600">{skill.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
