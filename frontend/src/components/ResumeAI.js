import React, { useState } from 'react';
import axios from 'axios';

export default function ResumeAI() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if(!text.trim()) { alert('Please paste your resume text'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`https://cyberpath-ai-1.onrender.com/api/resume`, {
        resume_text: text, role: 'SOC Analyst'
      });
      setFeedback(res.data.feedback);
    } catch(e) { alert('Error analyzing resume'); }
    setLoading(false);
  };

  return (
    <div style={{paddingTop:'80px',padding:'80px 32px 32px',maxWidth:'800px',margin:'0 auto'}}>
      <h1 style={{color:'#00c8ff',marginBottom:'8px'}}>Resume AI Analyzer</h1>
      <p style={{color:'#7aaecc',marginBottom:'24px',fontSize:'14px'}}>Paste your resume text below for instant AI feedback</p>
      <textarea value={text} onChange={e=>setText(e.target.value)}
        placeholder="Paste your resume text here..."
        style={{width:'100%',height:'200px',background:'#0d1626',border:'1px solid rgba(0,200,255,0.2)',borderRadius:'12px',padding:'16px',color:'#e0f0ff',fontSize:'13px',outline:'none',resize:'vertical',marginBottom:'16px'}}/>
      <button onClick={analyze} disabled={loading}
        style={{background:'#00c8ff',color:'#000',border:'none',borderRadius:'8px',padding:'12px 24px',fontWeight:700,fontSize:'14px',cursor:'pointer',width:'100%',marginBottom:'24px'}}>
        {loading ? '🔍 Analyzing...' : '🔍 Analyze My Resume'}
      </button>
      {feedback && (
        <div style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.15)',borderRadius:'12px',padding:'24px'}}>
          <h3 style={{color:'#00c8ff',marginBottom:'16px'}}>AI Feedback</h3>
          <pre style={{color:'#e0f0ff',fontSize:'13px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>{feedback}</pre>
        </div>
      )}
    </div>
  );
}