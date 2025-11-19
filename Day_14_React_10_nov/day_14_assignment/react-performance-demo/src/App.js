import React, { Suspense, lazy, useState } from "react";
import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductCard from "./components/ProductCard";
import ModalPortal from "./components/ModalPortal";
import "./App.css";

const CourseDetails = lazy(() => import("./components/LazyComponents/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/LazyComponents/InstructorProfile"));

function App() {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //  Stats for Challenge 2
  const [stats, setStats] = useState([
    { id: 1, title: "Total Users", value: 100, lastUpdated: Date.now() },
    { id: 2, title: "Active Courses", value: 12, lastUpdated: Date.now() },
    { id: 3, title: "Completed Lessons", value: 50, lastUpdated: Date.now() },
  ]);

  // Function to update one card randomly
  const simulateUpdate = () => {
    const randomIndex = Math.floor(Math.random() * stats.length);
    const newStats = stats.map((stat, i) =>
      i === randomIndex
        ? { ...stat, value: stat.value + 1, lastUpdated: Date.now() } // Update only one
        : stat
    );
    setStats(newStats);
  };

  return (
    <div className="App">
      <h1>React Performance Challenges</h1>

      {/*  Challenge 1: Lazy Loading  */}
      <section>
        <h2>Challenge 1: Lazy Loading</h2>
        <button onClick={() => setShowCourse(!showCourse)}>View Course Details</button>
        <button onClick={() => setShowInstructor(!showInstructor)}>View Instructor Profile</button>
        <Suspense fallback={<p>Loading...</p>}>
          {showCourse && <CourseDetails />}
          {showInstructor && <InstructorProfile />}
        </Suspense>
      </section>

      {/*  Challenge 2: Pure Component */}
      <section>
        <h2>Challenge 2: Pure Component</h2>
        <p>
          Observe console logs — only the updated card re-renders when you simulate an update.
        </p>
        <button onClick={simulateUpdate}>Simulate Update</button>
        <div style={{ marginTop: "10px" }}>
          {stats.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              lastUpdated={stat.lastUpdated}
            />
          ))}
        </div>
      </section>

      {/* Challenge 3: Error Boundary  */}
      <section>
        <h2>Challenge 3: Error Boundary</h2>
        <ErrorBoundary>
          <ProductCard />
        </ErrorBoundary>
      </section>

      {/* Challenge 4: Portals */}
      <section>
        <h2>Challenge 4: Portals</h2>
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal && <ModalPortal onClose={() => setShowModal(false)} />}
      </section>
    </div>
  );
}

export default App;
