export function Planet() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore the Wonders of the Solar System
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover the captivating planets that make up our solar system, each with its own unique
            characteristics and mysteries.
          </p>
        </div>
        <div className="planet-container sm:first-line:">
          <div className="planet">
            <img src="images/mercury.png" alt="Mercury" />
            <h3 className="planet">Mercury</h3>
          </div>
          <div className="planet">
            <img src="images/venus.png" alt="Venus" />
            <h3 className="planet">Venus</h3>
          </div>
          <div className="planet">
            <img src="images/mars.png" alt="Mars" />
            <h3 className="planet">Mars</h3>
          </div>
          <div className="planet">
            <img src="images/jupiter.png" alt="Jupiter" />
            <h3 className="planet">Jupiter</h3>
          </div>
          <div className="planet">
            <img src="images/moon2.png" alt="Neptune" />
            <h3 className="planet">Moon</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
