import Link from "next/link";
import RoleCards from "../../components/RoleCards";
import AboutSchool from "../../components/AboutSchool";
import TeachersProfile from "../../components/TeachersProfile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function Home() {

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col justify-between">
<Header/>
      <div className="relative isolate px-6 pt-14 ">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125rem -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#10b981] to-[#6366f1] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-auto py-28 sm:py-36">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3.5 py-1 text-xs/6 text-emerald-300 ring-1 ring-emerald-500/30 bg-emerald-950/40 flex items-center gap-1.5">
              Unity, Diversity, and Growth in Montessori Education
            </div>
          </div>
          
          <div className="text-center px-0 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Authentic Montessori Education & Digital Learning Portal
            </h1>
            <p className="mt-6 text-base font-normal text-gray-400 sm:text-lg">
              Empowering children through self-directed exploration, hands-on learning, and real-time developmental observation tracking for parents and educators.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link
                href="/login"
                className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 mb-8"
              >
                Access School Portal
              </Link>
            </div>
          </div>

          <RoleCards/>
          <AboutSchool/>
          <TeachersProfile/>
        </div>
      </div>


     <Footer/>
    </div>
  );
}