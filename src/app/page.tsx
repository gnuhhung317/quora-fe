import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PostList from "./components/PostList";
import Ad from "./components/Ad";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex mt-4 px-4">
        {/* Sidebar */}
        <aside className="w-1/4">
          <Sidebar />
        </aside>

        {/* Posts */}
        <section className="w-2/4 space-y-4">
          <PostList />
        </section>

        {/* Advertisement */}
        <aside className="w-1/4">
          <Ad />
        </aside>
      </main>
      <Footer />
    </>
  );
}
