import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AboutPage from "./pages/AboutPage";


function App() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:5000/api/events")
        .then((response)=>response.json())
        .then((data)=>{
            setEvents(data);
        });
    }, []);

    function handleAddEvent(newEvent) {
        fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
        .then((response)=>response.json())
        .then((data)=>{
            setEvents([...events, data]);
        });
    }

    function handleDeleteEvent(eventId) {
        fetch(`http://localhost:5000/api/events/${eventId}`, {
            method: "DELETE"
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            fetch("http://localhost:5000/api/events")
            .then((response)=>response.json())
            .then((data)=>{
                setEvents(data);
            });
        });
    }

    function handleEditEvent(eventId){
        const eventToEdit = events.find((event) => event.id === eventId);
        setEditingEvent(eventToEdit || null);
    }

    function handleUpdateEvent(eventId, updatedEvent) {
        return fetch(`http://localhost:5000/api/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        })
            .then((response) => response.json().then((data) => ({
                ok: response.ok,
                data,
            })))
            .then(({ ok, data }) => {
                if (!ok) {
                    throw new Error(data.message || "Unable to update event");
                }

                setEvents((currentEvents) => currentEvents.map((event) => {
                    return event.id === eventId ? data : event;
                }));
                setEditingEvent(null);

                return data;
            });
    }

    return (
        <div>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            events={events}
                            onAddEvent={handleAddEvent}
                            onUpdateEvent={handleUpdateEvent}
                            onDeleteEvent={handleDeleteEvent}
                            onEditEvent={handleEditEvent}
                            editingEvent={editingEvent}
                        />
                    }
                />

                <Route
                    path="/events"
                    element={
                        <EventsPage
                            events={events}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    }
                />

                <Route
                    path="/events/:eventId"
                    element={
                        <EventDetailsPage
                            events={events}
                            onUpdateEvent={handleUpdateEvent}
                        />
                    }
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;