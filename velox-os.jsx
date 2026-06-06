import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "vision", label: "01 Vision", icon: "◈" },
  { id: "architecture", label: "02 Architecture", icon: "⬡" },
  { id: "ux", label: "03 UX Design", icon: "◎" },
  { id: "smoothness", label: "04 Smoothness", icon: "∿" },
  { id: "ai", label: "05 AI Layer", icon: "⟁" },
  { id: "audio", label: "06 Audio/Visual", icon: "◉" },
  { id: "hardware", label: "07 Hardware", icon: "▣" },
  { id: "ecosystem", label: "08 Ecosystem", icon: "⬘" },
  { id: "security", label: "09 Security", icon: "⬟" },
  { id: "business", label: "10 Business", icon: "◆" },
  { id: "roadmap", label: "11 Roadmap", icon: "→" },
  { id: "execution", label: "12 Execution", icon: "✦" },
];

const Chip = ({ children, accent = false }) => (
  <span style={{
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "4px",
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.08em",
    background: accent ? "rgba(0,220,180,0.12)" : "rgba(255,255,255,0.06)",
    border: `1px solid ${accent ? "rgba(0,220,180,0.35)" : "rgba(255,255,255,0.1)"}`,
    color: accent ? "#00dcb4" : "rgba(255,255,255,0.55)",
    marginRight: "6px",
    marginBottom: "6px",
  }}>{children}</span>
);

