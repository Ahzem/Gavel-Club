import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ImageUpload";
import { teamApi } from "../../services/api";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  year: string;
  thoughts?: string;
  image?: {
    url: string;
    publicId: string;
  };
}

// Update formData state to include image as File
interface FormState extends Omit<TeamMember, "image"> {
  image?: File | { url: string; publicId: string } | null;
}
const POSITIONS = [
  "President",
  "Secretary",
  "Vice President Education",
  "Vice President Public Relations",
  "Treasurer",
  "Sergeant at arms",
  "Design Lead",
  "Editorial Lead",
  "Media Lead",
  "Publicity Lead",
  "Web Master",
  "Design Committee member",
  "Editorial Committee member",
  "Media Committee member",
  "Web development Committee member",
  "Publicity Committee member",
] as const;

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    year: "all",
    position: "all",
  });
  const [formData, setFormData] = useState<Partial<FormState>>({
    name: "",
    position: POSITIONS[0],
    year: new Date().getFullYear().toString(),
    thoughts: "",
    image: null,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const fetchedMembers = await teamApi.getAllMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        setError("Failed to fetch team members");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      // Add basic fields
      if (formData.name) formDataObj.append("name", formData.name);
      if (formData.position) formDataObj.append("position", formData.position);
      if (formData.year) formDataObj.append("year", formData.year);
      if (formData.thoughts) formDataObj.append("thoughts", formData.thoughts);

      // Handle image upload
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      const response = await (selectedMember
        ? teamApi.updateMember(selectedMember._id, formDataObj)
        : teamApi.createMember(formDataObj));

      setMembers((prev) =>
        selectedMember
          ? prev.map((m) => (m._id === selectedMember._id ? response : m))
          : [...prev, response]
      );

      handleCloseForm();
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await teamApi.deleteMember(id);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting team member:", error);
      setError("Failed to delete team member");
    }
  };

  const handleDeleteClick = (member: TeamMember) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      year: member.year,
      thoughts: member.thoughts,
      image: member.image,
    });
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
      image: null,
    });
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesYear = filters.year === "all" || member.year === filters.year;
    const matchesPosition =
      filters.position === "all" || member.position === filters.position;
    return matchesSearch && matchesYear && matchesPosition;
  });

  return (
    <div className="team-management">
      <div className="team-management__header">
        <div className="team-dashboard__filters">
          <div className="team-dashboard__search">
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

          <div className="team-dashboard__filter-group">
            <select
              title="Position"
              value={filters.position}
              onChange={(e) =>
                setFilters({ ...filters, position: e.target.value })
              }
              className="team-dashboard__select"
            >
              <option value="all">All Positions</option>
              {POSITIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <select
              title="Year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="team-dashboard__select"
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
      </div>

      {error && (
        <div className="team-management__error">
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

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
                    <p className="gallery-form__help-text">
                      {" "}
                      Recommended size: 200x200px or square (1:1) image
                    </p>
                    <ImageUpload
                      currentImage={selectedMember?.image?.url}
                      onImageChange={(file) => {
                        setFormData((prev) => ({
                          ...prev,
                          image: file instanceof File ? file : null,
                        }));
                      }}
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

      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredMembers.length > 0 ? (
          <div className="team-dashboard__grid">
            {filteredMembers.map((member) => (
              <motion.div
                key={member._id}
                className="team-member-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="team-member-card__image">
                  <img
                    src={member.image?.url || "/placeholder.png"}
                    alt={member.name}
                  />
                </div>
                <div className="team-member-card__content">
                  <h3 className="team-member-card__name">{member.name}</h3>
                  <div className="team-member-card__details">
                    <span className="team-member-card__position">
                      {member.position}
                    </span>
                    <span className="team-member-card__year">
                      {member.year}
                    </span>
                  </div>
                  <p className="team-member-card__thoughts">
                    {member.thoughts}
                  </p>
                </div>
                <div className="team-member-card__actions">
                  <button
                    onClick={() => handleEdit(member)}
                    className="team-member-card__btn team-member-card__btn--edit"
                    title="Edit Member"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(member)}
                    className="team-member-card__btn team-member-card__btn--delete"
                    title="Delete Member"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="team-management__empty">
            <Users size={48} />
            <h3>No team members found</h3>
            <p>Add your first team member or adjust your filters</p>
          </div>
        )}
      </div>
      {showDeleteConfirm && (
        <motion.div
          className="delete-confirm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="delete-confirm-modal">
            <h3>Delete Team Member</h3>
            <p>
              Are you sure you want to remove "{memberToDelete?.name}" from the
              team? This action cannot be undone.
            </p>
            <div className="delete-confirm-actions">
              <button
                className="button button--secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMemberToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="button button--delete"
                onClick={() => handleDelete(memberToDelete?._id || "")}
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
