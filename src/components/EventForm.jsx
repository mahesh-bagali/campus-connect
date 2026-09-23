import { useState } from "react";

function EventForm({ onAddEvent, onUpdateEvent, editingEvent }) {
  const [formData, setFormData] = useState({
    title: editingEvent?.title || "",
    category: editingEvent?.category || "",
    date: editingEvent
      ? new Date(editingEvent.date).toISOString().split("T")[0]
      : "",
    time: editingEvent
      ? new Date(`1970-01-01 ${editingEvent.time}`)
        .toTimeString()
        .slice(0, 5)
      : "",
    location: editingEvent?.location || "",
    description: editingEvent?.description || "",
  });
    
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  }

function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.date === "" ||
      formData.time === "" ||
      formData.location === "" ||
      formData.description === ""
    ) {
      setFormError("Please fill in every field.");
      return;
    }

    if (editingEvent !== null) {
      const updatedEvent = {
        id: editingEvent.id,
        title: formData.title,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description,
      };

      onUpdateEvent(editingEvent.id, updatedEvent);
    } else {
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description,
      };

      onAddEvent(newEvent);
    }

  }

  return (
    <section className="event-form-section">
      <p className="section-label">{editingEvent !== null ? "update activity" : "create activity"}</p>

      <h2>{editingEvent !== null ? "Edit  campus Event" : "Add  new campus Event"}</h2>


      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: React Workshop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Club">Club</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>

          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Example: Seminar Hall"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
          />
        </div>

        {formError !== "" && <p className="form-error">{formError}</p>}

        <button className="submit-button" type="submit">
          {editingEvent !== null ? "Update Event" : "Add Event"}
        </button>
      </form>
    </section>
  );
}

export default EventForm;