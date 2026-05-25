import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import Interview from './components/Interview';
import ResumeAI from './components/ResumeAI';
import SkillGap from './components/SkillGap';
import './App.css';

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <SignedOut>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',background:'#060b14'}}>
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume" element={<ResumeAI />} />
            <Route path="/skillgap" element={<SkillGap />} />
          </Routes>
        </BrowserRouter>
      </SignedIn>
    </ClerkProvider>
  );
}