// import { cn } from "../../lib/utils";
// import { NavLink } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { Menu, X } from "lucide-react";
// import { useState, useEffect } from "react";

// interface NavigationProps {
//   className?: string;
// }

// export function Navigation({ className }: NavigationProps) {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const links = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About Us" },
//     { href: "/activities", label: "Activities" },
//     { href: "/membership", label: "Membership" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const NavLinks = () => (
//     <>
//       {links.map((link) => (
//         <NavLink
//           key={link.href}
//           to={link.href}
//           className={({ isActive }) =>
//             cn(
//               "nav-link",
//               isActive && "nav-link--active",
//               className
//             )
//           }
//           onClick={() => setOpen(false)}
//         >
//           {link.label}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <header className={cn("navbar", scrolled && "navbar--scrolled")}>
//       <div className="navbar__container">
//         {/* Mobile Navigation */}
//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" icon="sm" className="nav-toggle">
//                 {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="mobile-menu">
//               <nav className="mobile-menu__links">
//                 <NavLinks />
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className={cn("desktop-menu", className)}>
//           <NavLinks />
//         </nav>
//       </div>
//     </header>
//   );
// }