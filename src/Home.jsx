import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpotifySearch from "./components/SpotifySearch";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import TopArtists from "./pages/TopArtists";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div>
            <BrowserRouter>
            
            <Navbar />
            <Routes>
                <Route path="/" element={<SpotifySearch />} /> {/* Default Route */}
                <Route path="/albums/popular" element={<Popular />} />
                <Route path="/albums/trending" element={<Trending />} />
                <Route path="/artists/top" element={<TopArtists />} />
            </Routes>
        
    </BrowserRouter>
        </div>
        
    );
}
