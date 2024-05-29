import { Footer } from "@/components/ui/footer"
import { NavBar } from "@/components/ui/navbar"

export function AboutUs() {
  return (
    <main className="flex flex-col gap-16 md:gap-24">
      <NavBar />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-block rounded-lg bg-pink-900 px-3 py-1 text-sm dark:bg-gray-800">
              About Us
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pulsar</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We are a team of passionate astronomers and engineers dedicated to crafting
              high-quality and user-friendly telescopes. Our mission is to inspire and empower
              stargazers and astronomers of all levels to explore the wonders of the universe with
              confidence and excitement.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              alt="Acme Software Solutions"
              className="w-full max-w-[300px]"
              height="200"
              src="image/planet.gif"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover"
              }}
              width="200"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black dark:bg-gray-800">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex justify-center">
            <img
              alt="Mission and Values"
              className="w-full max-w-[400px]"
              height="100"
              src="image/phases.png"
              style={{
                aspectRatio: "200/200"
              }}
              width="100"
            />
          </div>
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-pink-900 px-3 py-1 text-sm dark:bg-gray-800">
              Our Mission & Values
            </div>
            <h2 className="  text-3xl bg-gray-600 font-bold tracking-tighter md:text-4xl/tight">
              Empowering Discovery with Innovative Telescopes
            </h2>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our mission at Pulsar Telescopes is to inspire and empower stargazers and astronomers
              of all levels with high-quality, user-friendly telescopes, driven by our core values
              of innovation, quality, customer satisfaction, accessibility, and passion for
              astronomy.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-pink-900 px-3 py-1 text-sm dark:bg-gray-800">
              Our Team
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet the Pulsar Team
            </h2>
            <p className="mx-auto font-bold max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-black">
              Our team of talented and dedicated professionals is the driving force behind our
              success. Get to know the key members of our company.
            </p>
          </div>
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2">
              <img
                alt="Sofia Davis"
                className="h-30 w-30 rounded-full object-cover"
                height="120"
                src="image/team.jpg"
                style={{
                  aspectRatio: "120/120",
                  objectFit: "cover"
                }}
                width="120"
              />
              <div className="text-center">
                <h3 className="text-lg font-bold">Raghad Alghunaim </h3>
                <p className="text-black-900 font-bold text-black">CEO</p>
              </div>
              <div className="p">
                <p className="mx-auto max-w-[500px] text-white-200 font-bold text-white">
                  Hello everyone, my name is Raghad Alghunaim, and I am excited to welcome you to
                  Pulsar, your destination for space exploration. Inspired by my journey at Saudi
                  Digital Academy mastering full-stack development using C#, Pulsar merges
                  technology with the cosmos. Explore our curated collection of telescopes and
                  helmets, designed for clarity, protection, and peace of mind. Join our community
                  of space enthusiasts and start your cosmic journey today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </main>
  )
}
