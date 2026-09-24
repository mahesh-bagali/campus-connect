import { Link, useParams } from "react-router";

function EventDetailsPage({ events }) {
    const { eventId } = useParams();

    const selectedEvent = events.find(function (event) {
        return event._id === eventId;
    });

    if (selectedEvent === undefined) {
        return (
            <section className="page-heading">
                <h1>Event Not Found</h1>

                <Link
                    className="details-button"
                    to="/events"
                >
                    Back to Events
                </Link>
            </section>
        );
    }

    return (
        <section className="event-details-page">
            <p className="event-category">
                {selectedEvent.category}
            </p>

            <h1>{selectedEvent.title}</h1>

            <p className="event-description">
                {selectedEvent.description}
            </p>

            <div className="details-box">
                <p>
                    <strong>Date:</strong> {selectedEvent.date}
                </p>

                <p>
                    <strong>Time:</strong> {selectedEvent.time}
                </p>

                <p>
                    <strong>Location:</strong> {selectedEvent.location}
                </p>
            </div>

            <Link
                className="details-button"
                to="/events"
            >
                Back to Events
            </Link>
        </section>
    );
}

export default EventDetailsPage;