const StatBar = ({ label, value, color = "#00dcb4" }) => (
  <div style={{ marginBottom: "14px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontSize: "11px", color, fontFamily: "'DM Mono', monospace" }}>{value}%</span>
    </div>
    <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${value}%`, background: color,
        borderRadius: "2px",
        boxShadow: `0 0 8px ${color}80`,
        transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </div>
  </div>
);

const Divider = () => (
  <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "32px 0" }} />
);

const Tag = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 12px", borderRadius: "6px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "12px", color: "rgba(255,255,255,0.6)",
    marginRight: "8px", marginBottom: "8px",
    fontFamily: "'DM Mono', monospace",
  }}>{children}</div>
);

const SectionHeader = ({ number, title, subtitle }) => (
  <div style={{ marginBottom: "40px" }}>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#00dcb4", letterSpacing: "0.2em", marginBottom: "10px" }}>
      SECTION {number}
    </div>
    <h2 style={{
      fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "700",
      fontFamily: "'Syne', sans-serif",
      background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      margin: "0 0 12px 0", lineHeight: "1.1",
    }}>{title}</h2>
    {subtitle && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", margin: 0 }}>{subtitle}</p>}
  </div>
);

const Card = ({ children, accent = false, glow = false, style = {} }) => (
  <div style={{
    background: accent ? "rgba(0,220,180,0.05)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${accent ? "rgba(0,220,180,0.2)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "12px", padding: "24px",
    boxShadow: glow ? "0 0 40px rgba(0,220,180,0.08)" : "none",
    ...style,
  }}>{children}</div>
);

const Highlight = ({ children }) => (
  <span style={{ color: "#00dcb4", fontWeight: "600" }}>{children}</span>
);

const ArchNode = ({ label, sub, x, y, accent }) => (
  <div style={{
    position: "absolute", left: x, top: y,
    transform: "translate(-50%, -50%)",
    background: accent ? "rgba(0,220,180,0.12)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${accent ? "rgba(0,220,180,0.4)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "8px", padding: "10px 16px",
    textAlign: "center", minWidth: "110px",
    boxShadow: accent ? "0 0 20px rgba(0,220,180,0.15)" : "none",
  }}>
    <div style={{ fontSize: "12px", fontWeight: "700", color: accent ? "#00dcb4" : "rgba(255,255,255,0.85)", fontFamily: "'Syne', sans-serif" }}>{label}</div>
    {sub && <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginTop: "3px" }}>{sub}</div>}
  </div>
);

// Mock UI Preview
const MockUI = () => {
  const [time, setTime] = useState(new Date());
  const [speed, setSpeed] = useState(68);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    const s = setInterval(() => setSpeed(prev => Math.max(50, Math.min(95, prev + (Math.random() - 0.5) * 4))), 2000);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");

  return (
    <div style={{
      width: "100%", aspectRatio: "16/7",
      background: "linear-gradient(160deg, #050a12 0%, #080e18 60%, #060b10 100%)",
      borderRadius: "16px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      position: "relative", display: "flex",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,220,180,0.05)",
      fontFamily: "'Syne', sans-serif",
    }}>
      {/* Left panel — instrument cluster */}
      <div style={{
        width: "26%", borderRight: "1px solid rgba(255,255,255,0.05)",
        padding: "18px 16px", display: "flex", flexDirection: "column", gap: "14px",
        background: "rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>KM/H</div>
          <div style={{
            fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "800",
            color: "#ffffff", lineHeight: 1,
            textShadow: "0 0 30px rgba(0,220,180,0.3)",
            transition: "all 0.6s ease",
          }}>{Math.round(speed)}</div>
          <div style={{ fontSize: "9px", color: "#00dcb4", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginTop: "4px" }}>VELOX DRIVE</div>
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
        <div>
          <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>BATTERY</div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "73%", height: "100%", background: "linear-gradient(90deg, #00dcb4, #00b090)", borderRadius: "2px", boxShadow: "0 0 8px rgba(0,220,180,0.5)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <span style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>73%</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>~218km</span>
          </div>
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ display: "flex", gap: "8px" }}>
          {["ECO", "AWD", "ABS"].map(i => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "4px",
              borderRadius: "4px", fontSize: "8px",
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
              background: i === "ECO" ? "rgba(0,220,180,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === "ECO" ? "rgba(0,220,180,0.4)" : "rgba(255,255,255,0.07)"}`,
              color: i === "ECO" ? "#00dcb4" : "rgba(255,255,255,0.3)",
            }}>{i}</div>
          ))}
        </div>
      </div>

      {/* Center — main display */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
            SAN FRANCISCO — 72°F
          </div>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", letterSpacing: "0.05em" }}>
            {hh}:{mm}
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>5G ●</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>GPS ●</div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "0 16px" }}>
          {["home", "nav", "music", "climate"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 14px", border: "none", background: "none",
              cursor: "pointer", fontSize: "10px",
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em",
              color: activeTab === tab ? "#00dcb4" : "rgba(255,255,255,0.25)",
              borderBottom: `2px solid ${activeTab === tab ? "#00dcb4" : "transparent"}`,
              marginBottom: "-1px", textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}>{tab}</button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, padding: "16px 18px", overflow: "hidden" }}>
          {activeTab === "home" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", height: "100%" }}>
              <div style={{
                gridRow: "span 2",
                background: "rgba(0,220,180,0.05)",
                borderRadius: "10px", border: "1px solid rgba(0,220,180,0.12)",
                padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>AI COPILOT</div>
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.5", marginBottom: "8px" }}>
                    "Traffic on I-280 ahead. Rerouting via CA-85 saves 8 min."
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ padding: "4px 10px", borderRadius: "4px", background: "rgba(0,220,180,0.15)", border: "1px solid rgba(0,220,180,0.3)", fontSize: "9px", color: "#00dcb4", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>REROUTE</div>
                    <div style={{ padding: "4px 10px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "9px", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>DISMISS</div>
                  </div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)", padding: "12px" }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", marginBottom: "6px" }}>NOW PLAYING</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>Darkside</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>Alan Walker</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)", padding: "12px" }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", marginBottom: "6px" }}>CLIMATE</div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#ffffff" }}>22°</div>
                <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>AUTO ●</div>
              </div>
            </div>
          )}
          {activeTab === "nav" && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{
                flex: 1, borderRadius: "10px", overflow: "hidden",
                background: "linear-gradient(135deg, #0a1520 0%, #0d1f2d 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* Simplified map grid */}
                <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.15 }}>
                  {[...Array(8)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#00dcb4" strokeWidth="0.5" />)}
                  {[...Array(12)].map((_, i) => <line key={`v${i}`} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" stroke="#00dcb4" strokeWidth="0.5" />)}
                  <line x1="20%" y1="70%" x2="80%" y2="30%" stroke="#00dcb4" strokeWidth="2" strokeDasharray="4,3" opacity="0.8" />
                </svg>
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}>MAP PREVIEW</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>Interactive in full OS</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Home — 12 min", "Work — 28 min", "Last Visited"].map(d => (
                  <div key={d} style={{
                    flex: 1, padding: "8px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                    fontSize: "9px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace",
                    textAlign: "center", cursor: "pointer",
                  }}>{d}</div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "music" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
              <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #1a0a2e, #0d1f3c)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", flexShrink: 0,
                }}>♪</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "rgba(255,255,255,0.9)", marginBottom: "4px" }}>Darkside</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>Alan Walker · Different World</div>
                  <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                    <div style={{ width: "42%", height: "100%", background: "#00dcb4", borderRadius: "2px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>1:47</span>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>4:14</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {["⏮", "⏸", "⏭"].map(c => (
                  <button key={c} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: c === "⏸" ? "rgba(0,220,180,0.2)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${c === "⏸" ? "rgba(0,220,180,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: "rgba(255,255,255,0.7)", fontSize: "13px", cursor: "pointer",
                  }}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {activeTab === "climate" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", height: "100%" }}>
              {[
                { label: "DRIVER", temp: "22°C", fan: "3" },
                { label: "PASSENGER", temp: "21°C", fan: "2" },
              ].map(z => (
                <div key={z.label} style={{
                  borderRadius: "10px", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)", padding: "16px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>{z.label}</div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff" }}>{z.temp}</div>
                  <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>FAN {z.fan} ● AC ON</div>
                </div>
              ))}
              <div style={{
                gridColumn: "span 2", borderRadius: "10px",
                background: "rgba(0,220,180,0.04)", border: "1px solid rgba(0,220,180,0.1)",
                padding: "12px", textAlign: "center",
                fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em",
              }}>
                AUTO CLIMATE — AI OPTIMIZED
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        width: "18%", borderLeft: "1px solid rgba(255,255,255,0.05)",
        padding: "14px 12px", display: "flex", flexDirection: "column", gap: "12px",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}>QUICK ACCESS</div>
        {[
          { icon: "🔊", label: "Vol 72" },
          { icon: "❄️", label: "22°C" },
          { icon: "📍", label: "GPS" },
          { icon: "📱", label: "Phone" },
          { icon: "⚙️", label: "Settings" },
        ].map(item => (
          <div key={item.label} style={{
            padding: "8px", borderRadius: "8px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center", cursor: "pointer",
          }}>
            <div style={{ fontSize: "14px", marginBottom: "2px" }}>{item.icon}</div>
            <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>{item.label}</div>
          </div>
        ))}
        <div style={{ marginTop: "auto", textAlign: "center" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#00dcb4", boxShadow: "0 0 8px #00dcb4",
            margin: "0 auto 4px",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <div style={{ fontSize: "7px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>VELOX LIVE</div>
        </div>
      </div>
    </div>
  );
};

// ── Sections content ────────────────────────────────────────────────────────

const SectionVision = () => (
  <div>
    <SectionHeader number="01" title="OS Vision & Philosophy" subtitle="Naming the feeling before naming the product" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "32px" }}>
      {[
        { name: "VELOX", meaning: "Latin for 'fast, swift'", why: "Primal. Memorable. Global." },
        { name: "MERIDIAN", meaning: "Peak of the sky", why: "Premium positioning, timeless." },
        { name: "KIRA OS", meaning: "'Shining' in Japanese", why: "Aesthetic, aspirational." },
      ].map(n => (
        <Card key={n.name} accent={n.name === "VELOX"} glow={n.name === "VELOX"}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: n.name === "VELOX" ? "#00dcb4" : "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", marginBottom: "6px" }}>{n.name}</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: "8px" }}>{n.meaning}</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{n.why}</div>
          {n.name === "VELOX" && <div style={{ marginTop: "10px", fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>★ RECOMMENDED</div>}
        </Card>
      ))}
    </div>

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "16px" }}>Brand Philosophy: "Motion as Emotion"</h3>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: "1.8", margin: "0 0 16px 0" }}>
        VELOX is not software. It is the <Highlight>emotional architecture of movement</Highlight>. Every pixel drawn, every animation eased, every sound played exists for a single purpose: to make the driver feel that they are piloting something genuinely extraordinary. Not a $200 Android stereo. Not a patched Linux distro with a car skin. A <Highlight>living, breathing cockpit</Highlight> that responds to the driver's world.
      </p>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: "1.8", margin: 0 }}>
        Apple's philosophy is "technology for humans." Tesla's is "software-defined car." VELOX's philosophy is: <Highlight>"The journey is the product."</Highlight> Every commute should feel cinematic. Every road trip should feel epic. Every red light should feel like a moment of possibility.
      </p>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Why Users Would Switch</h4>
        {[
          "Android Auto feels like a borrowed app, not a cockpit",
          "CarPlay is brilliant — but locked to Apple hardware forever",
          "OEM systems are slow, ugly, and never get updated",
          "VELOX is the first system that LEARNS you",
          "Zero-lag touch that matches $1,500 flagship phones",
          "Cinematic UI that makes the whole car feel premium",
        ].map(r => (
          <div key={r} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#00dcb4", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>→</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: "1.5" }}>{r}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Why Manufacturers Would Adopt</h4>
        {[
          "Faster time-to-market than building OEM software in-house",
          "Revenue share from the VELOX App Store",
          "OTA updates that make their cars feel better over time",
          "Massive driver data insights (privacy-respecting)",
          "Strong brand halo: 'Powered by VELOX'",
          "SDK reduces their software R&D costs by 60–80%",
        ].map(r => (
          <div key={r} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#00dcb4", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>→</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: "1.5" }}>{r}</span>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const SectionArchitecture = () => (
  <div>
    <SectionHeader number="02" title="Core Technical Architecture" subtitle="Building the kernel of automotive luxury" />

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>Kernel Decision: Hybrid Microkernel over AOSP</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 14px 0" }}>
        Pure Linux monolithic kernel is fast but fragile — a single driver fault can crash the system. Pure microkernel (QNX-style) is ultra-reliable but slow. VELOX uses a <Highlight>hybrid architecture</Highlight>: a hardened Linux 6.x real-time kernel (PREEMPT_RT) as the base, with safety-critical processes isolated in a <Highlight>Type-1 hypervisor partition</Highlight> (seL4 or Xen). The UI stack lives in a separate, restartable VM — so if the launcher crashes, the speedometer still works.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {["Linux 6.x PREEMPT_RT", "seL4 Hypervisor", "AOSP Compatibility Layer", "Custom HAL", "Wayland Compositor", "Vulkan 1.3", "HIDL/AIDL Bridge"].map(c => <Chip key={c} accent>{c}</Chip>)}
      </div>
    </Card>

    {/* Architecture diagram */}
    <div style={{
      position: "relative", height: "300px", marginBottom: "24px",
      background: "rgba(0,0,0,0.3)", borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,220,180,0.03) 0%, transparent 70%)" }} />
      <ArchNode label="VELOX UI" sub="React Native / Skia" x="50%" y="18%" accent />
      <ArchNode label="AI Engine" sub="On-device LLM" x="20%" y="38%" />
      <ArchNode label="Media Stack" sub="Dolby / DTS" x="80%" y="38%" />
      <ArchNode label="Compositor" sub="Wayland/Vulkan" x="50%" y="52%" accent />
      <ArchNode label="HAL" sub="Hardware Abstraction" x="50%" y="70%" />
      <ArchNode label="CAN Bus" sub="Vehicle Network" x="25%" y="85%" />
      <ArchNode label="Linux RT Kernel" sub="PREEMPT_RT 6.x" x="75%" y="85%" accent />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[
          ["50%","22%","50%","48%"],
          ["50%","48%","50%","66%"],
          ["50%","66%","50%","81%"],
          ["32%","85%","48%","72%"],
          ["72%","85%","52%","72%"],
          ["24%","42%","44%","50%"],
          ["76%","42%","56%","50%"],
        ].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(0,220,180,0.2)" strokeWidth="1" strokeDasharray="3,3" />
        ))}
      </svg>
      <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>
        VELOX LAYERED ARCHITECTURE
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Rendering Pipeline</h4>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", margin: "0 0 12px 0" }}>
          VELOX uses a <Highlight>triple-buffered Vulkan 1.3 rendering pipeline</Highlight> with a custom scene graph engine inspired by Flutter's Impeller and React Native Skia. The compositor runs at a locked <Highlight>120Hz</Highlight> with adaptive sync. All UI elements are pre-compiled into GPU shaders at boot — zero JIT stutter ever.
        </p>
        <StatBar label="RENDER LATENCY TARGET" value={2} color="#00dcb4" />
        <StatBar label="GPU UTILIZATION (IDLE)" value={8} color="#00b4a0" />
        <StatBar label="FRAME DROP BUDGET" value={0} color="#ff4a4a" />
      </Card>
      <Card>
        <h4 style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.8);font-family:'Syne',sans-serif;margin-top:0;margin-bottom:12px;">Memory Architecture</h4>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", margin: "0 0 12px 0" }}>
          VELOX employs <Highlight>zRAM compression</Highlight> (LZ4 algorithm, 4:1 ratio on typical UI data) + <Highlight>predictive memory preloading</Highlight>. Apps the driver commonly uses at this time-of-day are preloaded into RAM 90 seconds before the car starts. Cold-launch latency for the top 3 apps: <Highlight>&lt;40ms</Highlight>.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {["zRAM LZ4", "Predictive Preload", "SWAP on UFS 3.1", "Jemalloc", "Memory Pressure Daemon"].map(c => <Chip key={c}>{c}</Chip>)}
        </div>
      </Card>
    </div>
  </div>
);

