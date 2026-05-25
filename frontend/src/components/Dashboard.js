import React from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Dashboard() {
  const { user } = useUser();
  return (
    <div style={{paddingTop:'80px',padding:'80px 32px 32px'}}>
      <h1 style={{color:'#00c8ff',marginBottom:'8px'}}>Welcome, {user?.firstName || 'Analyst'} 👋</h1>
      <p style={{color:'#7aaecc',marginBottom:'32px'}}>Your cybersecurity career journey starts here.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
        {[
          {label:'Placement Score',value:'72%',color:'#00c8ff'},
          {label:'Labs Completed',value:'14',color:'#00ff88'},
          {label:'Day Streak',value:'18 🔥',color:'#ffb300'},
          {label:'Mock Interviews',value:'6',color:'#9b5de5'},
        ].map((s,i) => (
          <div key={i} style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.1)',borderRadius:'12px',padding:'20px'}}>
            <div style={{fontSize:'12px',color:'#3d6a8a',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px'}}>{s.label}</div>
            <div style={{fontSize:'28px',fontWeight:700,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}