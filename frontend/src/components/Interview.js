import React, { useState } from 'react';
import axios from 'axios';

export default function Interview() {
  const [messages, setMessages] = useState([
    {role:'ai', text:'Hello! I am your AI interviewer. Tell me: Why do you want to become a SOC Analyst?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const lastQ = messages.filter(m=>m.role==='ai').slice(-1)[0]?.text || '';

  const send = async () => {
    if(!input.trim()) return;
    const userMsg = {role:'user', text:input};
    setMessages(prev=>[...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post(`https://cyberpath-ai-1.onrender.com/api/interview`, {
        role:'SOC Analyst', question:lastQ, answer:input
      });
      setMessages(prev=>[...prev, {role:'ai', text:res.data.reply}]);
    } catch(e) { alert('Error'); }
    setLoading(false);
  };

  return (
    <div style={{paddingTop:'80px',padding:'80px 32px 32px',maxWidth:'800px',margin:'0 auto'}}>
      <h1 style={{color:'#00c8ff',marginBottom:'24px'}}>AI Mock Interview</h1>
      <div style={{background:'#0d1626',border:'1px solid rgba(0,200,255,0.15)',borderRadius:'12px',padding:'20px',minHeight:'400px',maxHeight:'500px',overflowY:'auto',marginBottom:'16px'}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start',marginBottom:'16px'}}>
            <div style={{maxWidth:'80%',padding:'12px 16px',borderRadius:'12px',fontSize:'13px',lineHeight:'1.6',
              background:m.role==='ai'?'#111d2e':'rgba(155,93,229,0.1)',
              border:m.role==='ai'?'1px solid rgba(0,200,255,0.1)':'1px solid rgba(155,93,229,0.2)',
              color:'#e0f0ff'}}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div style={{color:'#7aaecc',fontSize:'13px'}}>🤖 AI is thinking...</div>}
      </div>
      <div style={{display:'flex',gap:'10px'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Type your answer..."
          style={{flex:1,background:'#0d1626',border:'1px solid rgba(0,200,255,0.2)',borderRadius:'8px',padding:'12px',color:'#e0f0ff',fontSize:'14px',outline:'none'}}/>
        <button onClick={send} style={{background:'#00c8ff',color:'#000',border:'none',borderRadius:'8px',padding:'12px 20px',fontWeight:700,cursor:'pointer'}}>Send</button>
      </div>
    </div>
  );
}