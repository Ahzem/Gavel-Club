import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUpload } from './ImageUpload';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'workshop' | 'meeting' | 'social' | 'other';
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationUrl?: string;
  capacity?: number;
  organizer: string;
}

export function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'workshop',
    image: '',
    organizer: '',
    status: 'upcoming',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create event');

      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setIsFormOpen(false);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="events-management">
      <div className="events-management__header">
        <button 
          className="events-management__add-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} />
          Add New Event
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            className="events-management__form-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <form onSubmit={handleSubmit} className="events-form">
              <div className="events-form__grid">
                <div className="events-form__field">
                  <label htmlFor="title">Event Title *</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="events-form__field">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div className="events-form__field">
                  <label htmlFor="time">Time *</label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>

                <div className="events-form__field">
                  <label htmlFor="type">Event Type *</label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as Event['type']})}
                    required
                  >
                    <option value="workshop">Workshop</option>
                    <option value="meeting">Meeting</option>
                    <option value="social">Social Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="events-form__field">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <div className="events-form__field">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                  />
                </div>

                <div className="events-form__field">
                  <label htmlFor="registrationUrl">Registration URL</label>
                  <input
                    type="url"
                    id="registrationUrl"
                    value={formData.registrationUrl}
                    onChange={(e) => setFormData({...formData, registrationUrl: e.target.value})}
                  />
                </div>

                <div className="events-form__field events-form__field--full">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                  />
                </div>

                <div className="events-form__field--full">
                  <label>Event Image</label>
                  <ImageUpload
                    onImageChange={(file) => setFormData(prev => ({ ...prev, image: file ? URL.createObjectURL(file) : '' }))}
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
                  {loading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="events-management__list">
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
            {events.map((event) => (
              <tr key={event.id}>
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
                  <span className={`events-table__type events-table__type--${event.type}`}>
                    {event.type}
                  </span>
                </td>
                <td>
                  <span className={`events-table__status events-table__status--${event.status}`}>
                    {event.status}
                  </span>
                </td>
                <td>
                  <div className="events-table__actions">
                    <button className="events-table__action-btn" title="Edit Event">
                      <Edit2 size={16} />
                    </button>
                    <button className="events-table__action-btn events-table__action-btn--delete" title="Delete Event">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}