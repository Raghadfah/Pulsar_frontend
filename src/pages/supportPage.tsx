import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { NavBar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export  function SupportPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* <header className="bg-[#84052d] text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <TelescopeIcon />
            <h1 className="text-xl font-bold">Pulsar</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:underline" >
              Home
            </Link>
            <Link to="#" className="hover:underline">
              Telescopes
            </Link>
            <Link to="#" className="hover:underline">
              Helmets
            </Link>
            <Link to="/aboutUs" className="hover:underline">
              About
            </Link>
            <Link to="/aboutUs" className="hover:underline">
              Contact
            </Link>
          </nav>
          <button className="md:hidden">
            <MenuIcon  />
          </button>
        </div>
      </header> */}
      <NavBar/>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">```FAQs```</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What products do you offer?</AccordionTrigger>
              <AccordionContent>
                We offer a wide range of high-quality telescopes and space helmets for both amateur and professional
                astronomers. Our products are designed to provide the best viewing experience and maximum protection for
                your space adventures.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I purchase a telescope or helmet?</AccordionTrigger>
              <AccordionContent>
                To purchase a telescope or helmet, simply visit our website and browse our selection. You can add the
                items you are interested in to your cart and complete the checkout process. Our team is also available to
                assist you with any questions or special requests.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the warranty on your products?</AccordionTrigger>
              <AccordionContent>
                All of our telescopes and helmets come with a 2-year warranty against defects in materials and
                workmanship. If you experience any issues with your purchase, please do not hesitate to contact our
                customer support team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I get in touch with your team?</AccordionTrigger>
              <AccordionContent>
                You can reach our team by email at info@pulsar.com or by phone at 1-800-555-1234. We are available Monday
                through Friday, 9am to 5pm EST. You can also submit an inquiry through our website.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <section className=" py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <Card>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-[#84052d]">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <Footer/>
      {/* <footer className="bg-[#84052d] text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <p>&copy; 2024 Pulsar. All rights reserved.</p>
          <nav className="flex items-center space-x-4">
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Terms
            </Link>
          </nav>
        </div>
      </footer> */}
    </div>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function TelescopeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
      <circle cx="12" cy="13" r="2" />
    </svg>
  )
}