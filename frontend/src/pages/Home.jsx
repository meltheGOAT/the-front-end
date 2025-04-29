import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = user ? "/api/posts/premium" : "/api/posts/free";
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          headers: {
            Authorization: user ? `Bearer ${token}` : "",
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.msg || "Failed to fetch posts");
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, [user, token]);

  //   return (
  //     <div>
  //       <h1>Welcome to the Blog</h1>
  //       {error && <p style={{ color: "red" }}>{error}</p>}
  //       {posts.length === 0 ? (
  //         <p>No posts found.</p>
  //       ) : (
  //         <ul>
  //           {posts.map(post => (
  //             <li key={post._id}>
  //               <h2>{post.title}</h2>
  //               <p>{post.content}</p>
  //               {post.image && (
  //                 <img
  //                   src={`http://localhost:5000/${post.image}`}
  //                   alt={post.title}
  //                   width="150"
  //                 />
  //               )}
  //               <p>Premium: {post.premium ? "Yes" : "No"}</p>
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Melvin's Blog</h1>
          <div>
            <a href="/" className="text-white px-4 hover:text-gray-400">
              Home
            </a>
            <a
              href="/createpost"
              className="text-white px-4 hover:text-gray-400"
            >
              Create
            </a>
            <a href="/login" className="text-white px-4 hover:text-gray-400">
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-6 sm:px-12 md:px-24">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Welcome to Melvin's Premium Blog
            </h2>
            <p className="text-xl sm:text-2xl mb-6">
              Explore high-quality content, stay informed, and dive deep into
              topics that matter.
            </p>
            <a
              href="/createpost"
              className="bg-yellow-500 text-black px-8 py-3 text-lg rounded-full shadow-lg hover:bg-yellow-600 transition"
            >
              Start Writing
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(0, 3).map(post => (
              <div
                key={post._id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                {post.image && (
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {post.content.slice(0, 150)}...
                  </p>
                  <p className="text-sm text-yellow-400">
                    {post.premium ? "Premium Content" : "Free Content"}
                  </p>
                  <a
                    href={`/posts/${post._id}`}
                    className="inline-block mt-4 text-yellow-500 hover:text-yellow-400"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(3).map(post => (
              <div
                key={post._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                {post.image && (
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.title}
                    className="w-full h-5 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {post.content.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-yellow-400">
                    {post.premium ? "Premium Content" : "Free Content"}
                  </p>
                  <a
                    href={`/posts/${post._id}`}
                    className="inline-block mt-4 text-yellow-500 hover:text-yellow-400"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <div className="max-w-7xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} Melvin's Blog | All Rights
            Reserved
          </p>
          <div className="mt-4">
            <a href="#" className="text-white px-4 hover:text-gray-400">
              Facebook
            </a>
            <a href="#" className="text-white px-4 hover:text-gray-400">
              Twitter
            </a>
            <a href="#" className="text-white px-4 hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// src/pages/Home.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         let endpoint = "/api/posts/free";

//         // Only fetch premium posts if user is logged in AND has access
//         if (user && (user.role === "admin" || user.role === "premium")) {
//           endpoint = "/api/posts/premium";
//         }
//         console.log("Logged in user:", user); // Add this line

//         const res = await fetch(`http://localhost:5000${endpoint}`, {
//           headers: {
//             Authorization: localStorage.getItem("token")
//               ? `Bearer ${localStorage.getItem("token")}`
//               : undefined,
//           },
//         });

//         const data = await res.json();

//         if (!res.ok) throw new Error(data.msg || "Failed to fetch posts");
//         setPosts(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchPosts();
//   }, [user]);
//   return (
//     <div>
//       <h1>Welcome to the Blog</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <ul>
//           {posts.map(post => (
//             <li key={post._id}>
//               <h2>{post.title}</h2>
//               <p>{post.content}</p>
//               {post.image && (
//                 <img
//                   src={`http://localhost:5000/${post.image}`}
//                   alt={post.title}
//                   width="150"
//                 />
//               )}
//               <p>Premium: {post.premium ? "Yes" : "No"}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Home;
