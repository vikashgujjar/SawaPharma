import { Playfair_Display, Poppins, Inter } from "next/font/google";
import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import GoogleTranslate from "./Components/GoogleTranslate";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Sawa Pharma India Pvt. Ltd.",
  description: "WHO-GMP Certified Pharmaceutical Manufacturer & Global Export Partner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${inter.variable}`}>
        <GoogleTranslate />
        <Topbar />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
