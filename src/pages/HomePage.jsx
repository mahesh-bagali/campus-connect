import EventForm from "../components/EventForm";
import EventSection from "../components/EventSection";
import Hero from "../components/Hero";

function HomePage({events,
    onAddEvent,
    onUpdateEvent,
    onDeleteEvent,
    onEditEvent,
    editingEvent,}){
    return(
        <>
        <Hero title="Discover what is happening in Campus"
        description="Find workshops,sports,activities,club Meeting,and opportunities to connect with other students."/>
        <EventForm
            key={editingEvent?._id || "new-event"}
            onAddEvent={onAddEvent}
            onUpdateEvent={onUpdateEvent}
            editingEvent={editingEvent}
        />
        <EventSection
            events={events}
            onDeleteEvent={onDeleteEvent}
            onEditEvent={onEditEvent}
        />

        </>
    );
}
export default HomePage;