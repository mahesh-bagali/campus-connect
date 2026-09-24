import { useState } from "react";
import EventCard from "./EventCard";

function EventSection({
  events,
  onDeleteEvent,
  onEditEvent,
}) {
  const [searchText, setSearchText] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredEvents = events.filter(function (
    event
  ) {
    const eventTitle = typeof event.title === "string"
      ? event.title
      : "";

    const matchesSearch = eventTitle
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="events"
      className="events-section"
    >
      <div className="section-heading">
        <div>
          <p className="section-label">
            Upcoming Activities
          </p>

          <h2>Explore Campus Events</h2>
        </div>

        <p>
          {filteredEvents.length} events shown
        </p>
      </div>

      <div className="search-filter-bar">
        <input
          type="text"
          value={searchText}
          onChange={function (event) {
            setSearchText(event.target.value);
          }}
          placeholder="Search by event title"
        />

        <select
          value={selectedCategory}
          onChange={function (event) {
            setSelectedCategory(
              event.target.value
            );
          }}
        >
          <option value="All">
            All Categories
          </option>

          <option value="Technology">
            Technology
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Cultural">
            Cultural
          </option>

          <option value="Club">
            Club
          </option>

          <option value="Workshop">
            Workshop
          </option>
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="empty-message">
          No matching events found.
        </p>
      ) : (
        <div className="event-grid">
          {filteredEvents.map(function (event) {
            return (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                category={event.category}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
                onDeleteEvent={onDeleteEvent}
                onEditEvent={onEditEvent}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default EventSection;