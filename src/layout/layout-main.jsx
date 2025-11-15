import Footer from "../component/component-footer";
import Navbar from "../component/component-navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
