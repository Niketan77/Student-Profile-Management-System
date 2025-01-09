import React, { useState } from "react";

const CATEGORIES = ["Technical", "Soft Skills", "Language", "Other"];

export default function SkillList({
  groupedSkills,
  onSkillAdd,
  onSkillUpdate,
  isEditing,
}) {
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "Beginner",
    category: "Technical",
  });
  const [selectedSkills, setSelectedSkills] = useState([]);

  if (!isEditing) {
    return null;
  }

  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name) {
      onSkillAdd({ ...newSkill, id: Date.now() });
      setNewSkill({ name: "", proficiency: "Beginner", category: "Technical" });
    }
  };

  const handleSkillUpdate = (id, field, value) => {
    const updatedSkills = Object.values(groupedSkills)
      .flat()
      .map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill));
    onSkillUpdate(updatedSkills);
  };

  const handleSkillDelete = (id) => {
    const updatedSkills = Object.values(groupedSkills)
      .flat()
      .filter((skill) => skill.id !== id);
    onSkillUpdate(updatedSkills);
  };

  const handleSelectSkill = (id) => {
    setSelectedSkills((prev) =>
      prev.includes(id)
        ? prev.filter((skillId) => skillId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allSkillIds = Object.values(groupedSkills)
      .flat()
      .map((skill) => skill.id);
    setSelectedSkills(
      selectedSkills.length === allSkillIds.length ? [] : allSkillIds
    );
  };

  const handleBulkDelete = () => {
    const updatedSkills = Object.values(groupedSkills)
      .flat()
      .filter((skill) => !selectedSkills.includes(skill.id));
    onSkillUpdate(updatedSkills);
    setSelectedSkills([]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
      <form onSubmit={handleAddSkill} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="name"
            value={newSkill.name}
            onChange={handleNewSkillChange}
            placeholder="Skill name"
            className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            name="proficiency"
            value={newSkill.proficiency}
            onChange={handleNewSkillChange}
            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <select
            name="category"
            value={newSkill.category}
            onChange={handleNewSkillChange}
            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Add Skill
          </button>
        </div>
      </form>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleSelectAll}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
        >
          {selectedSkills.length === Object.values(groupedSkills).flat().length
            ? "Deselect All"
            : "Select All"}
        </button>
        <button
          onClick={handleBulkDelete}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
          disabled={selectedSkills.length === 0}
        >
          Delete Selected
        </button>
      </div>
      {CATEGORIES.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            {category}
          </h3>
          <ul className="space-y-2">
            {groupedSkills[category]?.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSelectSkill(skill.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillUpdate(skill.id, "name", e.target.value)
                  }
                  className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleSkillUpdate(skill.id, "proficiency", e.target.value)
                  }
                  className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  onClick={() => handleSkillDelete(skill.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
