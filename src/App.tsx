import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-indigo-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 dark:bg-indigo-300 dark:text-slate-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Projects />
        <About />
      </main>
      <Contact />
    </>
  );
}