const SectionUX = () => (
  <div>
    <SectionHeader number="03" title="User Experience Design" subtitle="Every millisecond is a design decision" />

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>Motion Language: "Elastic Gravity"</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 14px 0" }}>
        VELOX defines a proprietary motion system called <Highlight>Elastic Gravity</Highlight>. All animations obey a single physics model: objects have mass, velocity, and spring tension. A card swipe doesn't just move — it <Highlight>resists, then releases, then settles</Highlight> with a micro-bounce that costs only 2 frames but signals physical reality to the brain. This is the same trick Apple uses in iOS scroll rubber-banding. We apply it to every interactive element.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
        {[
          { name: "Spring Curve", value: "0.34, 1.56, 0.64, 1.0", label: "Cubic Bezier" },
          { name: "Touch Response", value: "<8ms", label: "Input-to-pixel" },
          { name: "Screen Transition", value: "280ms", label: "Page swap" },
          { name: "Haptic Sync", value: "±2ms", label: "With animation" },
        ].map(m => (
          <div key={m.name} style={{
            background: "rgba(0,0,0,0.3)", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.06)", padding: "12px", textAlign: "center",
          }}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", marginBottom: "6px" }}>{m.name}</div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#00dcb4", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>{m.value}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>{m.label}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Visual Design System</h4>
        {[
          { label: "Depth System", desc: "7-layer translucency stack — foreground chrome, mid content, background blur, ambient color, shadow fill, glow, base" },
          { label: "Typography", desc: "Display: 'Clash Display Variable' — geometric, authoritative. Body: 'DM Mono' — legible at 130km/h glances. UI: 'Syne' — neutral warmth" },
          { label: "Color Logic", desc: "Single accent color per driver profile (default: #00DCB4 teal). Muted obsidian backgrounds. Never white backgrounds — always darkened to reduce eye strain at night" },
          { label: "Icon Language", desc: "Geometric, hairline-weight, always perfectly pixel-aligned. Icons are never decorative — they are signifiers with sub-200ms recognition time" },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "4px" }}>{item.label}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6" }}>{item.desc}</div>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Driving Modes</h4>
        {[
          { mode: "FOCUS", desc: "Minimal UI. Only speed, nav turn, and music. No notifications. Auto-activates at highway speeds." },
          { mode: "AMBIENT", desc: "Parked or traffic. Full dashboard with widgets, AI suggestions, and environmental display." },
          { mode: "NIGHT", desc: "OLED-optimized blacks. Amber-shifted accent colors to protect night vision. Auto from sunset." },
          { mode: "SPORT", desc: "Red accents. G-force meter. Lap timer. Performance telemetry overlay. Engine data prominence." },
        ].map(item => (
          <div key={item.mode} style={{
            marginBottom: "12px", padding: "10px",
            background: "rgba(0,0,0,0.2)", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", marginBottom: "4px" }}>{item.mode} MODE</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5" }}>{item.desc}</div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const SectionSmoothness = () => (
  <div>
    <SectionHeader number="04" title="Apple-Level Smoothness Engineering" subtitle="Zero-jank is not aspirational — it is the contract" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      {[
        { metric: "Touch Latency", target: "< 8ms", how: "Touchscreen driver patched to bypass Linux input stack. Direct Wayland event injection." },
        { metric: "Frame Time", target: "8.33ms", how: "120Hz locked. Frame scheduler runs at SCHED_FIFO priority 99. Never preempted by userspace." },
        { metric: "Boot to UI", target: "< 3.2s", how: "Initramfs with compressed Squashfs. UI process started before kernel finishes booting remaining services." },
      ].map(m => (
        <Card key={m.metric} accent>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: "6px" }}>{m.metric.toUpperCase()}</div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{m.target}</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{m.how}</div>
        </Card>
      ))}
    </div>

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "16px" }}>The VELOX Zero-Jank Stack</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {[
          {
            title: "Scheduler Optimization",
            body: "UI thread pinned to Performance cores (P-cores) on all SoCs. Background services (OTA, sync, analytics) confined to Efficiency cores (E-cores). No priority inversions possible — all locks in the render path are reader-writer with POSIX priority inheritance. The scheduler uses a custom EAS (Energy Aware Scheduling) profile tuned for automotive duty cycles.",
          },
          {
            title: "Shader & Pipeline Precompilation",
            body: "Every UI transition, every animation, every widget state is compiled to Vulkan SPIR-V shaders at OS install time. Zero runtime shader compilation — the cause of 90% of 'first-launch jank' in Android. VELOX uses a background daemon to warm up shader caches for newly installed apps before the user first launches them.",
          },
          {
            title: "Predictive Rendering",
            body: "VELOX's AI watches driver patterns and pre-renders the next likely screen 80ms before the user taps. Confidence threshold: >70%. If the prediction is wrong, the speculative render is discarded in <1ms. If right: zero perceived latency. This is inspired by Google's prefetching but applied to UI state rather than web pages.",
          },
          {
            title: "Thermal Management",
            body: "Most cheap Android stereos throttle to 60% CPU within 20 minutes of use in summer. VELOX integrates with the vehicle's HVAC system — requesting minor increases in cabin airflow directed at the head unit when CPU temps approach 75°C. Software-side: thermal-aware frame scheduling that drops background tasks first, never the render thread.",
          },
        ].map(item => (
          <div key={item.title}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{item.title}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{item.body}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: "16px" }}>PERFORMANCE TARGETS vs COMPETITION</div>
      <StatBar label="VELOX — Touch-to-Pixel" value={99} color="#00dcb4" />
      <StatBar label="Android Auto (Pixel 8)" value={82} color="#4a9eff" />
      <StatBar label="CarPlay (iPhone 15)" value={88} color="#4affcc" />
      <StatBar label="Typical OEM System" value={45} color="#ff6b4a" />
      <StatBar label="Cheap Android Stereo" value={22} color="#ff4a4a" />
    </div>
  </div>
);

const SectionAI = () => (
  <div>
    <SectionHeader number="05" title="AI-Native Vehicle Experience" subtitle="Not ChatGPT in a car. A co-pilot that learns you." />

    <Card accent glow style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>AETHER — The VELOX AI Engine</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.8", margin: "0 0 14px 0" }}>
        AETHER is a <Highlight>3-tier AI architecture</Highlight>: a 1.3B parameter on-device LLM (quantized to INT4, running on NPU at 40 tokens/sec) handles real-time voice, context, and personalization. A 7B cloud model handles complex reasoning, route planning, and summarization when connected. A third, ultra-thin 50M parameter <Highlight>reflex model</Highlight> handles sub-50ms reactions: music skip, climate nudge, gesture recognition — always on, never waiting.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
        {[
          { name: "AETHER Reflex", size: "50M params", latency: "<50ms", role: "Instant reactions" },
          { name: "AETHER Core", size: "1.3B params", latency: "<200ms", role: "On-device LLM" },
          { name: "AETHER Cloud", size: "7B params", latency: "<800ms", role: "Deep reasoning" },
        ].map(m => (
          <div key={m.name} style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(0,220,180,0.15)", padding: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#00dcb4", marginBottom: "6px" }}>{m.name}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>{m.size} · {m.latency}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{m.role}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>What AETHER Does</h4>
        {[
          "Learns your commute routes and pre-loads them Monday morning",
          "Detects driver fatigue via steering micro-corrections + eye tracking (optional camera)",
          "Dynamically adjusts music BPM to match driving speed and heart rate",
          "Summarizes missed calls and messages at red lights — never while moving",
          "Suggests fuel/charging stops based on range, current traffic, and your schedule",
          "Adapts climate zone by zone based on sunlight angle and passenger preferences",
          "Learns your 'morning mood' from calendar and music history — sets ambient accordingly",
          "Understands complex commands: 'Play something chill but not too slow, I'm tired'",
        ].map(r => (
          <div key={r} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#00dcb4", fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>⟁</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: "1.5" }}>{r}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Privacy Architecture</h4>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7", marginBottom: "12px" }}>
          All personalization data stays <Highlight>on-device by default</Highlight>. The on-device model is trained via federated learning — Anthropic-style RLHF without raw data ever leaving the vehicle. Cloud model access requires explicit per-session consent.
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7", marginBottom: "12px" }}>
          Voice audio is processed in a <Highlight>sandboxed secure enclave</Highlight> (ARM TrustZone). Raw audio is never stored — only intent vectors. The microphone has a hardware kill switch physically disconnecting the circuit when the driver engages Privacy Mode.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "8px" }}>
          {["On-Device First", "Federated Learning", "ARM TrustZone", "HW Mic Kill", "Zero Raw Audio Storage"].map(c => <Chip key={c} accent>{c}</Chip>)}
        </div>
      </Card>
    </div>
  </div>
);

const SectionAudio = () => (
  <div>
    <SectionHeader number="06" title="Audio & Visual Experience" subtitle="When the car starts, the world should feel different" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card accent glow>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Startup Sequence — "The Awakening"</h4>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", marginBottom: "12px" }}>
          Duration: <Highlight>2.8 seconds</Highlight>. The sequence is a masterwork of restraint. The screen fades from black. A single point of light — the VELOX glyph — expands outward in a fluid Bézier bloom (not a burst, a breath). The ambient lighting in the car syncs to this — strips pulsing from the center console outward. Then: silence for 0.4s. Then the UI materializes panel by panel, each with a 40ms stagger.
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
          The startup sound: <Highlight>custom-designed with Hans Zimmer's team</Highlight> methodology. A sub-bass resonance at 60Hz (felt in the seat), rising to a clear 2kHz harmonic tone, then a spatial decay through the surround system. Total duration: 1.8s. It communicates: power, precision, serenity.
        </p>
      </Card>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Spatial Audio Engine</h4>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", marginBottom: "12px" }}>
          VELOX includes a <Highlight>real-time acoustic modeling engine</Highlight> that maps the car's interior as a 3D acoustic space. Speaker positions, headrest distance, window reflection coefficients — all parameterized per vehicle profile. Navigation voice comes from directly ahead (like a passenger speaking). Alerts come from directionally relevant speakers (left-side lane departure = left speaker).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {["HRTF Processing", "Dolby Atmos Car", "Per-Vehicle EQ Profile", "Binaural Alerts", "AI Loudness Adaptation"].map(c => <Chip key={c}>{c}</Chip>)}
        </div>
      </Card>
    </div>

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>UI Sound Design Philosophy</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[
          { action: "Tap", sound: "4ms micro-click, 800Hz with 8ms decay. Satisfying but never distracting." },
          { action: "Swipe", sound: "Velocity-matched whoosh. Faster swipe = higher pitch, shorter decay." },
          { action: "Error", sound: "Two-tone descending. Never harsh. 'Gentle correction' rather than alarm." },
          { action: "Success", sound: "Single ascending chime, 1200Hz, 60ms. Warm, not clinical." },
        ].map(s => (
          <div key={s.action} style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "12px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: "6px" }}>{s.action.toUpperCase()}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{s.sound}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const SectionHardware = () => (
  <div>
    <SectionHeader number="07" title="Hardware Strategy" subtitle="Premium experience on real-world silicon" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      {[
        { tier: "VELOX SE", target: "Aftermarket / Budget", chip: "Snapdragon 6 Gen 2 / T616", ram: "6GB LPDDR4X", storage: "64GB UFS 2.2", display: "60–90Hz IPS", price: "$80–150 HW target" },
        { tier: "VELOX", target: "Mid OEM / Premium After", chip: "Snapdragon 8cx Gen 3 / A523", ram: "8GB LPDDR5", storage: "128GB UFS 3.1", display: "120Hz AMOLED", price: "$200–400 HW target" },
        { tier: "VELOX PRO", target: "Luxury OEM / EV", chip: "Snapdragon Cockpit Elite", ram: "16GB LPDDR5X", storage: "256GB UFS 4.0", display: "144Hz LTPO OLED", price: "$600–1200 HW target" },
      ].map(t => (
        <Card key={t.tier} accent={t.tier === "VELOX"}>
          <div style={{ fontSize: "12px", fontWeight: "800", color: t.tier === "VELOX" ? "#00dcb4" : "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", marginBottom: "4px" }}>{t.tier}</div>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", marginBottom: "12px" }}>{t.target}</div>
          {[["SoC", t.chip], ["RAM", t.ram], ["Storage", t.storage], ["Display", t.display], ["Price", t.price]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>{k}</span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono', monospace", textAlign: "right", maxWidth: "55%" }}>{v}</span>
            </div>
          ))}
        </Card>
      ))}
    </div>

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>Making Budget Hardware Feel Premium</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 14px 0" }}>
        The $150 aftermarket head unit runs on a T616 (Mali-G57 GPU). Most ROMS make this feel sluggish. VELOX's approach: <Highlight>aggressively downscale the render resolution to 720p internally</Highlight>, then upscale via a custom ML super-resolution shader (4-tap bilinear + edge-aware sharpening). The user sees sharp output; the GPU renders at half the pixel count. Combined with frame interpolation for 60→90Hz, the experience is indistinguishable from native 90Hz rendering at full resolution.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {["ML Super-Resolution", "Frame Interpolation", "Adaptive Quality", "GPU-Aware Compositor", "Shader LOD System", "Tile Rendering"].map(c => <Chip key={c} accent>{c}</Chip>)}
      </div>
    </Card>
  </div>
);

const SectionEcosystem = () => (
  <div>
    <SectionHeader number="08" title="App Ecosystem" subtitle="The platform that developers actually want to build for" />

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>The VELOX SDK — "Drive Kit"</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 14px 0" }}>
        Drive Kit is built on <Highlight>React Native with a custom Skia renderer</Highlight> — the fastest cross-platform UI toolkit available. Developers write once, deploy on all VELOX tiers. The SDK enforces the VELOX Design Language System automatically — it's impossible to build a bad-looking app. Safety APIs are enforced at compile time: <Highlight>any UI showing more than 2 interactive elements while the vehicle is in motion fails SDK validation</Highlight>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          {
            title: "Android App Support",
            body: "Via a containerized AOSP 14 compatibility layer — similar to how Amazon Fire OS runs Android apps, or how Samsung DeX runs Android on desktop. Apps run in a sandboxed VM, GPU-accelerated, but CANNOT access vehicle CAN bus, microphone, or location without explicit Drive Kit permission grants. The container auto-adapts apps to VELOX design language where possible.",
          },
          {
            title: "Native Drive Kit Apps",
            body: "First-class citizens. Full access to AETHER AI APIs, CAN bus telemetry, ambient lighting control, haptic actuators, spatial audio. Revenue split: 70/30 (developer/VELOX) — same as App Store. Subscriptions: 85/15 after year 1. Drive Kit apps are the only apps permitted to show real-time driving data, navigation overlays, or modify climate.",
          },
        ].map(item => (
          <div key={item.title}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#00dcb4", marginBottom: "8px", fontFamily: "'Syne', sans-serif" }}>{item.title}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{item.body}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      {[
        { name: "VELOX Store", desc: "Curated. Every app reviewed by a Drive Safety team. No sideloading on OEM builds. Aftermarket builds: user toggle." },
        { name: "Fleet Console", desc: "B2B portal for logistics companies. Mass OTA, telemetry dashboards, driver behavior analytics." },
        { name: "VELOX Analytics", desc: "Aggregate, anonymized driving insights sold to city planners, insurance companies, map providers. Major revenue stream." },
      ].map(s => (
        <Card key={s.name}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{s.name}</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6" }}>{s.desc}</div>
        </Card>
      ))}
    </div>
  </div>
);

const SectionSecurity = () => (
  <div>
    <SectionHeader number="09" title="Automotive Security" subtitle="The attack surface is the entire vehicle" />

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>Threat Model</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 16px 0" }}>
        Unlike phone OS security, VELOX must protect not just data, but <Highlight>physical safety</Highlight>. A compromised phone loses your photos. A compromised car OS could unlock doors, disable brakes, or feed false navigation data. The security model is designed under <Highlight>ISO 21434 (Automotive Cybersecurity)</Highlight> and UNECE WP.29 regulations.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          {
            title: "Secure Boot Chain",
            items: ["Hardware root of trust (ARM TrustZone / TPM 2.0)", "Bootloader signed with OEM key, verified by VELOX cert authority", "Each kernel module verified against signed manifest", "UI process launches only after full chain validation", "Rollback protection: downgrade attacks blocked at hardware level"],
          },
          {
            title: "CAN Bus Protection",
            items: ["CAN traffic filtered through a dedicated security MCU before reaching infotainment", "Message authentication codes (MACs) on all safety-critical CAN frames", "Infotainment can READ vehicle data but never WRITE to safety ECUs", "Anomaly detection: ML model flags unusual CAN message patterns in real-time", "Physical isolation: infotainment SoC on separate CAN segment from powertrain"],
          },
        ].map(section => (
          <div key={section.title}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "10px" }}>{section.title}</div>
            {section.items.map(item => (
              <div key={item} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
                <span style={{ color: "#00dcb4", fontSize: "8px", marginTop: "4px", flexShrink: 0 }}>■</span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5" }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>

    <Card accent>
      <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "10px" }}>OTA Security</h4>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", margin: 0 }}>
        Updates are delivered via <Highlight>delta compression</Highlight> (BSDiff algorithm, typically 40–200MB per update vs full image). Each update package is signed with a 3-key ceremony (hardware security modules in a secure facility, requires 2-of-3 key holders to sign). Updates are applied to a <Highlight>B partition</Highlight> while the A partition runs — instant rollback if the new build fails health checks. Zero-downtime updates: the car can update while parked and charging, activating on next ignition.
      </p>
    </Card>
  </div>
);

const SectionBusiness = () => (
  <div>
    <SectionHeader number="10" title="Business & Company Strategy" subtitle="Building the Apple of automotive software" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      {[
        { stream: "OEM Licensing", model: "$8–25/unit royalty per vehicle shipped with VELOX. At 500K units/year: $4–12.5M ARR", growth: "High" },
        { stream: "App Store", model: "30% cut on paid apps, 15% on subscriptions after year 1. At 1M MAU, 5% paid: ~$3M ARR at $20 avg app spend", growth: "Compounding" },
        { stream: "VELOX+ Subscription", model: "$4.99/month for cloud AI, traffic, streaming integration, premium maps. 20% attach rate = $12M ARR at 1M vehicles", growth: "Recurring" },
        { stream: "Fleet B2B", model: "SaaS pricing for logistics/rental companies. $30/vehicle/month for Fleet Console. 10K vehicles = $3.6M ARR", growth: "High Margin" },
        { stream: "Data Insights", model: "Anonymized aggregate driving data to insurers, municipalities, map providers. Privacy-first. $2–5M ARR at scale", growth: "Passive" },
        { stream: "Aftermarket Retail", model: "VELOX-certified hardware sold through AutoZone, Amazon, Costco. $40 margin per unit. Brand building + margin", growth: "Volume" },
      ].map(s => (
        <Card key={s.stream}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginBottom: "6px" }}>{s.stream}</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6", marginBottom: "8px" }}>{s.model}</div>
          <Chip accent>{s.growth}</Chip>
        </Card>
      ))}
    </div>

    <Card style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>Go-To-Market: The Trojan Horse Strategy</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", margin: "0 0 12px 0" }}>
        Phase 1: Dominate the aftermarket. There are <Highlight>180 million Android-based aftermarket stereos</Highlight> sold globally per year, mostly running terrible, unupdated ROMs. VELOX enters here — free OS, monetize through subscriptions and app store. This builds the user base, the brand, and the developer ecosystem. Phase 2: OEM negotiations backed by <Highlight>proven user love metrics</Highlight>. Phase 3: <Highlight>VELOX Inside</Highlight> — the "Intel Inside" of automotive software.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {["180M Aftermarket Stereos/year", "62% use outdated Android 9 or earlier", "No dominant aftermarket OS brand exists today", "App Store has no automotive category leader"].map(f => (
          <Tag key={f}>{f}</Tag>
        ))}
      </div>
    </Card>
  </div>
);

const SectionRoadmap = () => (
  <div>
    <SectionHeader number="11" title="10-Year Future Roadmap" subtitle="From infotainment OS to the nervous system of transportation" />

    <div style={{ position: "relative", marginBottom: "32px" }}>
      <div style={{ position: "absolute", left: "50%", top: "20px", bottom: "20px", width: "1px", background: "rgba(0,220,180,0.15)", transform: "translateX(-50%)" }} />
      {[
        { year: "2025–2026", side: "left", title: "VELOX 1.0 — Aftermarket Launch", points: ["Snapdragon 6 Gen 2 / T616 support", "Core OS: maps, music, climate, AI voice", "Drive Kit SDK beta", "VELOX Store launch with 50+ curated apps", "OTA infrastructure v1"] },
        { year: "2027", side: "right", title: "VELOX 2.0 — OEM Partnerships", points: ["First OEM integration (Tier-2 manufacturer)", "VELOX Pro hardware reference design", "AETHER AI v2 — full on-device LLM", "Android app compatibility layer", "Spatial audio engine"] },
        { year: "2028–2029", side: "left", title: "VELOX 3.0 — Ecosystem Scale", points: ["10M+ active vehicles", "VELOX+ subscription at $4.99/mo", "V2X (vehicle-to-infrastructure) integration", "AR navigation overlay (HUD partnership)", "Autonomous driving UI framework"] },
        { year: "2030–2031", side: "right", title: "VELOX 4.0 — Autonomous Era", points: ["Full Level 3 autonomy UI paradigm", "Cabin transforms: driver becomes passenger", "Holographic interaction research", "Cross-vehicle fleet intelligence", "Smart city data partnerships"] },
        { year: "2032–2035", side: "left", title: "VELOX 5.0 — Platform Dominance", points: ["30M+ active vehicles", "$5B+ revenue", "VELOX Neural: brain-computer interface research", "AR windshield OS layer", "Vehicle OS becomes the 4th major computing platform after PC, Mobile, Cloud"] },
      ].map((item, i) => (
        <div key={item.year} style={{
          display: "flex", marginBottom: "32px",
          flexDirection: item.side === "right" ? "row-reverse" : "row",
          alignItems: "flex-start", gap: "20px",
        }}>
          <div style={{ flex: "0 0 calc(50% - 20px)" }}>
            <Card accent={i === 0}>
              <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", marginBottom: "6px" }}>{item.year}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.85)", fontFamily: "'Syne', sans-serif", marginBottom: "10px" }}>{item.title}</div>
              {item.points.map(p => (
                <div key={p} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#00dcb4", fontSize: "8px", marginTop: "3px", flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5" }}>{p}</span>
                </div>
              ))}
            </Card>
          </div>
          <div style={{
            flex: "0 0 40px", display: "flex", justifyContent: "center", paddingTop: "16px",
          }}>
            <div style={{
              width: "12px", height: "12px", borderRadius: "50%",
              background: i === 0 ? "#00dcb4" : "rgba(0,220,180,0.3)",
              border: `2px solid ${i === 0 ? "#00dcb4" : "rgba(0,220,180,0.4)"}`,
              boxShadow: i === 0 ? "0 0 12px #00dcb4" : "none",
              flexShrink: 0,
            }} />
          </div>
          <div style={{ flex: "0 0 calc(50% - 20px)" }} />
        </div>
      ))}
    </div>
  </div>
);

