"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  console.log("NavBar render searchInput:", searchInput);

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Spotify
        </Link>
      </div>
      <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
        <Link href="/playlists" className="btn btn-ghost text-xl">
          Playlists
        </Link></li>
        <li><Link href="/liked_songs" className="btn btn-ghost text-xl">
          Liked Songs
        </Link></li>
        <li><Link href="/history" className="btn btn-ghost text-xl">
          History
        </Link></li>
        <li>
        <Link href="/login" className="btn btn-ghost text-xl">
          Login
        </Link>
        </li>
        <li>
          <Link href="/following_authors" className="btn btn-ghost text-xl">
          Following
        </Link>
        </li>
      </ul>
    </div>
  </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyUp={(e) => {
            console.log("key pressed:", e.key);
            if (e.key === "Enter") {
              // TODO - add proper code and sanitization
              router.push(`/search?q=${searchInput}`);
            }
          }}
        />
        <Link
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className="btn btn-ghost text-xl"
        >
          Search
        </Link>
        

        

      </div>
    </div>
  );
}
