import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  return (
    <nav style={{background:'#0d1626',borderBottom:'1px solid rgba(0,200,255,0.15)',padding:'0 24px',height:'60px',display:'flex',alignItems:'center',gap:'24px',position:'fixed',top:0,left:0,right:0,zIndex:100}}>
      <span style={{color:'#00c8ff',fontWeight:700,fontSize:'18px',letterSpacing:'2px'}}>⚡ CYBERPATH AI</span>
      <Link to="/" style={{color:'#7aaecc',textDecoration:'none',fontSize:'14px'}}>Dashboard</Link>
      <Link to="/roadmap" style={{color:'#7aaecc',textDecoration:'none',fontSize:'14px'}}>Roadmap</Link>
      <Link to="/interview" style={{color:'#7aaecc',textDecoration:'none',fontSize:'14px'}}>Interview</Link>
      <Link to="/resume" style={{color:'#7aaecc',textDecoration:'none',fontSize:'14px'}}>Resume AI</Link>
      <Link to="/skillgap" style={{color:'#7aaecc',textDecoration:'none',fontSize:'14px'}}>Skill Gap</Link>
      <div style={{marginLeft:'auto'}}><UserButton /></div>
    </nav>
  );
}