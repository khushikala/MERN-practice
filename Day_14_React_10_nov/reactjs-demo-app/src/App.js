import React, { useState, lazy, Suspense } from 'react';
import Home from './pages/Home';
import PureDisplay from './components/PureDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import ExplodingChild from './components/ExplodingChild';
import ModalPortal from './components/ModalPortal';

const HeavyPage = lazy(() => import('./pages/HeavyPage'));

export default function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("Stable Title");
  const [showHeavy, setShowHeavy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [triggerError, setTriggerError] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>React Concepts Demo</h1>
      <Home />

      {/* ========== 1️\\ Lazy Loading Section ========== */}
      <section style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <h2>Lazy Loading</h2>
        <button onClick={() => setShowHeavy(true)}>Load Heavy Page</button>
        <Suspense fallback={<p>Loading heavy component...</p>}>
          {showHeavy && <HeavyPage />}
        </Suspense>
      </section>

      {/* ========== 2️ Pure Component Section ========== */}
      <section style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <h2>Pure Component Demo</h2>
        <p>Parent count: {count}</p>
        <PureDisplay title={title} count={10} />
        <button onClick={() => setTitle("New Title " + Date.now())}>
          Change Title
        </button>
      </section>

      {/* ========== 3️ Error Boundary Section ========== */}
      <section style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <h2>Error Boundary Demo</h2>
        <ErrorBoundary>
          <ExplodingChild shouldExplode={triggerError} />
        </ErrorBoundary>
        <button onClick={() => setTriggerError(true)}>Cause Error</button>
      </section>

      {/* ========== 4️ Modal (Portal) Section ========== */}
      <section style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <h2>Portal (Modal) Demo</h2>
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal && (
          <ModalPortal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h3>Modal Content</h3>
            <p>This content is rendered via a Portal!</p>
          </ModalPortal>
        )}
      </section>
    </div>
  );
}
