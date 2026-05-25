import React, { useState } from 'react';
import axios from 'axios';

export default function Roadmap() {
  const [role, setRole] = useState('SOC Analyst');
  const [months, setMonths] = useState(6);
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/roadmap`, {
        role, months, experience: 'Beginner'
      });
      setRoadmap(res.data.roadmap);
    } catch(e) { alert('Error generating roadmap'); }
    setLoading(false);
  };

  return (
    <div style={{paddingTop:'80px',padding:'80px 32px 32px',maxWidth:'800px',margin:'0 auto'}}>
      <h1 style={{color:'#00c8ff',marginBottom:'24px'}}>AI Career Roadmap Generator</h1>
      <div style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.15)',borderRadius:'12px',padding:'24px',marginBottom:'24px'}}>
        <div style={{marginBottom:'16px'}}>
          <label style={{color:'#7aaecc',fontSize:'13px',display:'block',marginBottom:'6px'}}>Target Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)}
            style={{background:'#060b14',color:'#e0f0ff',border:'1px solid rgba(0,200,255,0.2)',borderRadius:'8px',padding:'10px',width:'100%',fontSize:'14px'}}>
            <option>SOC Analyst</option>
            <option>Penetration Tester</option>
            <option>Cloud Security Engineer</option>
            <option>GRC Analyst</option>
            <option>DFIR Analyst</option>
          </select>
        </div>
        <div style={{marginBottom:'16px'}}>
          <label style={{color:'#7aaecc',fontSize:'13px',display:'block',marginBottom:'6px'}}>Timeline: {months} months</label>
          <input type="range" min="3" max="18" value={months} onChange={e=>setMonths(e.target.value)}
            style={{width:'100%'}} />
        </div>
        <button onClick={generate} disabled={loading}
          style={{background:'#00c8ff',color:'#000',border:'none',borderRadius:'8px',padding:'12px 24px',fontWeight:700,fontSize:'14px',cursor:'pointer',width:'100%'}}>
          {loading ? '🤖 Generating your roadmap...' : '🗺️ Generate My Roadmap'}
        </button>
      </div>
      {roadmap && (
        <div style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.15)',borderRadius:'12px',padding:'24px'}}>
          <h3 style={{color:'#00c8ff',marginBottom:'16px'}}>Your Personalized Roadmap</h3>
          <pre style={{color:'#e0f0ff',fontSize:'13px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>{roadmap}</pre>
        </div>
      )}
    </div>
  );
}