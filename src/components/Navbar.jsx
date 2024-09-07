import { appleImg } from '../utils'; 
import { navLists } from '../constants'; 

const navLinks = [
  { name: 'Home', href: 'https://doj.gov.in/' },
  { name: 'Acts & Rules', href: 'https://doj.gov.in/acts-and-rules/' },
  { name: 'Citizen Chart', href: 'https://doj.gov.in/citizens-charter/' },
  { name: 'Vision Mission', href: 'https://doj.gov.in/about-department/vision-and-mission/' },
  { name: 'Contact us', href: 'https://doj.gov.in/website-information-manager/' },
];

// Exporting the Navbar component as the default export
const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        {/* Ensure the appleImg path is valid */}
        <img src={appleImg} alt="befit" width={27} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLinks.map((nav, i) => (
            <a
              key={i}
              href={nav.href}
              target="_blank" // Open link in new tab
              rel="noopener noreferrer" // Recommended security practice
              className="px-5 text-md font-bold cursor-pointer text-gray-500 hover:text-white transition-all"
            >
              {nav.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
