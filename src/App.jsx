import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Nav";
import Work from "./components/Work";

export default function App() {
  return (
    <>
    
    <Navbar />
    <main>
      <Hero />
      <Work />
      <Experience />
    </main>
      <Contact />
    </>
  );
}