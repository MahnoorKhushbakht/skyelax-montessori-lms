import { 
  Heart,
  Compass,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import { schoolConfig } from "@/config/schoolConfig";
export default function Footer(){
    return(
         <footer className="bg-gray-950 border-t border-gray-800/80 pt-12 pb-8 px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-base text-white">{schoolConfig.name}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {schoolConfig.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Heart className="w-4 h-4 fill-emerald-400/20" /> Dedicated to Child-Centred Growth
            </div>
          </div>


          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Learning Portals</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/teacher" className="hover:text-white transition-colors">Montessori Guides (Teachers)</Link></li>
              <li><Link href="/parent" className="hover:text-white transition-colors">Parent Timeline Portal</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Campus Management</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Account Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Contact</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{schoolConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{schoolConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{schoolConfig.contact.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {schoolConfig.name}. All rights reserved.</p>
          <p>Multi-Tenant Early Education Platform</p>
        </div>
      </footer>
  );

}