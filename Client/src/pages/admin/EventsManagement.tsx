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

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "Educational meeting" | "Fun activity" | "other";
  status: "upcoming" | "ongoing" | "completed";
  capacity?: number;
  registrationUrl?: string;
  image?: File | { url: string; publicId: string } | null;
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
    capacity: undefined,
    registrationUrl: "",
    image: null,
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "image") {
          formDataObj.append(key, String(value));
        }
      });

      // Handle image separately
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      } else if (formData.image && "url" in formData.image) {
        formDataObj.append("image", JSON.stringify(formData.image));
      }

      if (isEditing && selectedEvent?._id) {
        const updatedEvent = await eventsApi.updateEvent(
          selectedEvent._id,
          formDataObj
        );
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === selectedEvent._id ? updatedEvent : event
          )
        );
      } else {
        const newEvent = await eventsApi.createEvent(formDataObj);
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }

      // Reset form
      setIsFormOpen(false);
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        type: "Educational meeting",
        status: "upcoming",
        capacity: undefined,
        registrationUrl: "",
        image: null,
      });
      setIsEditing(false);
      setSelectedEvent(null);
      setHasFormChanged(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (changes: Partial<EventFormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...changes };

      // Check if form has changed from original data
      if (selectedEvent) {
        const hasChanged = Object.keys(updated).some((key) => {
          if (key === "date") {
            return (
              new Date(updated[key] as string).toISOString().split("T")[0] !==
              new Date(selectedEvent[key]).toISOString().split("T")[0]
            );
          }
          return (
            updated[key as keyof EventFormData] !==
            selectedEvent[key as keyof Event]
          );
        });
        setHasFormChanged(hasChanged);
      }

      return updated;
    });
  };

  const handleDelete = async (eventId: string) => {
    if (!eventId) {
      setError("Invalid event ID");
      return;
    }

    try {
      setLoading(true);
      await eventsApi.deleteEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event: Event) => {
    if (!event._id) {
      setError("Invalid event selected");
      return;
    }
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  const handleEdit = (event: Event) => {
    if (!event._id) {
      setError("Invalid event selected");
      return;
    }

    setSelectedEvent(event);
    setIsEditing(true);
    setIsFormOpen(true);
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split("T")[0],
      time: event.time,
      location: event.location,
      description: event.description,
      type: event.type,
      status: event.status,
      capacity: event.capacity,
      registrationUrl: event.registrationUrl || "",
      image: event.image,
    });
    setHasFormChanged(false);
  };

  const confirmDelete = async () => {
    if (!eventToDelete?._id) {
      setError("No event selected for deletion");
      return;
    }

    try {
      setLoading(true);
      await handleDelete(eventToDelete._id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
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
            <option value="Educational meeting">Educational meeting</option>
            <option value="Fun activity">Fun activity</option>
            <option value="other">other</option>
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
                <h2>{isEditing ? "Edit Event" : "Create New Event"}</h2>
                <button
                  title="Close Form"
                  className="event-form__close"
                  onClick={() => {
                    setIsFormOpen(false);
                    setIsEditing(false);
                    setSelectedEvent(null);
                    setFormData({
                      title: "",
                      date: "",
                      time: "",
                      location: "",
                      description: "",
                      type: "Educational meeting",
                      status: "upcoming",
                      capacity: undefined,
                      registrationUrl: "",
                      image: null,
                    });
                    setHasFormChanged(false);
                  }}
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
                        handleFormChange({ title: e.target.value })
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
                        handleFormChange({ date: e.target.value })
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
                        handleFormChange({ time: e.target.value })
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
                        handleFormChange({
                          type: e.target.value as
                            | "Educational meeting"
                            | "Fun activity"
                            | "other",
                        })
                      }
                      required
                    >
                      <option value="Educational meeting">
                        Educational meeting
                      </option>
                      <option value="Fun activity">Fun activity</option>
                      <option value="other">other</option>
                    </select>
                  </div>

                  <div className="events-form__field">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleFormChange({ location: e.target.value })
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
                        handleFormChange({ capacity: Number(e.target.value) })
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
                        handleFormChange({ registrationUrl: e.target.value })
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
                          handleFormChange({ description: input });
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
                    onClick={() => {
                      setIsFormOpen(false);
                      setIsEditing(false);
                      setSelectedEvent(null);
                      setFormData({
                        title: "",
                        date: "",
                        time: "",
                        location: "",
                        description: "",
                        type: "Educational meeting",
                        status: "upcoming",
                        capacity: undefined,
                        registrationUrl: "",
                        image: null,
                      });
                      setHasFormChanged(false);
                    }}
                    className="button button--secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button button--primary"
                    disabled={loading || (isEditing && !hasFormChanged)}
                  >
                    {loading
                      ? isEditing
                        ? "Saving..."
                        : "Creating..."
                      : isEditing
                      ? "Save Changes"
                      : "Create Event"}
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
                <tr key={event._id || index}>
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
                        onClick={() => handleEdit(event)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="events-table__action-btn events-table__action-btn--delete"
                        title="Delete Event"
                        onClick={() => handleDeleteClick(event)}
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
      {showDeleteConfirm && (
        <motion.div
          className="delete-confirm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="delete-confirm-modal">
            <h3>Delete Event</h3>
            <p>
              Are you sure you want to delete "{eventToDelete?.title}"? This
              action cannot be undone.
            </p>
            <div className="delete-confirm-actions">
              <button
                className="button button--secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEventToDelete(null);
                }}
              >
                Cancel
              </button>
              <button className="button button--delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
