
import { Link } from "react-router-dom";
import {
  Code2,
  BookOpen,
  Search,
  ArrowRight,
} from "lucide-react";

function Home() {
  return (
    <div
      className="min-h-screen bg-black/30 bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: "url('/dev-background.png')",
      }}
    >
      {/* Light overlay */}
      <div className="min-h-screen bg-black/60">

        {/* Navbar */}
        <nav className="flex items-center justify-between border-b border-yellow-400/20 px-6 py-5 md:px-16">
          <Link to="/" className="flex items-center gap-2">
            <Code2 className="text-yellow-300" size={30} />

            <h1 className="text-3xl font-bold text-yellow-300">
              Yellow<span className="text-white">Byte</span>
            </h1>
          </Link>

          <div className="flex items-center gap-3">
          

            <Link
              to="/register"
              className="rounded-lg bg-yellow-300 px-8 py-3 font-semibold text-black transition hover:bg-yellow-300"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex min-h-[75vh] flex-col items-start justify-center px-8 py-20 text-left md:px-16">

          <div className="mb-6 inline-flex items-center gap-2bg-yellow-400/10 px-4 py-2 text-md text-white border border-2 border-yellow-300 rounded-md text-xl">
            
            Your Personal Developer Knowledge Base
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Your Code.
            <span className="text-white"> Your Knowledge.</span>
            <br />
            Your Vault.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white md:text-lg">
            Save your code snippets, organize technical notes,
            discover useful resources, and build your personal
            library of developer knowledge.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row text-xl">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-6 font-bold text-black transition hover:scale-105 hover:bg-yellow-300"
            >
              Start Building Your Vault
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-6 font-bold text-black transition hover:scale-105 hover:bg-yellow-300"
            >
              Already a Member? Login
            </Link>
          </div>

          
        </section>

        {/* How it works */}
        <section className="border-t border-yellow-400/20 px-6 py-20">
          <div className="mx-auto max-w-5xl text-center">

            <h2 className="text-3xl font-bold md:text-4xl">
              Everything You Learn,
              <span className="text-white"> In One Place.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Stop losing useful code and notes across different files.
              Build your own organized developer library with CodeVault.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3 ">

              <Step
                number="01"
                title="Create Your Account"
                description="Sign up and create your personal knowledge space."
               
              />

              <Step
                number="02"
                title="Save What You Learn"
                description="Add snippets, notes, resources, and technical concepts."
              />

              <Step
                number="03"
                title="Access Anytime"
                description="Log in and retrieve your saved knowledge whenever you need it."
              />

            </div>
          </div>
        </section>
        <footer className="border-t border-yellow-300 px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Code2 size={20} className="text-yellow-300" />

            <span className="font-semibold">
              Code<span className="text-yellow-300">Vault</span>
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}


function Step({ number, title, description }) {
  return (
    <div className="rounded-2xl border border-yellow-300 bg-black/60 p-6 text-left">
      <span className="text-3xl font-extrabold text-white">
        {number}
      </span>

      <h3 className="mt-4 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-yellow-300">
        {description}
      </p>
    </div>
  );
}

export default Home;
