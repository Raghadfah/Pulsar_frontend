import { Separator } from "@/components/ui/separator"
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon
} from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <>
      <Separator />
      <footer className="bg-[#000000] text-white p-8 md:p-12 w-full">
        <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="flex flex-col gap-2">
              <Link className="flex items-center gap-2 text-[#BDBDBD] hover:text-white transition-colors" to="#">
                <MailIcon className="w-5 h-5" />
                <span>info@acmespace.com</span>
              </Link>
              <Link className="flex items-center gap-2 text-[#BDBDBD] hover:text-white transition-colors" to="#">
                <PhoneIcon className="w-5 h-5" />
                <span>050-338-6519</span>
              </Link>
              <Link className="flex items-center gap-2 text-[#BDBDBD] hover:text-white transition-colors" to="#">
                <MapPinIcon className="w-5 h-5" />
                <span>123 Rocket Rd, Riyadh KSA</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="/">
                Home
              </Link>
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="/aboutUs">
                About
              </Link>
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="/support">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="#">
                Terms of Service
              </Link>
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="#">
                Privacy Policy
              </Link>
              <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="#">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="container max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="https://github.com/Raghadfah">
              <GithubIcon className="w-5 h-5" />
              <span className="sr-only">Github</span>
            </Link>
            <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="http://linkedin.com/in/raghad-alghunaim-70858b240">
              <LinkedinIcon className="w-5 h-5" />
              <span className="sr-only">Linkedin</span>
            </Link>
            <Link className="text-[#BDBDBD] hover:text-white transition-colors" to="#">
              <YoutubeIcon className="w-5 h-5" />
              <span className="sr-only">Youtube</span>
            </Link>
          </div>
          <p className="text-[#BDBDBD] text-xs mt-4 sm:mt-0">© 2024 Pulsar Space Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
