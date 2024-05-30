import { RocketIcon, SatelliteIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-gray-100 dark:bg-gray-950 bg-[url('/images/background.jpg')] bg-cover">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-pink-900 drop-shadow-md">Reach for the Stars</h1>
        <p className="text-lg text-white dark:text-gray-300">
          Thank you for your support and feedback. Your input helps us elevate our space exploration
          solutions to new heights.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#6a1c41] shadow-md transition-colors hover:bg-[#b54d92] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-[#001D3D] dark:text-white"
          to="/"
        >
          <RocketIcon className="mr-2 h-5 w-5" />
          Return to Launchpad
        </Link>
        <Button
          className="inline-flex items-center justify-center rounded-md bg-[#6a1c41] px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#b54d92] focus:outline-none focus:ring-2  focus:ring-offset-2 dark:bg-[#003566] dark:hover:bg-[#de64b1] dark:focus:ring-[#de64b1] dark:focus:ring-offset-[#001D3D]"
          variant="secondary"
        >
          <SatelliteIcon className="mr-2 h-5 w-5" />
          Explore Our Solutions
        </Button>
      </div>
    </div>
  )
}
