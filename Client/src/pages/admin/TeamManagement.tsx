import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ImageUpload";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  year: string;
  thoughts: string;
  imageUrl: string;
}

const POSITIONS = [
  "President",
  "Vice President",
  "Secretary",
  "Assistant Secretary",
  "Treasurer",
  "Editor",
  "Committee Member",
] as const;

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    year: "all",
  });
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    position: POSITIONS[0],
    year: new Date().getFullYear().toString(),
    thoughts: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = selectedMember
        ? `/api/team/${selectedMember.id}`
        : "/api/team";

      const method = selectedMember ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save member");

      const savedMember = await response.json();

      setMembers((prev) =>
        selectedMember
          ? prev.map((m) => (m.id === selectedMember.id ? savedMember : m))
          : [...prev, savedMember]
      );

      handleCloseForm();
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData(member);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMember(null);
    setFormData({
      name: "",
      position: POSITIONS[0],
      year: new Date().getFullYear().toString(),
      thoughts: "",
      imageUrl: "",
    });
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesYear = filters.year === "all" || member.year === filters.year;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="team-management">
      <div className="team-management__header">
        <div className="team-management__filters">
          <div className="team-management__search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search members..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <select
            title="Year"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="team-management__year-filter"
          >
            <option value="all">All Years</option>
            {Array.from({ length: 5 }, (_, i) =>
              (new Date().getFullYear() - i).toString()
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          title="Add Member"
          className="events-management__add-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="team-form-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="team-form">
              <div className="team-form__header">
                <h2>{selectedMember ? "Edit Member" : "Add New Member"}</h2>
                <button
                  title="Close Form"
                  className="team-form__close"
                  onClick={() => setIsFormOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="team-form__content">
                <div className="team-form__grid">
                  <div className="events-form__field">
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="events-form__field">
                    <label>Position</label>
                    <select
                      title="Position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      required
                    >
                      {POSITIONS.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="events-form__field">
                    <label>Year</label>
                    <select
                      title="Year"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      required
                    >
                      {Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - i).toString()
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="events-form__field events-form__field--full">
                    <label>Thoughts (Testimonial)</label>
                    <p className="gallery-form__help-text">
                      {" "}
                      This will be displayed on Home page Testimonials Section
                    </p>
                    <textarea
                      title="Thoughts"
                      value={formData.thoughts}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (input.length <= 150) {
                          setFormData({ ...formData, thoughts: input });
                        }
                      }}
                      maxLength={150}
                      required
                    />
                    <div className="character-count">
                      {formData.thoughts?.length || 0}/150 characters
                    </div>
                  </div>

                  <div className="events-form__field events-form__field--full">
                    <label>Profile Image</label>
                    <p className="gallery-form__help-text"> Recommended size: 200x200px or square (1:1) image</p>
                    <ImageUpload
                      onImageChange={(file) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: file ? URL.createObjectURL(file) : "",
                        }))
                      }
                    />
                  </div>

                  <div className="events-form__actions events-form__field--full">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="button button--secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      title="Submit"
                      className="button button--primary"
                    >
                      {selectedMember ? "Save Changes" : "Add Member"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="team-management__list">
        {filteredMembers.length > 0 ? (
          <table className="team-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Position</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="team-table__image"
                    />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.year}</td>
                  <td>
                    <div className="team-table__actions">
                      <button
                        title="Edit Member"
                        onClick={() => handleEdit(member)}
                        className="team-table__action-btn"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(member.id)}
                        className="team-table__action-btn team-table__action-btn--delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="team-management__empty">
            <Users size={48} />
            <h3>No team members found</h3>
            <p>Add your first team member or adjust your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
