"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

if (!res.ok) {
  throw new Error("Failed to send");
}
    setLoading(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "0.85rem",
    color: "rgba(0, 0, 0, 0.9)",
    padding: "10px 12px 10px 34px",
  };

  const inputWrapStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    borderTop: "1px solid rgba(255,255,255,0.28)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "rgba(4, 4, 4, 0.5)",
    letterSpacing: "0.03em",
    marginBottom: "5px",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "11px",
    width: "15px",
    height: "15px",
    color: "rgba(255,255,255,0.32)",
    pointerEvents: "none",
    flexShrink: 0,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display&display=swap');
        .cf-wrap * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .cf-input::placeholder { color: rgba(255,255,255,0.25); }
        .cf-iw:focus-within {
          background: rgba(255,255,255,0.13) !important;
          border-color: rgba(160,180,255,0.5) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 3px rgba(120,140,255,0.15) !important;
        }
        .cf-btn:hover { transform: translateY(-1px); box-shadow: inset 0 1.5px 0 #fff, 0 8px 26px rgba(80,100,255,0.32), 0 3px 8px rgba(0,0,0,0.15) !important; }
        .cf-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .cf-slink { color: rgba(180,200,255,0.55); text-decoration: none; font-size: 0.72rem; font-weight: 500; display: inline-flex; align-items: center; gap: 2px; transition: color 0.15s; }
        .cf-slink:hover { color: rgba(255,255,255,0.9); }
        .cf-again:hover { background: rgba(255,255,255,0.14) !important; color: #fff !important; }
        @keyframes cf-spin { to { transform: rotate(360deg); } }
        .cf-spinner { width:14px;height:14px;border:2px solid rgba(15,10,40,0.15);border-top-color:rgba(15,10,40,0.75);border-radius:50%;animation:cf-spin 0.7s linear infinite;flex-shrink:0; }
        select.cf-input option { background: #1e1b3a; color: #fff; }
      `}</style>

      <div
        className="cf-wrap"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          borderRadius: "26px",
          padding: "32px 30px 26px",
          overflow: "hidden",
          background: "linear-gradient(150deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(52px) saturate(190%) brightness(1.06)",
          WebkitBackdropFilter: "blur(52px) saturate(190%) brightness(1.06)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderTopColor: "rgba(255,255,255,0.5)",
          borderLeftColor: "rgba(255,255,255,0.26)",
          boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.55), inset 1px 0 0 rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        {/* Top glare */}
        <div style={{ position:"absolute", top:0, left:"15%", right:"15%", height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.82) 40%,rgba(255,255,255,0.82) 60%,transparent)", pointerEvents:"none" }} />
        {/* Left glare */}
        <div style={{ position:"absolute", top:"15%", bottom:"30%", left:0, width:"1px", background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.45) 40%,rgba(255,255,255,0.45) 60%,transparent)", pointerEvents:"none" }} />

        {!sent ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: "22px" }}>
              <span style={{ display:"block", fontSize:"0.67rem", fontWeight:500, letterSpacing:"0.13em", textTransform:"uppercase", color:"rgba(0, 0, 0, 0.45)", marginBottom:"5px" }}>
                Say hello
              </span>
              <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"1.75rem", fontWeight:400, color:"rgba(0, 0, 0, 0.95)", margin:"0 0 6px", lineHeight:1.15, letterSpacing:"-0.02em" }}>
                Get in touch
              </h2>
              <p style={{ fontSize:"0.8rem", color:"rgba(0, 0, 0, 0.4)", lineHeight:1.6, margin:0 }}>
                Have a project or just want to connect? I&apos;d love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"13px" }} noValidate>

              {/* Name + Email row */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <div className="cf-iw" style={inputWrapStyle}>
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <input className="cf-input" style={inputStyle} name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <div className="cf-iw" style={inputWrapStyle}>
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                    <input className="cf-input" style={inputStyle} name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={labelStyle}>Subject</label>
                <div className="cf-iw" style={{ ...inputWrapStyle, position:"relative" }}>
                  <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h10M4 18h6"/></svg>
                  <select
                    className="cf-input"
                    style={{ ...inputStyle, appearance:"none", WebkitAppearance:"none", cursor:"pointer", color: form.subject ? "rgba(5, 5, 5, 0.9)" : "rgba(226, 212, 212, 0.35)" }}
                    name="subject" value={form.subject} onChange={handleChange} required
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option>Freelance project</option>
                    <option>Full-time opportunity</option>
                    <option>Collaboration</option>
                    <option>Just saying hi</option>
                  </select>
                  <svg style={{ position:"absolute", right:"11px", width:"13px", height:"13px", color:"rgba(255,255,255,0.35)", pointerEvents:"none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <div className="cf-iw" style={{ ...inputWrapStyle, alignItems:"flex-start" }}>
                  <textarea
                    className="cf-input"
                    style={{ ...inputStyle, padding:"10px 12px", lineHeight:1.55, resize:"none" }}
                    name="message" rows={4} placeholder="Tell me about your project or idea…"
                    value={form.message} onChange={handleChange} required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cf-btn"
                disabled={loading}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                  width:"100%", padding:"12px 20px", border:"none", borderRadius:"12px",
                  cursor:"pointer", fontFamily:"'DM Sans', sans-serif", fontSize:"0.875rem",
                  fontWeight:600, color:"rgba(15,10,40,0.9)", letterSpacing:"-0.01em", marginTop:"2px",
                  background:"linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(215,225,255,0.82) 100%)",
                  boxShadow:"inset 0 1.5px 0 #fff, 0 4px 18px rgba(80,100,255,0.22), 0 2px 6px rgba(0,0,0,0.12)",
                  transition:"transform 0.14s, box-shadow 0.14s",
                }}
              >
                {loading ? (
                  <><span className="cf-spinner" /> Sending…</>
                ) : (
                  <>Send message <svg style={{ width:"14px", height:"14px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg></>
                )}
              </button>

           
            </form>
          </>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:"10px", padding:"20px 0 10px" }}>
            <div style={{ width:"54px", height:"54px", borderRadius:"50%", background:"rgba(100,220,140,0.12)", border:"1px solid rgba(100,220,140,0.3)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"6px" }}>
              <svg style={{ width:"22px", height:"22px", stroke:"#6ddc8a", strokeWidth:"2.5" }} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"1.5rem", fontWeight:400, color:"rgba(0, 0, 0, 0.92)", margin:0 }}>Message sent!</h2>
            <p style={{ fontSize:"0.82rem", color:"rgba(0, 0, 0, 0.42)", maxWidth:"260px", lineHeight:1.6, margin:0 }}>
              Thanks! I&apos;ll get back to you within 24 hours.
            </p>
            <button
              className="cf-again"
              onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
              style={{ marginTop:"8px", padding:"9px 22px", borderRadius:"999px", border:"1px solid rgba(255,255,255,0.18)", background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", cursor:"pointer", transition:"background 0.18s, color 0.18s" }}
            >
              Send another
            </button>
          </div>
        )}
      </div>
    </>
  );
}