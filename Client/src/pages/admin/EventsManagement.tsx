import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ImageUpload";
import { eventsApi } from "../../services/api";
import { Event } from "../../lib/types";

interface EventFormData extends Omit<Partial<Event>, "image"> {
  image?: File | { url: string; publicId: string };
}

export function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "Educational meeting",
    status: "upcoming",
  });
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    type: "all",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const fetchedEvents = await eventsApi.getAllEvents();
      setEvents(fetchedEvents);
    } catch {
      setError("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataObj = new FormData();

      // Format date properly for backend
      const formattedDate = formData.date
        ? new Date(formData.date).toISOString()
        : "";

      // Handle all non-image fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "date" && value) {
          formDataObj.append(key, formattedDate);
        } else if (key !== "image" && value !== undefined && value !== null) {
          formDataObj.append(key, String(value));
        }
      });

      // Handle image upload
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      } else if (formData.image && "url" in formData.image) {
        formDataObj.append("image", JSON.stringify(formData.image));
      }

      // Ensure required fields are present
      if (
        !formDataObj.get("title") ||
        !formDataObj.get("date") ||
        !formDataObj.get("time") ||
        !formDataObj.get("location") ||
        !formDataObj.get("description") ||
        !formDataObj.get("type")
      ) {
        throw new Error("Please fill in all required fields");
      }

      const newEvent = await eventsApi.createEvent(formDataObj);
      setEvents([...events, newEvent]);
      setIsFormOpen(false);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesType = filters.type === "all" || event.type === filters.type;
    const matchesDate =
      (!filters.startDate || event.date >= filters.startDate) &&
      (!filters.endDate || event.date <= filters.endDate);
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="events-management">
      <div className="events-management__header">
        <div className="events-management__title">
          <h2>Manage Events</h2>
          <p className="events-management__subtitle">
            Create and manage upcoming events
          </p>
        </div>
        <button
          className="events-management__add-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} />
          Add New Event
        </button>
      </div>

      <div className="events-management__filters">
        <div className="events-management__search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="events-management__filter-group">
          <Filter size={20} />
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All Types</option>
            <option value="educational meeting">Educational meeting</option>
            <option value="fun activity">Fun activity</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            placeholder="Start Date"
          />
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="event-form-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="event-form">
              <div className="event-form__header">
                <h2>Create New Event</h2>
                <button
                  title="Close Form"
                  className="event-form__close"
                  onClick={() => setIsFormOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="event-form__content">
                <div className="events-form__grid">
                  <div className="events-form__field">
                    <label htmlFor="title">Event Title</label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="type">Event Type</label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as Event["type"],
                        })
                      }
                      required
                    >
                      <option value="educational meeting">
                        Educational meeting
                      </option>
                      <option value="fun activity">Fun activity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacity: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="registrationUrl">Registration URL</label>
                    <input
                      type="url"
                      id="registrationUrl"
                      value={formData.registrationUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationUrl: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="events-form__field events-form__field--full">
                    <label htmlFor="description">Description</label>
                    <textarea
                      title="Description"
                      value={formData.description}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (input.length <= 150) {
                          setFormData({ ...formData, description: input });
                        }
                      }}
                      maxLength={150}
                      required
                    />
                    <div className="character-count">
                      {formData.description?.length || 0}/150 characters
                    </div>
                  </div>

                  <div className="events-form__field events-form__field--full">
                    <label>Event Image</label>
                    <p className="gallery-form__help-text">
                      Recommended size: 1200x800px (3:2)
                    </p>
                    <ImageUpload
                      onImageChange={(file) => {
                        setFormData((prev: EventFormData) => ({
                          ...prev,
                          image: file || undefined,
                        }));
                      }}
                    />
                  </div>
                </div>

                {error && <div className="events-form__error">{error}</div>}

                <div className="events-form__actions">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="button button--secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button button--primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="events-management__list">
        {isLoading ? (
          <div className="events-management__loading">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <table className="events-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id || index}>
                  <td>{event.title}</td>
                  <td>
                    <div className="events-table__datetime">
                      <Calendar size={16} />
                      {new Date(event.date).toLocaleDateString()}
                      <Clock size={16} />
                      {event.time}
                    </div>
                  </td>
                  <td>
                    <div className="events-table__location">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`events-table__type events-table__type--${event.type}`}
                    >
                      {event.type}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`events-table__status events-table__status--${event.status}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <div className="events-table__actions">
                      <button
                        className="events-table__action-btn"
                        title="Edit Event"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="events-table__action-btn events-table__action-btn--delete"
                        title="Delete Event"
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
          <div className="events-management__empty">
            <Calendar size={48} />
            <h3>No events found</h3>
            <p>Start by creating a new event or adjust your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