const SectionExecution = () => (
  <div>
    <SectionHeader number="12" title="Execution Plan" subtitle="What to build first, with whom, for how much" />

    <Card accent glow style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#00dcb4", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "14px" }}>MVP Scope — 12 Months, $2.4M</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.8", margin: "0 0 16px 0" }}>
        The MVP is not a showcase — it's a <Highlight>daily driver that replaces Android ROMs</Highlight> on the 3 most popular aftermarket stereo chipsets (T616, Snapdragon 665, RK3566). It must be smoother than what users have, prettier than anything available, and stable enough to not crash on a road trip. Nothing else matters at MVP.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        {[
          { phase: "M1–M3", title: "Core OS & HAL", tasks: "Linux RT kernel build · Wayland compositor · Touch driver optimizations · UI design system · 3 chipset HALs" },
          { phase: "M4–M7", title: "App Shell + AI", tasks: "Navigation (offline maps) · Music player · AETHER voice (50M reflex model) · Climate UI · OTA v1" },
          { phase: "M8–M12", title: "Polish + Launch", tasks: "Animation pass · Haptic system · Sound design · VELOX Store alpha · Community beta · Product launch" },
        ].map(p => (
          <div key={p.phase} style={{
            background: "rgba(0,0,0,0.3)", borderRadius: "8px",
            border: "1px solid rgba(0,220,180,0.15)", padding: "14px",
          }}>
            <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: "4px" }}>{p.phase}</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{p.title}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", lineHeight: "1.6", fontFamily: "'DM Mono', monospace" }}>{p.tasks}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Founding Team Requirements</h4>
        {[
          ["Kernel Engineer", "Linux RT, PREEMPT_RT, HAL experience — $180K"],
          ["GPU / Graphics Engineer", "Vulkan, Wayland, compositors — $190K"],
          ["AI/ML Engineer", "Edge LLM, quantization, NPU — $185K"],
          ["Automotive HMI Designer", "UX + motion design, in-car exp — $140K"],
          ["React Native / Skia Dev", "Drive Kit SDK lead — $160K"],
          ["Automotive Security", "ISO 21434, CAN bus, TrustZone — $175K"],
          ["Product Manager", "Automotive + consumer OS experience — $150K"],
          ["CTO / Architect", "OS-level, automotive domain — $220K equity-heavy"],
        ].map(([role, comp]) => (
          <div key={role} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{role}</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", textAlign: "right", flexShrink: 0 }}>{comp}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", fontFamily: "'Syne', sans-serif", marginTop: 0, marginBottom: "12px" }}>Budget Breakdown — Seed Round $4M</h4>
        {[
          ["Team (12 months)", "$2.4M", 60],
          ["Hardware / Lab", "$300K", 7.5],
          ["Cloud infra (OTA, AI)", "$200K", 5],
          ["Legal / Compliance (ISO 21434)", "$150K", 3.75],
          ["Design & UX research", "$120K", 3],
          ["Marketing / Community", "$180K", 4.5],
          ["Buffer / Runway", "$650K", 16.25],
        ].map(([item, amount, pct]) => (
          <div key={item} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{item}</span>
              <span style={{ fontSize: "10px", color: "#00dcb4", fontFamily: "'DM Mono', monospace" }}>{amount}</span>
            </div>
            <div style={{ height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "rgba(0,220,180,0.5)", borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </Card>
    </div>

    <Card style={{ textAlign: "center", padding: "32px" }}>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", marginBottom: "12px" }}>THE NORTH STAR</div>
      <h3 style={{
        fontSize: "clamp(20px, 3vw, 30px)", fontWeight: "800",
        fontFamily: "'Syne', sans-serif",
        background: "linear-gradient(135deg, #ffffff 0%, #00dcb4 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        margin: "0 0 16px 0",
      }}>
        "When someone gets in a car with VELOX, they feel it before they see it."
      </h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto" }}>
        That is the product. Not the feature list. Not the spec sheet. The moment a driver touches the screen and something responds — instantly, beautifully, intelligently — and they think: <em style={{ color: "rgba(255,255,255,0.55)" }}>"I don't want any other car to not have this."</em>
      </p>
    </Card>
  </div>
);

const sectionComponents = {
  vision: SectionVision,
  architecture: SectionArchitecture,
  ux: SectionUX,
  smoothness: SectionSmoothness,
  ai: SectionAI,
  audio: SectionAudio,
  hardware: SectionHardware,
  ecosystem: SectionEcosystem,
  security: SectionSecurity,
  business: SectionBusiness,
  roadmap: SectionRoadmap,
  execution: SectionExecution,
};

export default function VeloxOS() {
  const [active, setActive] = useState("vision");
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 20);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  const ActiveSection = sectionComponents[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #040810; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(0,220,180,0.25); border-radius: 2px; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      <div style={{
        display: "flex", height: "100vh", width: "100%",
        background: "#040810",
        fontFamily: "'Syne', sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}>
        {/* Sidebar */}
        <div style={{
          width: "200px", flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
          background: "rgba(0,0,0,0.4)",
          padding: "0",
          overflow: "hidden",
        }}>
          {/* Logo */}
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{
              fontSize: "16px", fontWeight: "800", letterSpacing: "0.08em",
              color: "#00dcb4", fontFamily: "'Syne', sans-serif",
            }}>VELOX OS</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", marginTop: "2px" }}>DESIGN BLUEPRINT v1.0</div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                width: "100%", padding: "9px 16px",
                background: active === s.id ? "rgba(0,220,180,0.08)" : "none",
                border: "none",
                borderLeft: `2px solid ${active === s.id ? "#00dcb4" : "transparent"}`,
                cursor: "pointer", textAlign: "left",
                display: "flex", alignItems: "center", gap: "10px",
                transition: "all 0.15s ease",
              }}>
                <span style={{ fontSize: "11px", color: active === s.id ? "#00dcb4" : "rgba(255,255,255,0.2)", width: "14px", textAlign: "center" }}>{s.icon}</span>
                <span style={{
                  fontSize: "11px", fontFamily: "'DM Mono', monospace",
                  color: active === s.id ? "#ffffff" : "rgba(255,255,255,0.3)",
                  letterSpacing: "0.04em",
                }}>{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom tag */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.15)", fontFamily: "'DM Mono', monospace", lineHeight: "1.6" }}>
              Built for founders,<br />engineers & visionaries.
            </div>
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} style={{
          flex: 1, overflowY: "auto", position: "relative",
        }}>
          {/* Ambient bg */}
          <div style={{
            position: "fixed", top: 0, left: "200px", right: 0, bottom: 0,
            background: "radial-gradient(ellipse at 70% 20%, rgba(0,220,180,0.04) 0%, transparent 50%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Header */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            padding: "12px 40px",
            background: scrolled ? "rgba(4,8,16,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            transition: "all 0.3s ease",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
              {sections.find(s => s.id === active)?.label}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {["vision","architecture","ux","smoothness","ai"].map(s => (
                <div key={s} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: s === active ? "#00dcb4" : "rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  boxShadow: s === active ? "0 0 6px #00dcb4" : "none",
                }} onClick={() => setActive(s)} />
              ))}
            </div>
          </div>

          {/* VELOX UI Demo */}
          {active === "vision" && (
            <div style={{ padding: "0 40px 24px", position: "relative", zIndex: 1 }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "9px", color: "#00dcb4", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", marginBottom: "8px" }}>INTERACTIVE UI PREVIEW</div>
                <MockUI />
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", marginTop: "8px", textAlign: "center" }}>
                  Click tabs above to explore the VELOX interface concept
                </div>
              </div>
            </div>
          )}

          {/* Section content */}
          <div style={{
            padding: "0 40px 60px",
            position: "relative", zIndex: 1,
            animation: "fadeSlide 0.3s ease both",
            key: active,
          }}>
            <ActiveSection />
          </div>
        </div>
      </div>
    </>
  );
}
