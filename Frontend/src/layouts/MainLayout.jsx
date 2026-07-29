import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;