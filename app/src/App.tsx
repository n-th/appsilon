import { lazy, Suspense } from 'react';
import './App.css';

const LazyMovieTable = lazy(() => import('./MovieTable'));

function App() {
  return (
    <div>
      <h1> Appsilon </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMovieTable />
      </Suspense>
    </div>
  );
}

export default App;
