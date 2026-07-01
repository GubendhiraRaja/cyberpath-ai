import React, { useState } from 'react';
import axios from 'axios';

const allSkills = ['Networking','Linux','Python','SIEM','Splunk','Wireshark','Incident Response','Threat Hunting','MITRE ATT&CK','Malware Analysis','Cloud Security','Firewalls','Windows Security','Log Analysis','Penetration Testing'];

export default function SkillGap() {
  const [selected, setSelected] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const toggle = (skill) => setSelected(prev => prev.includes(skill) ? prev.filter(s=>s!==skill) : [...prev, skill]);

  const analyze = async () => {
    if(selected.length === 0) { alert('Select at least one skill'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`https://cyberpath-ai-1.onrender.com/api/skillgap`, {
        skills: selected, role: 'SOC Analyst'
      });
      setAnalysis(res.data.analysis);
    } catch(e) { alert('Error'); }
    setLoading(false);
  };

  return (
    <div style={{paddingTop:'80px',padding:'80px 32px 32px',maxWidth:'800px',margin:'0 auto'}}>
      <h1 style={{color:'#00c8ff',marginBottom:'8px'}}>Skill Gap Analysis</h1>
      <p style={{color:'#7aaecc',marginBottom:'24px',fontSize:'14px'}}>Select all skills you currently have</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginBottom:'24px'}}>
        {allSkills.map(skill=>(
          <button key={skill} onClick={()=>toggle(skill)}
            style={{padding:'8px 16px',borderRadius:'20px',border:'1px solid',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',
              background:selected.includes(skill)?'rgba(0,200,255,0.15)':'transparent',
              borderColor:selected.includes(skill)?'#00c8ff':'rgba(0,200,255,0.2)',
              color:selected.includes(skill)?'#00c8ff':'#7aaecc'}}>
            {selected.includes(skill)?'✓ ':''}{skill}
          </button>
        ))}
      </div>
      <button onClick={analyze} disabled={loading}
        style={{background:'#00c8ff',color:'#000',border:'none',borderRadius:'8px',padding:'12px 24px',fontWeight:700,fontSize:'14px',cursor:'pointer',width:'100%',marginBottom:'24px'}}>
        {loading ? '🤖 Analyzing gap...' : '🔍 Analyze My Skill Gap'}
      </button>
      {analysis && (
        <div style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.15)',borderRadius:'12px',padding:'24px'}}>
          <h3 style={{color:'#00c8ff',marginBottom:'16px'}}>Your Skill Gap Report</h3>
          <pre style={{color:'#e0f0ff',fontSize:'13px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>{analysis}</pre>
        </div>
      )}
    </div>
  );
}