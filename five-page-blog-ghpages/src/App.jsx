import React from "react";
import { HashRouter, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom";

// --- Demo blog data ---
const BLOGS = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  title: `Sample Blog Post #${i + 1}`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nCurabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus."
}));

const PAGE_SIZE = 10;

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">MySite</Link>
          <nav className="flex gap-3 text-sm">
            <Link className="px-3 py-2 rounded-full hover:bg-gray-100" to="/">Home</Link>
            {[1,2,3,4].map(num => (
              <Link key={num} className="px-3 py-2 rounded-full hover:bg-gray-100" to={`/blog/${num}`}>Blog-{num}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} MySite</footer>
    </div>
  );
}

function Home() {
  const latestBlog = BLOGS[BLOGS.length - 1];
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome Home</h1>
          <p className="text-gray-600 mb-6">
            This is the Home page. Explore our Blog pages (Blog-1..4). Each blog page shows tiles with a headline and a two-line snippet. Click any tile to open the full blog. Use the Next button to move between blog pages.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {[1,2,3,4].map(num => (
              <Link key={num} to={`/blog/${num}`} className="px-5 py-3 rounded-2xl bg-gray-900 text-white shadow hover:opacity-90">Go to Blog-{num}</Link>
            ))}
          </div>
          <a href="#grid-demo" className="px-5 py-3 rounded-2xl border shadow-sm hover:bg-gray-50 inline-block">See Grid Demo</a>
        </div>
        <div id="grid-demo" className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Latest Blog Preview</h2>
          <div className="rounded-2xl border p-4 shadow-sm">
            <div className="h-24 rounded-xl bg-gray-100 mb-3" />
            <div className="font-semibold">{latestBlog.title}</div>
            <div className="text-sm text-gray-600 line-clamp-2">{latestBlog.excerpt}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function BlogListPage() {
  const { pageNum } = useParams();
  const navigate = useNavigate();
  const page = Math.max(1, Math.min(4, Number(pageNum) || 1));

  const start = (page - 1) * PAGE_SIZE;
  const posts = BLOGS.slice(start, start + PAGE_SIZE);

  const openPost = (post) => {
    const dialog = document.getElementById("post-dialog");
    const titleEl = document.getElementById("post-dialog-title");
    const bodyEl = document.getElementById("post-dialog-body");
    if (titleEl) titleEl.textContent = post.title;
    if (bodyEl) bodyEl.textContent = post.content;
    if (dialog) dialog.showModal();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog-{page}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/blog/${Math.max(1, page - 1)}`)}
            className={`px-4 py-2 rounded-2xl border shadow-sm ${page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            disabled={page === 1}
          >Previous</button>
          <button
            onClick={() => navigate(`/blog/${Math.min(4, page + 1)}`)}
            className={`px-4 py-2 rounded-2xl border shadow-sm ${page === 4 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            disabled={page === 4}
          >Next</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group rounded-3xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-[16/10] w-full rounded-2xl bg-gray-100 mb-4" />
            <h3 className="font-semibold text-lg mb-2 group-hover:underline">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => openPost(post)}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white shadow hover:opacity-90"
              >Read</button>
              <button
                onClick={() => openPost(post)}
                className="text-sm text-gray-600 hover:underline"
              >Open →</button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-2">
        <button
          onClick={() => navigate(`/blog/${Math.max(1, page - 1)}`)}
          className={`px-4 py-2 rounded-2xl border shadow-sm ${page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          disabled={page === 1}
        >Previous</button>
        <button
          onClick={() => navigate(`/blog/${Math.min(4, page + 1)}`)}
          className={`px-4 py-2 rounded-2xl border shadow-sm ${page === 4 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          disabled={page === 4}
        >Next</button>
      </div>

      <dialog id="post-dialog" className="rounded-2xl p-0 w-full max-w-2xl">
        <div className="p-6">
          <h2 id="post-dialog-title" className="text-2xl font-bold mb-3">Title</h2>
          <p id="post-dialog-body" className="whitespace-pre-wrap text-gray-700" />
          <div className="mt-6 flex justify-end">
            <form method="dialog">
              <button className="px-4 py-2 rounded-xl border shadow-sm hover:bg-gray-50">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:pageNum" element={<BlogListPage />} />
        <Route path="/blog" element={<Navigate to="/blog/1" replace />} />
        <Route path="*" element={<Layout><div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-2">404</h1>
          <p className="text-gray-600 mb-6">Page not found</p>
          <Link to="/" className="px-4 py-2 rounded-xl border shadow-sm hover:bg-gray-50">Go Home</Link>
        </div></Layout>} />
      </Routes>
    </HashRouter>
  );
}
