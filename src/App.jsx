import { useState, useEffect, useRef } from "react";

// ── GOOGLE FONTS ──
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap";
document.head.appendChild(fontLink);

// ── LEAFLET ──
const leafletCSS = document.createElement("link");
leafletCSS.rel = "stylesheet";
leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
document.head.appendChild(leafletCSS);
const leafletScript = document.createElement("script");
leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
document.head.appendChild(leafletScript);

// ── GLOBAL STYLES ──
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');
  :root {
    --navy:#08121F;--navy2:#0D1B2E;--navy3:#122240;--navy4:#1A2F4A;
    --gold:#E8B84B;--gold2:#F5CF7A;--gold3:#FFF3C4;
    --red:#D64045;--blue:#1A6FC4;--blue2:#2486E0;
    --green:#1B8A5A;--green2:#22A86E;
    --orange:#D9622B;--purple:#7B3FA0;
    --white:#F0EBE1;--gray1:#D8D2C6;--gray2:#9A9488;--gray3:#5C5850;
    --success:#22A86E;--warn:#E8973A;--danger:#D64045;
    --font-head:'Clash Display',sans-serif;
    --font-body:'Cabinet Grotesk',sans-serif;
    --r:10px;--r-sm:6px;--shadow:0 8px 32px rgba(0,0,0,.4);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:var(--font-body);background:var(--navy);color:var(--white);overflow:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}
  .leaflet-container{background:#0D1B2E !important;}
  .leaflet-tile{filter:brightness(0.7) saturate(0.8);}
`;
document.head.appendChild(style);

// ── MOCK DATA ──
const PARTIES = [
  { id: 1, name: "Partido Pagbabago", color: "#1A6FC4" },
  { id: 2, name: "PDP-Laban", color: "#D64045" },
  { id: 3, name: "Nationalist Party", color: "#D9622B" },
  { id: 4, name: "Green Alliance", color: "#1B8A5A" },
  { id: 5, name: "Independent", color: "#9A9488" },
];

const AREAS = [
  {
    id: 1,
    name: "Lapu-Lapu City",
    type: "city",
    barangays: [
      {
        id: 1,
        name: "Pusok",
        sitios: ["Sitio Silangan", "Sitio Malinao", "Sitio Bagong Buhay"],
      },
      {
        id: 2,
        name: "Mactan",
        sitios: ["Sitio Ibabao", "Sitio Proper", "Sitio Crossing"],
      },
      {
        id: 3,
        name: "Agus",
        sitios: ["Sitio Upper", "Sitio Lower", "Sitio Centro"],
      },
      {
        id: 4,
        name: "Basak",
        sitios: ["Sitio Baybay", "Sitio Ilaya", "Sitio Punta"],
      },
      {
        id: 5,
        name: "Buaya",
        sitios: ["Sitio Proper", "Sitio Extension", "Sitio New"],
      },
      { id: 6, name: "Gun-ob", sitios: ["Sitio 1", "Sitio 2", "Sitio 3"] },
      {
        id: 7,
        name: "Pajo",
        sitios: ["Sitio North", "Sitio South", "Sitio Center"],
      },
      { id: 8, name: "Pajac", sitios: ["Sitio A", "Sitio B", "Sitio C"] },
      {
        id: 9,
        name: "Looc",
        sitios: ["Sitio Seaside", "Sitio Highland", "Sitio Midway"],
      },
      {
        id: 10,
        name: "Ibo",
        sitios: ["Sitio Proper", "Sitio New Area", "Sitio Old"],
      },
    ],
  },
];

const INIT_CANDIDATES = [
  {
    id: 1,
    name: "Carina Espinosa",
    position: "President",
    partyId: 1,
    color: "#1A6FC4",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 2,
    name: "Rodrigo Salcedo",
    position: "President",
    partyId: 2,
    color: "#D64045",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 3,
    name: "Lino Magsaysay",
    position: "President",
    partyId: 3,
    color: "#D9622B",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 4,
    name: "Elena Macaraeg",
    position: "President",
    partyId: 4,
    color: "#1B8A5A",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 5,
    name: "Juan dela Cruz",
    position: "Mayor",
    partyId: 1,
    color: "#1A6FC4",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 6,
    name: "Maria Santos",
    position: "Mayor",
    partyId: 2,
    color: "#D64045",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 7,
    name: "Pedro Reyes",
    position: "Mayor",
    partyId: 5,
    color: "#9A9488",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 8,
    name: "Ana Gonzales",
    position: "Vice Mayor",
    partyId: 1,
    color: "#1A6FC4",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 9,
    name: "Jose Villanueva",
    position: "Vice Mayor",
    partyId: 2,
    color: "#D64045",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 10,
    name: "Luz Mendoza",
    position: "Vice Mayor",
    partyId: 3,
    color: "#D9622B",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 11,
    name: "Roberto Cruz",
    position: "Congressman",
    partyId: 2,
    color: "#D64045",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
  {
    id: 12,
    name: "Carina Bautista",
    position: "Congressman",
    partyId: 1,
    color: "#1A6FC4",
    waves: [1, 2, 3, 4, 5],
    watched: false,
  },
];

const INIT_USERS = [
  {
    id: 1,
    name: "Super Admin",
    username: "superadmin",
    role: "Super Admin",
    barangay: "All",
    sitio: "All",
    submissions: 0,
    lastActive: "Today 2:14pm",
    status: "Active",
    requiresPwChange: false,
  },
  {
    id: 2,
    name: "Juanito Bautista",
    username: "jbautista",
    role: "Surveyor",
    barangay: "Pusok",
    sitio: "Sitio Silangan",
    submissions: 218,
    lastActive: "Today 1:02pm",
    status: "Active",
    requiresPwChange: false,
  },
  {
    id: 3,
    name: "Maricel Delos Reyes",
    username: "mdelosreyes",
    role: "Surveyor",
    barangay: "Mactan",
    sitio: "Sitio Proper",
    submissions: 193,
    lastActive: "Today 11:45am",
    status: "Active",
    requiresPwChange: false,
  },
  {
    id: 4,
    name: "Ramon Salazar",
    username: "rsalazar",
    role: "Surveyor",
    barangay: "Buaya",
    sitio: "Sitio Proper",
    submissions: 112,
    lastActive: "Yesterday 4:30pm",
    status: "Behind",
    requiresPwChange: false,
  },
  {
    id: 5,
    name: "Edwin Pacquiao",
    username: "epacquiao",
    role: "Surveyor",
    barangay: "Gun-ob",
    sitio: "Sitio 1",
    submissions: 68,
    lastActive: "2 days ago",
    status: "Inactive",
    requiresPwChange: false,
  },
  {
    id: 6,
    name: "Teresita Robles",
    username: "trobles",
    role: "Surveyor",
    barangay: "Pajac",
    sitio: "Sitio A",
    submissions: 205,
    lastActive: "Today 12:20pm",
    status: "Active",
    requiresPwChange: false,
  },
];

const BRGY_DATA = [
  {
    name: "Pusok",
    respondents: 312,
    delacruz: 71,
    santos: 22,
    reyes: 7,
    sitios: [
      {
        name: "Sitio Silangan",
        respondents: 112,
        delacruz: 75,
        santos: 18,
        reyes: 7,
      },
      {
        name: "Sitio Malinao",
        respondents: 98,
        delacruz: 68,
        santos: 25,
        reyes: 7,
      },
      {
        name: "Sitio Bagong Buhay",
        respondents: 102,
        delacruz: 70,
        santos: 23,
        reyes: 7,
      },
    ],
  },
  {
    name: "Mactan",
    respondents: 289,
    delacruz: 38,
    santos: 54,
    reyes: 8,
    sitios: [
      {
        name: "Sitio Ibabao",
        respondents: 95,
        delacruz: 35,
        santos: 58,
        reyes: 7,
      },
      {
        name: "Sitio Proper",
        respondents: 101,
        delacruz: 40,
        santos: 52,
        reyes: 8,
      },
      {
        name: "Sitio Crossing",
        respondents: 93,
        delacruz: 39,
        santos: 52,
        reyes: 9,
      },
    ],
  },
  {
    name: "Agus",
    respondents: 201,
    delacruz: 65,
    santos: 28,
    reyes: 7,
    sitios: [
      {
        name: "Sitio Upper",
        respondents: 70,
        delacruz: 67,
        santos: 26,
        reyes: 7,
      },
      {
        name: "Sitio Lower",
        respondents: 68,
        delacruz: 63,
        santos: 30,
        reyes: 7,
      },
      {
        name: "Sitio Centro",
        respondents: 63,
        delacruz: 65,
        santos: 28,
        reyes: 7,
      },
    ],
  },
  {
    name: "Basak",
    respondents: 178,
    delacruz: 58,
    santos: 35,
    reyes: 7,
    sitios: [
      {
        name: "Sitio Baybay",
        respondents: 62,
        delacruz: 60,
        santos: 33,
        reyes: 7,
      },
      {
        name: "Sitio Ilaya",
        respondents: 58,
        delacruz: 55,
        santos: 38,
        reyes: 7,
      },
      {
        name: "Sitio Punta",
        respondents: 58,
        delacruz: 59,
        santos: 34,
        reyes: 7,
      },
    ],
  },
  {
    name: "Buaya",
    respondents: 244,
    delacruz: 41,
    santos: 51,
    reyes: 8,
    sitios: [
      {
        name: "Sitio Proper",
        respondents: 85,
        delacruz: 42,
        santos: 50,
        reyes: 8,
      },
      {
        name: "Sitio Extension",
        respondents: 80,
        delacruz: 40,
        santos: 52,
        reyes: 8,
      },
      {
        name: "Sitio New",
        respondents: 79,
        delacruz: 41,
        santos: 51,
        reyes: 8,
      },
    ],
  },
  {
    name: "Gun-ob",
    respondents: 196,
    delacruz: 67,
    santos: 26,
    reyes: 7,
    sitios: [
      { name: "Sitio 1", respondents: 68, delacruz: 69, santos: 24, reyes: 7 },
      { name: "Sitio 2", respondents: 65, delacruz: 65, santos: 28, reyes: 7 },
      { name: "Sitio 3", respondents: 63, delacruz: 67, santos: 26, reyes: 7 },
    ],
  },
  {
    name: "Pajo",
    respondents: 167,
    delacruz: 44,
    santos: 44,
    reyes: 12,
    sitios: [
      {
        name: "Sitio North",
        respondents: 58,
        delacruz: 45,
        santos: 43,
        reyes: 12,
      },
      {
        name: "Sitio South",
        respondents: 55,
        delacruz: 43,
        santos: 45,
        reyes: 12,
      },
      {
        name: "Sitio Center",
        respondents: 54,
        delacruz: 44,
        santos: 44,
        reyes: 12,
      },
    ],
  },
  {
    name: "Pajac",
    respondents: 188,
    delacruz: 72,
    santos: 22,
    reyes: 6,
    sitios: [
      { name: "Sitio A", respondents: 65, delacruz: 74, santos: 20, reyes: 6 },
      { name: "Sitio B", respondents: 62, delacruz: 70, santos: 24, reyes: 6 },
      { name: "Sitio C", respondents: 61, delacruz: 72, santos: 22, reyes: 6 },
    ],
  },
  {
    name: "Looc",
    respondents: 221,
    delacruz: 39,
    santos: 53,
    reyes: 8,
    sitios: [
      {
        name: "Sitio Seaside",
        respondents: 78,
        delacruz: 38,
        santos: 54,
        reyes: 8,
      },
      {
        name: "Sitio Highland",
        respondents: 73,
        delacruz: 40,
        santos: 52,
        reyes: 8,
      },
      {
        name: "Sitio Midway",
        respondents: 70,
        delacruz: 39,
        santos: 53,
        reyes: 8,
      },
    ],
  },
  {
    name: "Ibo",
    respondents: 134,
    delacruz: 70,
    santos: 23,
    reyes: 7,
    sitios: [
      {
        name: "Sitio Proper",
        respondents: 48,
        delacruz: 71,
        santos: 22,
        reyes: 7,
      },
      {
        name: "Sitio New Area",
        respondents: 44,
        delacruz: 68,
        santos: 25,
        reyes: 7,
      },
      {
        name: "Sitio Old",
        respondents: 42,
        delacruz: 71,
        santos: 22,
        reyes: 7,
      },
    ],
  },
];

const WAVES = [
  { id: 1, label: "Wave 1: Pre-Filing" },
  { id: 2, label: "Wave 2: Post-Filing +1mo" },
  { id: 3, label: "Wave 3: -6 months" },
  { id: 4, label: "Wave 4: -2 months" },
  { id: 5, label: "Wave 5: -1 month" },
];

const POSITIONS = [
  "President",
  "Vice President",
  "Senator",
  "Congressman",
  "Governor",
  "Vice Governor",
  "Mayor",
  "Vice Mayor",
  "Councilor",
  "Barangay Captain",
  "Barangay Councilor",
  "Board Member",
];

// Max winners per position type — 1 = single winner (only 1 watch allowed), >1 = multi-winner
const POSITION_MAX_WINNERS = {
  President: 1,
  "Vice President": 1,
  Senator: 12,
  Congressman: 1,
  Governor: 1,
  "Vice Governor": 1,
  Mayor: 1,
  "Vice Mayor": 1,
  Councilor: 12, // city/municipal councilors
  "Barangay Captain": 1,
  "Barangay Councilor": 7,
  "Board Member": 8,
};

// ── AUDIT LOG ──
const AUDIT_LOG = [
  {
    time: "Apr 21 2026 14:14",
    user: "superadmin",
    action: "Exported Wave 3 results PDF",
    ip: "192.168.1.1",
  },
  {
    time: "Apr 21 2026 13:02",
    user: "jbautista",
    action: "Submitted survey response #4287 — Brgy. Agus",
    ip: "10.0.0.44",
  },
  {
    time: "Apr 21 2026 12:20",
    user: "trobles",
    action: "Submitted survey response #4250 — Brgy. Pajac",
    ip: "10.0.0.51",
  },
  {
    time: "Apr 21 2026 11:55",
    user: "superadmin",
    action: "Created new user account: rsalazar (Surveyor)",
    ip: "192.168.1.1",
  },
  {
    time: "Apr 21 2026 11:45",
    user: "mdelosreyes",
    action: "Submitted survey response #4220 — Brgy. Mactan",
    ip: "10.0.0.38",
  },
  {
    time: "Apr 21 2026 10:30",
    user: "superadmin",
    action: "Updated candidate: Maria Santos — color changed to #D64045",
    ip: "192.168.1.1",
  },
  {
    time: "Apr 21 2026 09:15",
    user: "superadmin",
    action: "Switched active survey wave to Wave 3",
    ip: "192.168.1.1",
  },
  {
    time: "Apr 20 2026 17:44",
    user: "rsalazar",
    action: "Login from new device — IP flagged for review",
    ip: "203.177.5.12 ⚠",
    warn: true,
  },
  {
    time: "Apr 20 2026 16:30",
    user: "epacquiao",
    action: "Submitted survey response #4100 — Brgy. Ibo",
    ip: "10.0.0.62",
  },
  {
    time: "Apr 20 2026 15:12",
    user: "superadmin",
    action: "Added new candidate: Ana Gonzales (Vice Mayor)",
    ip: "192.168.1.1",
  },
  {
    time: "Apr 20 2026 09:00",
    user: "superadmin",
    action: "System: Wave 3 survey opened for submissions",
    ip: "System",
  },
];

// ── UI PRIMITIVES ──
const Btn = ({
  children,
  variant = "ghost",
  size = "md",
  onClick,
  disabled,
  style: s,
}) => {
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "var(--r-sm)",
    transition: "all .15s",
    opacity: disabled ? 0.45 : 1,
    ...s,
  };
  const variants = {
    gold: {
      background: "var(--gold)",
      color: "var(--navy)",
      padding: size === "sm" ? "5px 12px" : "9px 20px",
      fontSize: size === "sm" ? 12 : 13,
    },
    ghost: {
      background: "rgba(255,255,255,.07)",
      color: "var(--white)",
      border: "1px solid rgba(255,255,255,.12)",
      padding: size === "sm" ? "5px 12px" : "9px 20px",
      fontSize: size === "sm" ? 12 : 13,
    },
    danger: {
      background: "var(--danger)",
      color: "#fff",
      padding: size === "sm" ? "5px 12px" : "9px 20px",
      fontSize: size === "sm" ? 12 : 13,
    },
    success: {
      background: "var(--success)",
      color: "#fff",
      padding: size === "sm" ? "5px 12px" : "9px 20px",
      fontSize: size === "sm" ? 12 : 13,
    },
    watch: {
      background: "rgba(232,184,75,.15)",
      color: "var(--gold)",
      border: "1px solid rgba(232,184,75,.4)",
      padding: "4px 10px",
      fontSize: 11,
    },
    watchActive: {
      background: "var(--gold)",
      color: "var(--navy)",
      padding: "4px 10px",
      fontSize: 11,
    },
  };
  return (
    <button
      style={{ ...base, ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, color = "gold" }) => {
  const colors = {
    gold: { bg: "rgba(232,184,75,.15)", c: "var(--gold)" },
    blue: { bg: "rgba(26,111,196,.2)", c: "#64B5F6" },
    green: { bg: "rgba(34,168,110,.2)", c: "#6FCF97" },
    red: { bg: "rgba(214,64,69,.2)", c: "#EF9A9A" },
    gray: { bg: "rgba(255,255,255,.08)", c: "var(--gray2)" },
  };
  return (
    <span
      style={{
        background: colors[color]?.bg,
        color: colors[color]?.c,
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 20,
        textTransform: "uppercase",
        letterSpacing: ".5px",
      }}
    >
      {children}
    </span>
  );
};

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  fullWidth,
  style: s,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      ...(fullWidth ? { gridColumn: "1/-1" } : {}),
      ...s,
    }}
  >
    {label && (
      <label
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".7px",
          color: "var(--gray2)",
        }}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "var(--r-sm)",
        padding: "9px 12px",
        color: "var(--white)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        outline: "none",
      }}
    />
  </div>
);

const Select = ({ label, value, onChange, options, fullWidth, style: s }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      ...(fullWidth ? { gridColumn: "1/-1" } : {}),
      ...s,
    }}
  >
    {label && (
      <label
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".7px",
          color: "var(--gray2)",
        }}
      >
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      style={{
        background: "var(--navy3)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "var(--r-sm)",
        padding: "9px 12px",
        color: "var(--white)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        outline: "none",
        WebkitAppearance: "none",
      }}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({ children, style: s }) => (
  <div
    style={{
      background: "var(--navy2)",
      borderRadius: "var(--r)",
      border: "1px solid rgba(255,255,255,.07)",
      ...s,
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ title, right, style: s }) => (
  <div
    style={{
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,.07)",
      ...s,
    }}
  >
    <div
      style={{ fontFamily: "var(--font-head)", fontSize: 13, fontWeight: 600 }}
    >
      {title}
    </div>
    {right}
  </div>
);

const Modal = ({ open, onClose, title, children, width = 540 }) => {
  if (!open) return null;
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "var(--navy2)",
          borderRadius: "var(--r)",
          border: "1px solid rgba(255,255,255,.1)",
          padding: 28,
          width,
          maxWidth: "90vw",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--gray2)",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Topbar = ({ title, right, badge }) => (
  <div
    style={{
      padding: "16px 28px",
      borderBottom: "1px solid rgba(255,255,255,.07)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--navy2)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
  >
    <div
      style={{
        fontFamily: "var(--font-head)",
        fontSize: 18,
        fontWeight: 700,
        flex: 1,
      }}
    >
      {title}
    </div>
    {badge && (
      <span
        style={{
          background: "rgba(232,184,75,.15)",
          border: "1px solid rgba(232,184,75,.3)",
          color: "var(--gold)",
          fontSize: 11,
          padding: "4px 12px",
          borderRadius: 20,
          fontWeight: 600,
        }}
      >
        {badge}
      </span>
    )}
    {right}
  </div>
);

// ── STAT CARD ──
const StatCard = ({ label, value, sub, accent = "gold" }) => {
  const colors = {
    gold: "var(--gold)",
    blue: "#64B5F6",
    green: "#6FCF97",
    red: "#EF9A9A",
  };
  return (
    <Card style={{ padding: 22, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 70,
          height: 70,
          borderRadius: "0 var(--r) 0 70px",
          background: colors[accent],
          opacity: 0.12,
        }}
      />
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".8px",
          color: "var(--gray2)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-head)",
          fontSize: 36,
          fontWeight: 800,
          color: colors[accent],
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "var(--gray3)", marginTop: 8 }}>
          {sub}
        </div>
      )}
    </Card>
  );
};

// ── MULTI-WINNER MOCK DATA ──
const COUNCILOR_DATA = [
  {
    name: "Ramon Fernandez",
    pct: 58,
    color: "#1A6FC4",
    party: "PP",
    watched: true,
  },
  {
    name: "Luisa Reyes",
    pct: 54,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Carlo Navarro",
    pct: 51,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Nelia Abalos",
    pct: 49,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Ferdie Ocampo",
    pct: 47,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Shiela Bautista",
    pct: 44,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  {
    name: "Ronnie Dela Torre",
    pct: 42,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Mila Pascual",
    pct: 40,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Jerry Tolentino",
    pct: 38,
    color: "#1B8A5A",
    party: "GA",
    watched: false,
  },
  {
    name: "Cita Panganiban",
    pct: 37,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Vic Soriano",
    pct: 35,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Tess Macaraeg",
    pct: 33,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Aries Buenaventura",
    pct: 29,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  {
    name: "Glenda Salcedo",
    pct: 26,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Bong Castillo",
    pct: 22,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Luz Evangelista",
    pct: 18,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Jun Magsaysay",
    pct: 15,
    color: "#1B8A5A",
    party: "GA",
    watched: false,
  },
  {
    name: "Rita Vergara",
    pct: 12,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
];

const SENATOR_DATA = [
  {
    name: "Sen. Fernandez",
    pct: 74,
    color: "#1A6FC4",
    party: "PP",
    watched: true,
  },
  {
    name: "Sen. Aquino",
    pct: 68,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  { name: "Sen. Abad", pct: 61, color: "#D9622B", party: "NP", watched: false },
  {
    name: "Sen. Villar",
    pct: 58,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Sen. Cayetano",
    pct: 55,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Sen. Lacson",
    pct: 51,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Sen. Gordon",
    pct: 48,
    color: "#1B8A5A",
    party: "GA",
    watched: false,
  },
  {
    name: "Sen. Escudero",
    pct: 45,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  { name: "Sen. Poe", pct: 42, color: "#1A6FC4", party: "PP", watched: false },
  {
    name: "Sen. Revilla",
    pct: 39,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Sen. Binay",
    pct: 35,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Sen. Sotto",
    pct: 31,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  {
    name: "Sen. Legarda",
    pct: 28,
    color: "#1B8A5A",
    party: "GA",
    watched: false,
  },
  {
    name: "Sen. Trillanes",
    pct: 22,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Sen. Pangilinan",
    pct: 18,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Sen. Hontiveros",
    pct: 14,
    color: "#1B8A5A",
    party: "GA",
    watched: false,
  },
  {
    name: "Sen. Zubiri",
    pct: 11,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  {
    name: "Sen. Drilon",
    pct: 9,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
];

const BRGY_COUNCILOR_DATA = [
  {
    name: "Kagawad Lim",
    pct: 71,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Kagawad Santos",
    pct: 68,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Kagawad Reyes",
    pct: 64,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Kagawad Cruz",
    pct: 61,
    color: "#1A6FC4",
    party: "PP",
    watched: true,
  },
  {
    name: "Kagawad Garcia",
    pct: 58,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
  {
    name: "Kagawad Torres",
    pct: 54,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Kagawad Ramos",
    pct: 49,
    color: "#1A6FC4",
    party: "PP",
    watched: false,
  },
  {
    name: "Kagawad Flores",
    pct: 42,
    color: "#D9622B",
    party: "NP",
    watched: false,
  },
  {
    name: "Kagawad Morales",
    pct: 35,
    color: "#9A9488",
    party: "Ind",
    watched: false,
  },
  {
    name: "Kagawad Villanueva",
    pct: 28,
    color: "#D64045",
    party: "PDP",
    watched: false,
  },
];

// ── WATCHED STAR BADGE ──
const WatchedStar = () => (
  <span
    title="You are monitoring this candidate"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(232,184,75,.18)",
      color: "var(--gold)",
      fontSize: 10,
      fontWeight: 900,
      padding: "1px 6px",
      borderRadius: 10,
      marginLeft: 5,
      letterSpacing: 0,
      lineHeight: 1.4,
      border: "1px solid rgba(232,184,75,.35)",
    }}
  >
    ★ WATCHED
  </span>
);

// ── CANDIDATE BAR (updated to support watched + rank + winner cutoff) ──
const CandBar = ({
  name,
  pct,
  color,
  watched = false,
  rank,
  winnerCutoff,
  maxWinners,
}) => {
  const isWinner = winnerCutoff !== undefined ? rank <= winnerCutoff : true;
  const isCutoffRow = winnerCutoff !== undefined && rank === winnerCutoff;
  return (
    <div style={{ marginBottom: isCutoffRow ? 0 : 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
          background: watched ? "rgba(232,184,75,.07)" : "transparent",
          borderRadius: 6,
          padding: watched ? "3px 5px" : "0",
          margin: watched ? "0 -5px 6px" : "0 0 6px",
        }}
      >
        {rank !== undefined && (
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 11,
              fontWeight: 700,
              minWidth: 18,
              textAlign: "center",
              color: isWinner ? "var(--gold)" : "var(--gray3)",
            }}
          >
            {rank}
          </div>
        )}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: 12,
            flex: 1,
            color: isWinner ? "var(--white)" : "var(--gray2)",
          }}
        >
          {name}
          {watched && <WatchedStar />}
        </div>
        <div
          style={{
            flex: 2,
            height: 5,
            background: "rgba(255,255,255,.08)",
            borderRadius: 3,
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: 5,
              background: isWinner ? color : "rgba(255,255,255,.2)",
              borderRadius: 3,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 13,
            fontWeight: 700,
            minWidth: 38,
            textAlign: "right",
            color: isWinner ? "var(--white)" : "var(--gray3)",
          }}
        >
          {pct}%
        </div>
      </div>
      {/* cutoff divider */}
      {isCutoffRow && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "4px 0 6px",
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(214,64,69,.4)" }}
          />
          <span
            style={{
              fontSize: 9,
              color: "var(--danger)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".5px",
            }}
          >
            — cutoff line — top {maxWinners} win —
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(214,64,69,.4)" }}
          />
        </div>
      )}
    </div>
  );
};

// ── MULTI-WINNER CARD ──
const MultiWinnerCard = ({ title, maxWinners, data }) => {
  const [expanded, setExpanded] = useState(false);
  const showCount = expanded ? data.length : Math.min(15, data.length);
  const hasMore = data.length > 15;
  const watchedCount = data.filter((c) => c.watched).length;
  const atLimit = watchedCount >= maxWinners;
  return (
    <Card style={{ padding: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--gold)",
            textTransform: "uppercase",
            letterSpacing: ".6px",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {watchedCount > 0 && (
            <span
              style={{
                fontSize: 10,
                background: atLimit
                  ? "rgba(232,184,75,.2)"
                  : "rgba(232,184,75,.1)",
                color: "var(--gold)",
                padding: "2px 8px",
                borderRadius: 10,
                fontWeight: 700,
                border: "1px solid rgba(232,184,75,.3)",
              }}
            >
              ★ {watchedCount}/{maxWinners} watched
            </span>
          )}
          <span
            style={{
              fontSize: 10,
              background: "rgba(214,64,69,.15)",
              color: "#EF9A9A",
              padding: "2px 8px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            Top {maxWinners} win
          </span>
        </div>
      </div>
      {data.slice(0, showCount).map((c, i) => (
        <CandBar
          key={c.name}
          name={c.name}
          pct={c.pct}
          color={c.color}
          watched={c.watched}
          rank={i + 1}
          winnerCutoff={maxWinners}
          maxWinners={maxWinners}
        />
      ))}
      {hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "7px",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: "var(--r-sm)",
            color: "var(--gray2)",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          {expanded ? "▲ Show less" : `▼ View all ${data.length} candidates`}
        </button>
      )}
    </Card>
  );
};

// ══════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════

// ── DASHBOARD ──
const Dashboard = ({ wave, setWave, candidates }) => {
  const watchedMap = {};
  candidates.forEach((c) => {
    if (c.watched) watchedMap[c.name] = true;
  });

  const singleWinnerPositions = [
    {
      title: "Mayor",
      candidates: [
        {
          name: "Juan dela Cruz",
          pct: 62,
          color: "#1A6FC4",
          watched: candidates.find((c) => c.name === "Juan dela Cruz")?.watched,
        },
        {
          name: "Maria Santos",
          pct: 31,
          color: "#D64045",
          watched: candidates.find((c) => c.name === "Maria Santos")?.watched,
        },
        { name: "Pedro Reyes", pct: 7, color: "#9A9488", watched: false },
      ],
    },
    {
      title: "Vice Mayor",
      candidates: [
        {
          name: "Ana Gonzales",
          pct: 55,
          color: "#1A6FC4",
          watched: candidates.find((c) => c.name === "Ana Gonzales")?.watched,
        },
        { name: "Jose Villanueva", pct: 38, color: "#D64045", watched: false },
        { name: "Luz Mendoza", pct: 7, color: "#D9622B", watched: false },
      ],
    },
    {
      title: "Congressman (Dist. 2)",
      candidates: [
        {
          name: "Roberto Cruz",
          pct: 49,
          color: "#D64045",
          watched: candidates.find((c) => c.name === "Roberto Cruz")?.watched,
        },
        {
          name: "Carina Bautista",
          pct: 44,
          color: "#1A6FC4",
          watched: candidates.find((c) => c.name === "Carina Bautista")
            ?.watched,
        },
        { name: "Mario Lim", pct: 7, color: "#1B8A5A", watched: false },
      ],
    },
    {
      title: "President",
      candidates: [
        {
          name: "Carina Espinosa",
          pct: 38,
          color: "#1A6FC4",
          watched: candidates.find((c) => c.name === "Carina Espinosa")
            ?.watched,
        },
        {
          name: "Rodrigo Salcedo",
          pct: 27,
          color: "#D64045",
          watched: candidates.find((c) => c.name === "Rodrigo Salcedo")
            ?.watched,
        },
        { name: "Lino Magsaysay", pct: 22, color: "#D9622B", watched: false },
        { name: "Elena Macaraeg", pct: 10, color: "#1B8A5A", watched: false },
      ],
    },
  ];

  return (
    <div>
      <Topbar
        title="Survey Dashboard"
        badge={`Wave ${wave} — ${WAVES[wave - 1]?.label}`}
        right={
          <Btn variant="ghost" size="sm" onClick={() => {}}>
            Export PDF
          </Btn>
        }
      />
      <div style={{ padding: 28 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {WAVES.map((w) => (
            <div
              key={w.id}
              onClick={() => setWave(w.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                border: `1.5px solid ${
                  wave === w.id ? "var(--gold)" : "rgba(255,255,255,.12)"
                }`,
                background: wave === w.id ? "var(--gold)" : "transparent",
                color: wave === w.id ? "var(--navy)" : "var(--gray2)",
                transition: "all .15s",
              }}
            >
              {w.label}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <StatCard
            label="Total Respondents"
            value="4,287"
            sub="↑ 12% vs. Wave 2"
            accent="gold"
          />
          <StatCard
            label="Barangays Covered"
            value="38/42"
            sub="90.5% coverage"
            accent="blue"
          />
          <StatCard
            label="Active Surveyors"
            value="24"
            sub="3 below quota"
            accent="green"
          />
          <StatCard
            label="Survey Completion"
            value="78%"
            sub="Target: 5,000 resp."
            accent="red"
          />
        </div>

        {/* Single-winner positions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginBottom: 18,
          }}
        >
          {singleWinnerPositions.map((pos) => (
            <Card key={pos.title} style={{ padding: 18 }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  letterSpacing: ".6px",
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: "1px solid rgba(255,255,255,.07)",
                }}
              >
                {pos.title}
              </div>
              {pos.candidates.map((c, i) => (
                <CandBar key={c.name} {...c} rank={i + 1} />
              ))}
            </Card>
          ))}
        </div>

        {/* Multi-winner positions */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          <MultiWinnerCard
            title="City Councilor — Lapu-Lapu City"
            maxWinners={12}
            data={COUNCILOR_DATA}
          />
          <MultiWinnerCard
            title="Senator (National)"
            maxWinners={12}
            data={SENATOR_DATA}
          />
          <MultiWinnerCard
            title="Barangay Kagawad — Pusok"
            maxWinners={7}
            data={BRGY_COUNCILOR_DATA}
          />
        </div>
      </div>
    </div>
  );
};

// ── RESULTS ──
const Results = ({ wave, candidates }) => {
  const [tab, setTab] = useState("National");
  const tabs = ["National", "Provincial", "City / Municipal", "Barangay"];
  const isWatched = (name) =>
    candidates.some((c) => c.name === name && c.watched);
  return (
    <div>
      <Topbar
        title="Candidate Results"
        badge={`Wave ${wave}`}
        right={
          <Btn variant="ghost" size="sm">
            Export CSV
          </Btn>
        }
      />
      <div style={{ padding: 28 }}>
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid rgba(255,255,255,.07)",
            marginBottom: 24,
          }}
        >
          {tabs.map((t) => (
            <div
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "9px 20px",
                fontSize: 13,
                color: tab === t ? "var(--gold)" : "var(--gray2)",
                cursor: "pointer",
                borderBottom: `2px solid ${
                  tab === t ? "var(--gold)" : "transparent"
                }`,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        {[
          {
            title: "Presidential Race",
            has2nd: true,
            rows: [
              {
                rank: 1,
                name: "Carina Espinosa",
                party: "Partido Pagbabago",
                color: "#1A6FC4",
                w1: "28%",
                w2: "33%",
                w3: "38%",
                w3_2nd: "24%",
                trend: "+5pp",
                up: true,
              },
              {
                rank: 2,
                name: "Rodrigo Salcedo",
                party: "PDP-Laban",
                color: "#D64045",
                w1: "32%",
                w2: "30%",
                w3: "27%",
                w3_2nd: "31%",
                trend: "−3pp",
                up: false,
              },
              {
                rank: 3,
                name: "Lino Magsaysay",
                party: "Nationalist Party",
                color: "#D9622B",
                w1: "18%",
                w2: "20%",
                w3: "22%",
                w3_2nd: "28%",
                trend: "+2pp",
                up: true,
              },
              {
                rank: 4,
                name: "Elena Macaraeg",
                party: "Green Alliance",
                color: "#1B8A5A",
                w1: "12%",
                w2: "11%",
                w3: "10%",
                w3_2nd: "14%",
                trend: "−1pp",
                up: false,
              },
            ],
          },
          {
            title: "Mayoral Race — Lapu-Lapu City",
            has2nd: false,
            rows: [
              {
                rank: 1,
                name: "Juan dela Cruz",
                party: "Partido Pagbabago",
                color: "#1A6FC4",
                w1: "55%",
                w2: "59%",
                w3: "62%",
                trend: "+3pp",
                up: true,
              },
              {
                rank: 2,
                name: "Maria Santos",
                party: "PDP-Laban",
                color: "#D64045",
                w1: "36%",
                w2: "33%",
                w3: "31%",
                trend: "−2pp",
                up: false,
              },
              {
                rank: 3,
                name: "Pedro Reyes",
                party: "Independent",
                color: "#9A9488",
                w1: "9%",
                w2: "8%",
                w3: "7%",
                trend: "−1pp",
                up: false,
              },
            ],
          },
        ].map((tbl) => (
          <Card
            key={tbl.title}
            style={{ marginBottom: 20, overflow: "hidden" }}
          >
            <CardHeader
              title={tbl.title}
              right={
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {tbl.has2nd && (
                    <span
                      style={{
                        fontSize: 10,
                        background: "rgba(26,111,196,.15)",
                        color: "#64B5F6",
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontWeight: 700,
                      }}
                    >
                      2ND CHOICE ENABLED
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: "var(--gray2)" }}>
                    n = 4,287
                  </span>
                </div>
              }
            />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "#",
                    "Candidate",
                    "Party",
                    "Wave 1",
                    "Wave 2",
                    ...(tbl.has2nd
                      ? ["Wave 3 (1st Choice)", "Wave 3 (2nd Choice)"]
                      : ["Wave 3"]),
                    "Trend",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".7px",
                        color: h.includes("2nd")
                          ? "#64B5F6"
                          : h.includes("1st")
                          ? "var(--gold)"
                          : "var(--gray3)",
                        padding: "9px 18px",
                        textAlign: "left",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbl.rows.map((r) => {
                  const watched = isWatched(r.name);
                  return (
                    <tr
                      key={r.name}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,.04)",
                        background: watched
                          ? "rgba(232,184,75,.06)"
                          : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "11px 18px",
                          color: r.rank === 1 ? "var(--gold)" : "var(--gray2)",
                          fontWeight: r.rank === 1 ? 700 : 400,
                        }}
                      >
                        {r.rank}
                      </td>
                      <td
                        style={{
                          padding: "11px 18px",
                          fontWeight: r.rank === 1 ? 700 : 400,
                        }}
                      >
                        {r.name}
                        {watched && <WatchedStar />}
                      </td>
                      <td style={{ padding: "11px 18px" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: "50%",
                              background: r.color,
                              display: "inline-block",
                            }}
                          />
                          {r.party}
                        </span>
                      </td>
                      <td
                        style={{ padding: "11px 18px", color: "var(--gray2)" }}
                      >
                        {r.w1}
                      </td>
                      <td
                        style={{ padding: "11px 18px", color: "var(--gray2)" }}
                      >
                        {r.w2}
                      </td>
                      <td
                        style={{
                          padding: "11px 18px",
                          fontWeight: 700,
                          color: r.up ? "#6FCF97" : "#EF9A9A",
                        }}
                      >
                        {r.w3}
                      </td>
                      {tbl.has2nd && (
                        <td
                          style={{
                            padding: "11px 18px",
                            fontWeight: 600,
                            color: "#64B5F6",
                            borderLeft: "1px solid rgba(26,111,196,.15)",
                          }}
                        >
                          {r.w3_2nd}
                        </td>
                      )}
                      <td
                        style={{
                          padding: "11px 18px",
                          color: r.up ? "#6FCF97" : "#EF9A9A",
                        }}
                      >
                        {r.up ? "▲" : "▼"} {r.trend}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {tbl.has2nd && (
              <div
                style={{
                  padding: "10px 18px",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  fontSize: 11,
                  color: "var(--gray3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>
                  1st Choice
                </span>{" "}
                = respondent's primary preference.
                <span
                  style={{ color: "#64B5F6", fontWeight: 700, marginLeft: 8 }}
                >
                  2nd Choice
                </span>{" "}
                = preference if their first choice cannot run.
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── GEO MAP ──
const GeoMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("Mayor");
  const [selectedWave, setSelectedWave] = useState(3);
  const [fullscreen, setFullscreen] = useState(false);

  const barangayCoords = {
    Pusok: [10.322, 123.946],
    Mactan: [10.308, 123.973],
    Agus: [10.295, 123.985],
    Basak: [10.278, 123.945],
    Buaya: [10.305, 123.958],
    "Gun-ob": [10.268, 123.965],
    Pajo: [10.332, 123.95],
    Pajac: [10.285, 123.933],
    Looc: [10.315, 123.939],
    Ibo: [10.325, 123.962],
  };

  const respondentDots = [
    {
      lat: 10.322,
      lng: 123.946,
      color: "#1A6FC4",
      brgy: "Pusok",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.324,
      lng: 123.948,
      color: "#1A6FC4",
      brgy: "Pusok",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.32,
      lng: 123.944,
      color: "#D64045",
      brgy: "Pusok",
      cand: "Maria Santos",
    },
    {
      lat: 10.308,
      lng: 123.973,
      color: "#D64045",
      brgy: "Mactan",
      cand: "Maria Santos",
    },
    {
      lat: 10.31,
      lng: 123.975,
      color: "#D64045",
      brgy: "Mactan",
      cand: "Maria Santos",
    },
    {
      lat: 10.306,
      lng: 123.971,
      color: "#1A6FC4",
      brgy: "Mactan",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.295,
      lng: 123.985,
      color: "#1A6FC4",
      brgy: "Agus",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.297,
      lng: 123.987,
      color: "#1A6FC4",
      brgy: "Agus",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.293,
      lng: 123.983,
      color: "#9A9488",
      brgy: "Agus",
      cand: "Pedro Reyes",
    },
    {
      lat: 10.278,
      lng: 123.945,
      color: "#1A6FC4",
      brgy: "Basak",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.28,
      lng: 123.947,
      color: "#1A6FC4",
      brgy: "Basak",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.305,
      lng: 123.958,
      color: "#D64045",
      brgy: "Buaya",
      cand: "Maria Santos",
    },
    {
      lat: 10.307,
      lng: 123.96,
      color: "#D64045",
      brgy: "Buaya",
      cand: "Maria Santos",
    },
    {
      lat: 10.303,
      lng: 123.956,
      color: "#1A6FC4",
      brgy: "Buaya",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.268,
      lng: 123.965,
      color: "#1A6FC4",
      brgy: "Gun-ob",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.27,
      lng: 123.967,
      color: "#1A6FC4",
      brgy: "Gun-ob",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.332,
      lng: 123.95,
      color: "#9A9488",
      brgy: "Pajo",
      cand: "Pedro Reyes",
    },
    {
      lat: 10.334,
      lng: 123.952,
      color: "#1A6FC4",
      brgy: "Pajo",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.285,
      lng: 123.933,
      color: "#1A6FC4",
      brgy: "Pajac",
      cand: "Juan dela Cruz",
    },
    {
      lat: 10.315,
      lng: 123.939,
      color: "#D64045",
      brgy: "Looc",
      cand: "Maria Santos",
    },
    {
      lat: 10.317,
      lng: 123.941,
      color: "#D64045",
      brgy: "Looc",
      cand: "Maria Santos",
    },
    {
      lat: 10.325,
      lng: 123.962,
      color: "#1A6FC4",
      brgy: "Ibo",
      cand: "Juan dela Cruz",
    },
  ];

  const brgyWinnerColor = {
    Pusok: "#1A6FC4",
    Mactan: "#D64045",
    Agus: "#1A6FC4",
    Basak: "#1A6FC4",
    Buaya: "#D64045",
    "Gun-ob": "#1A6FC4",
    Pajo: "#9A9488",
    Pajac: "#1A6FC4",
    Looc: "#D64045",
    Ibo: "#1A6FC4",
  };

  useEffect(() => {
    const check = setInterval(() => {
      if (window.L) {
        setLeafletReady(true);
        clearInterval(check);
      }
    }, 200);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    const L = window.L;
    const map = L.map(mapRef.current, { center: [10.31, 123.955], zoom: 13 });
    mapInstanceRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      opacity: 0.7,
    }).addTo(map);
    Object.entries(barangayCoords).forEach(([name, coords]) => {
      const color = brgyWinnerColor[name] || "#888";
      L.circle(coords, {
        radius: 600,
        color,
        fillColor: color,
        fillOpacity: 0.18,
        weight: 2,
        opacity: 0.5,
      })
        .bindTooltip(
          `<b>${name}</b><br>Winner: ${
            color === "#1A6FC4"
              ? "Juan dela Cruz"
              : color === "#D64045"
              ? "Maria Santos"
              : "Pedro Reyes"
          }`
        )
        .addTo(map);
    });
    respondentDots.forEach((d) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;border-radius:50%;background:${d.color};border:2px solid rgba(255,255,255,.6);"></div>`,
        iconSize: [10, 10],
      });
      L.marker([d.lat, d.lng], { icon })
        .bindTooltip(`<b>${d.brgy}</b><br>${d.cand}`)
        .addTo(map);
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletReady]);

  // Invalidate map size whenever fullscreen changes so Leaflet redraws correctly
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 50);
    }
  }, [fullscreen]);

  // Escape key exits fullscreen
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  const controls = (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select
        value={selectedWave}
        onChange={(e) => setSelectedWave(+e.target.value)}
        style={{
          background: "var(--navy3)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: "var(--r-sm)",
          padding: "6px 10px",
          color: "var(--white)",
          fontSize: 12,
          outline: "none",
        }}
      >
        {WAVES.map((w) => (
          <option key={w.id} value={w.id}>
            {w.label}
          </option>
        ))}
      </select>
      <select
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        style={{
          background: "var(--navy3)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: "var(--r-sm)",
          padding: "6px 10px",
          color: "var(--white)",
          fontSize: 12,
          outline: "none",
        }}
      >
        {POSITIONS.slice(0, 8).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <button
        onClick={() => setFullscreen((f) => !f)}
        title={fullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
        style={{
          background: fullscreen ? "var(--gold)" : "rgba(255,255,255,.08)",
          border: `1px solid ${
            fullscreen ? "var(--gold)" : "rgba(255,255,255,.15)"
          }`,
          borderRadius: "var(--r-sm)",
          color: fullscreen ? "var(--navy)" : "var(--white)",
          padding: "6px 11px",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: 1,
          fontWeight: 700,
          transition: "all .15s",
        }}
      >
        {fullscreen ? "⛶" : "⛶"}
        <span
          style={{
            fontSize: 11,
            marginLeft: 5,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
          }}
        >
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </span>
      </button>
    </div>
  );

  const legend = (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      {[
        { color: "#1A6FC4", name: "Juan dela Cruz" },
        { color: "#D64045", name: "Maria Santos" },
        { color: "#9A9488", name: "Pedro Reyes" },
      ].map((l) => (
        <div
          key={l.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: "var(--gray2)",
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: l.color,
            }}
          />
          {l.name}
        </div>
      ))}
    </div>
  );

  const statCards = (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}
    >
      {[
        {
          label: "Juan dela Cruz (PP)",
          value: "2,658",
          sub: "62.0% — 7 barangays leading",
          border: "#1A6FC4",
          color: "#64B5F6",
        },
        {
          label: "Maria Santos (PDP)",
          value: "1,329",
          sub: "31.0% — leads in 3 barangays",
          border: "#D64045",
          color: "#EF9A9A",
        },
        {
          label: "Pedro Reyes (Ind)",
          value: "300",
          sub: "7.0% — no barangay lead",
          border: "#9A9488",
          color: "#B0B0B0",
        },
      ].map((c) => (
        <Card
          key={c.label}
          style={{ padding: 18, borderLeft: `3px solid ${c.border}` }}
        >
          <div style={{ fontSize: 11, color: "var(--gray2)", marginBottom: 6 }}>
            {c.label}
          </div>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 28,
              fontWeight: 800,
              color: c.color,
            }}
          >
            {c.value}
          </div>
          <div style={{ fontSize: 11, color: "var(--gray3)", marginTop: 6 }}>
            {c.sub}
          </div>
        </Card>
      ))}
    </div>
  );

  // ── FULLSCREEN OVERLAY ──
  if (fullscreen)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: "var(--navy)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Fullscreen topbar */}
        <div
          style={{
            padding: "12px 20px",
            background: "var(--navy2)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 16,
              fontWeight: 700,
              flex: 1,
            }}
          >
            Geo Map — {selectedPosition} — Wave {selectedWave}
          </div>
          {legend}
          <div style={{ marginLeft: "auto" }}>{controls}</div>
        </div>
        {/* Fullscreen map — fills remaining space */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>
        {/* Fullscreen stat bar at bottom */}
        <div
          style={{
            padding: "12px 20px",
            background: "var(--navy2)",
            borderTop: "1px solid rgba(255,255,255,.07)",
            flexShrink: 0,
          }}
        >
          {statCards}
        </div>
      </div>
    );

  // ── NORMAL VIEW ──
  return (
    <div>
      <Topbar
        title="Geo Map — Respondent Locations"
        badge={`Wave ${selectedWave}`}
        right={controls}
      />
      {/* Remove side padding so map fills full content width */}
      <div style={{ padding: "20px 20px 20px" }}>
        <Card style={{ overflow: "hidden", marginBottom: 16 }}>
          <div
            style={{
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,.07)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Respondent Heatmap — {selectedPosition} — Color by Candidate
              Choice
            </div>
            {legend}
          </div>
          {/* Taller map, full card width */}
          <div
            ref={mapRef}
            style={{
              width: "100%",
              height: "calc(100vh - 280px)",
              minHeight: 480,
            }}
          />
        </Card>
        {statCards}
      </div>
    </div>
  );
};

// ── BARANGAY BREAKDOWN ──
const BarangayBreakdown = ({ candidates }) => {
  const [search, setSearch] = useState("");
  const [expandedBrgy, setExpandedBrgy] = useState(null);
  const filtered = BRGY_DATA.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const leader = (r) =>
    r.delacruz > r.santos && r.delacruz > r.reyes
      ? { name: "dela Cruz", color: "#64B5F6" }
      : r.santos > r.delacruz
      ? { name: "Santos", color: "#EF9A9A" }
      : { name: "Tied", color: "var(--gray2)" };
  const watchedDC = candidates.some(
    (c) => c.name === "Juan dela Cruz" && c.watched
  );
  const watchedSantos = candidates.some(
    (c) => c.name === "Maria Santos" && c.watched
  );

  // Sample barangay councilor data per barangay
  const BRGY_COUNCILOR_BREAKDOWN = {
    Pusok: [
      { name: "Kgwd. Lim", pct: 71, color: "#1A6FC4", watched: false },
      { name: "Kgwd. Santos", pct: 68, color: "#1A6FC4", watched: false },
      { name: "Kgwd. Reyes", pct: 64, color: "#D64045", watched: false },
      { name: "Kgwd. Cruz", pct: 61, color: "#1A6FC4", watched: true },
      { name: "Kgwd. Garcia", pct: 58, color: "#D64045", watched: false },
      { name: "Kgwd. Torres", pct: 54, color: "#9A9488", watched: false },
      { name: "Kgwd. Ramos", pct: 49, color: "#1A6FC4", watched: false },
      { name: "Kgwd. Flores", pct: 42, color: "#D9622B", watched: false },
      { name: "Kgwd. Morales", pct: 35, color: "#9A9488", watched: false },
    ],
  };

  return (
    <div>
      <Topbar
        title="Barangay Breakdown"
        badge="Wave 3"
        right={
          <Btn variant="ghost" size="sm">
            Export
          </Btn>
        }
      />
      <div style={{ padding: 28 }}>
        <Card style={{ marginBottom: 20, overflow: "hidden" }}>
          <CardHeader
            title="Mayor Results per Barangay"
            right={
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search barangay..."
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "var(--r-sm)",
                  padding: "6px 12px",
                  color: "var(--white)",
                  fontSize: 12,
                  outline: "none",
                  width: 200,
                }}
              />
            }
          />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  { label: "Barangay", align: "left" },
                  { label: "Respondents", align: "center" },
                  {
                    label: (
                      <span>
                        J. dela Cruz (PP){watchedDC && <WatchedStar />}
                      </span>
                    ),
                    align: "center",
                  },
                  {
                    label: (
                      <span>
                        M. Santos (PDP){watchedSantos && <WatchedStar />}
                      </span>
                    ),
                    align: "center",
                  },
                  { label: "P. Reyes (Ind)", align: "center" },
                  { label: "Leader", align: "center" },
                ].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".7px",
                      color: "var(--gray3)",
                      padding: "9px 18px",
                      textAlign: h.align,
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const l = leader(b);
                return (
                  <tr
                    key={b.name}
                    onClick={() =>
                      setExpandedBrgy(expandedBrgy === b.name ? null : b.name)
                    }
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,.04)",
                      cursor: "pointer",
                      background:
                        expandedBrgy === b.name
                          ? "rgba(232,184,75,.05)"
                          : "transparent",
                    }}
                  >
                    <td style={{ padding: "11px 18px", fontWeight: 600 }}>
                      {b.name}{" "}
                      <span style={{ fontSize: 11, color: "var(--gray3)" }}>
                        {expandedBrgy === b.name ? "▲" : "▼"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "11px 18px",
                        textAlign: "center",
                        color: "var(--gray2)",
                      }}
                    >
                      {b.respondents}
                    </td>
                    <td
                      style={{
                        padding: "11px 18px",
                        textAlign: "center",
                        color: "#64B5F6",
                        fontWeight: b.delacruz > b.santos ? 700 : 400,
                      }}
                    >
                      {b.delacruz}%
                      {b.delacruz > b.santos && b.delacruz > b.reyes && (
                        <span
                          style={{
                            background: "rgba(26,111,196,.2)",
                            color: "#64B5F6",
                            fontSize: 9,
                            padding: "1px 5px",
                            borderRadius: 8,
                            marginLeft: 4,
                            fontWeight: 700,
                          }}
                        >
                          WIN
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "11px 18px",
                        textAlign: "center",
                        color: "#EF9A9A",
                        fontWeight: b.santos > b.delacruz ? 700 : 400,
                      }}
                    >
                      {b.santos}%
                      {b.santos > b.delacruz && (
                        <span
                          style={{
                            background: "rgba(214,64,69,.2)",
                            color: "#EF9A9A",
                            fontSize: 9,
                            padding: "1px 5px",
                            borderRadius: 8,
                            marginLeft: 4,
                            fontWeight: 700,
                          }}
                        >
                          WIN
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "11px 18px",
                        textAlign: "center",
                        color: "var(--gray2)",
                      }}
                    >
                      {b.reyes}%
                    </td>
                    <td
                      style={{
                        padding: "11px 18px",
                        textAlign: "center",
                        color: l.color,
                        fontWeight: 700,
                      }}
                    >
                      {l.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        {/* Sitio/Purok Breakdown */}
        {expandedBrgy &&
          (() => {
            const brgy = BRGY_DATA.find((b) => b.name === expandedBrgy);
            if (!brgy) return null;
            return (
              <Card style={{ marginBottom: 20, overflow: "hidden" }}>
                <CardHeader
                  title={`Sitio/Purok Breakdown — Brgy. ${expandedBrgy}`}
                />
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {[
                        "Sitio/Purok",
                        "Respondents",
                        "J. dela Cruz (PP)",
                        "M. Santos (PDP)",
                        "P. Reyes (Ind)",
                        "Leader",
                      ].map((h, i) => (
                        <th
                          key={h}
                          style={{
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: ".7px",
                            color: "var(--gray3)",
                            padding: "9px 18px",
                            textAlign: i > 0 ? "center" : "left",
                            borderBottom: "1px solid rgba(255,255,255,.06)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {brgy.sitios.map((s) => {
                      const l = leader(s);
                      return (
                        <tr
                          key={s.name}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,.04)",
                          }}
                        >
                          <td
                            style={{
                              padding: "11px 18px 11px 32px",
                              color: "var(--gray2)",
                            }}
                          >
                            ↳ {s.name}
                          </td>
                          <td
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              color: "var(--gray2)",
                            }}
                          >
                            {s.respondents}
                          </td>
                          <td
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              color: "#64B5F6",
                              fontWeight: s.delacruz > s.santos ? 700 : 400,
                            }}
                          >
                            {s.delacruz}%
                          </td>
                          <td
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              color: "#EF9A9A",
                              fontWeight: s.santos > s.delacruz ? 700 : 400,
                            }}
                          >
                            {s.santos}%
                          </td>
                          <td
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              color: "var(--gray2)",
                            }}
                          >
                            {s.reyes}%
                          </td>
                          <td
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              color: l.color,
                              fontWeight: 700,
                            }}
                          >
                            {l.name}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            );
          })()}

        {/* Barangay Councilor multi-winner breakdown */}
        {expandedBrgy && BRGY_COUNCILOR_BREAKDOWN[expandedBrgy] && (
          <Card style={{ marginBottom: 20, overflow: "hidden" }}>
            <CardHeader
              title={`Barangay Kagawad Results — Brgy. ${expandedBrgy}`}
              right={
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(214,64,69,.15)",
                    color: "#EF9A9A",
                    padding: "2px 8px",
                    borderRadius: 10,
                    fontWeight: 700,
                  }}
                >
                  Top 7 win
                </span>
              }
            />
            <div style={{ padding: "14px 18px" }}>
              {BRGY_COUNCILOR_BREAKDOWN[expandedBrgy].map((c, i) => (
                <CandBar
                  key={c.name}
                  name={c.name}
                  pct={c.pct}
                  color={c.color}
                  watched={c.watched}
                  rank={i + 1}
                  winnerCutoff={7}
                  maxWinners={7}
                />
              ))}
            </div>
          </Card>
        )}

        <div
          style={{
            background: "rgba(214,64,69,.08)",
            border: "1px solid rgba(214,64,69,.2)",
            borderRadius: "var(--r)",
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 13,
              fontWeight: 700,
              color: "#EF9A9A",
              marginBottom: 8,
            }}
          >
            ⚠ Strategic Alert — Weak Barangays
          </div>
          <div style={{ fontSize: 12, color: "var(--gray2)", lineHeight: 1.7 }}>
            <b style={{ color: "var(--white)" }}>Mactan, Buaya, and Looc</b> are
            currently lost to Santos. Combined respondents: 754 (17.6% of
            total). Pajo is a tossup. Recommend targeted door-to-door in these 4
            barangays before Wave 4.
          </div>
        </div>
      </div>
    </div>
  );
};

// ── COMPLETION TRACKER ──
const CompletionTracker = () => (
  <div>
    <Topbar
      title="Surveyor Completion Tracker"
      badge="Wave 3 — Target: 5,000"
    />
    <div style={{ padding: 28 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <StatCard
          label="Total Submitted"
          value="4,287"
          sub="85.7% of 5,000 target"
          accent="gold"
        />
        <StatCard
          label="On/Above Quota"
          value="21"
          sub="surveyors"
          accent="green"
        />
        <StatCard
          label="Below Quota"
          value="3"
          sub="need follow-up"
          accent="red"
        />
        <StatCard
          label="Avg per Surveyor"
          value="179"
          sub="responses submitted"
          accent="blue"
        />
      </div>
      <Card style={{ overflow: "hidden" }}>
        <CardHeader
          title="Per-Surveyor Progress"
          right={
            <span style={{ fontSize: 12, color: "var(--gray2)" }}>
              Quota: 200 responses
            </span>
          }
        />
        <div style={{ padding: 20 }}>
          {[
            {
              name: "Juanito Bautista",
              area: "Pusok, Agus",
              done: 218,
              quota: 200,
            },
            {
              name: "Maricel Delos Reyes",
              area: "Mactan",
              done: 193,
              quota: 200,
            },
            {
              name: "Ramon Salazar",
              area: "Buaya, Looc",
              done: 112,
              quota: 200,
            },
            { name: "Lourdes Magsino", area: "Basak", done: 188, quota: 200 },
            {
              name: "Edwin Pacquiao",
              area: "Gun-ob, Ibo",
              done: 68,
              quota: 200,
            },
            {
              name: "Teresita Robles",
              area: "Pajac, Pajo",
              done: 205,
              quota: 200,
            },
          ].map((s) => {
            const pct = Math.min(100, Math.round((s.done / s.quota) * 100));
            const color =
              pct >= 95
                ? "var(--success)"
                : pct >= 70
                ? "var(--warn)"
                : "var(--danger)";
            const textColor =
              pct >= 95 ? "#6FCF97" : pct >= 70 ? "var(--warn)" : "#EF9A9A";
            return (
              <div key={s.name} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</div>
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "center" }}
                  >
                    <div style={{ fontSize: 11, color: "var(--gray2)" }}>
                      {s.area}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--gray2)" }}>
                      {s.done} / {s.quota}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: textColor,
                        minWidth: 40,
                        textAlign: "right",
                      }}
                    >
                      {pct}%
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: 7,
                    background: "rgba(255,255,255,.08)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: 7,
                      background: color,
                      borderRadius: 4,
                      transition: "width .5s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  </div>
);

// ── MANAGE CANDIDATES ──
const ManageCandidates = ({ candidates, setCandidates }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [bulkChecked, setBulkChecked] = useState([]);
  const [bulkPartyId, setBulkPartyId] = useState(1);
  const [bulkMode, setBulkMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    position: "President",
    partyId: 1,
    waves: [1, 2, 3, 4, 5],
  });

  const [watchWarning, setWatchWarning] = useState(null); // { position, max }

  const toggleWatch = (id) => {
    const target = candidates.find((c) => c.id === id);
    const pos = target.position;
    const maxWatch = POSITION_MAX_WINNERS[pos] ?? 1;
    const currentWatchCount = candidates.filter(
      (c) => c.position === pos && c.watched
    ).length;

    if (!target.watched && currentWatchCount >= maxWatch) {
      setWatchWarning({ position: pos, max: maxWatch });
      setTimeout(() => setWatchWarning(null), 4000);
      return;
    }
    setWatchWarning(null);

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return { ...c, watched: !target.watched };
      })
    );
  };

  // For single-winner positions, toggling on must turn off all others in same position
  const toggleWatchSafe = (id) => {
    const target = candidates.find((c) => c.id === id);
    const pos = target.position;
    const maxWatch = POSITION_MAX_WINNERS[pos] ?? 1;

    if (maxWatch === 1) {
      // single winner: unwatch others in same position first
      const currentWatchCount = candidates.filter(
        (c) => c.position === pos && c.watched
      ).length;
      if (!target.watched && currentWatchCount >= 1) {
        setWatchWarning({ position: pos, max: 1 });
        setTimeout(() => setWatchWarning(null), 4000);
        return;
      }
      setWatchWarning(null);
      setCandidates((prev) =>
        prev.map((c) => {
          if (c.position === pos)
            return { ...c, watched: c.id === id ? !target.watched : false };
          return c;
        })
      );
    } else {
      toggleWatch(id);
    }
  };

  const filtered = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const watchCountForPosition = (pos) =>
    candidates.filter((c) => c.position === pos && c.watched).length;
  const maxWatchForPosition = (pos) => POSITION_MAX_WINNERS[pos] ?? 1;
  const positionAtLimit = (pos) =>
    watchCountForPosition(pos) >= maxWatchForPosition(pos);

  const addCandidate = () => {
    const party = PARTIES.find((p) => p.id === form.partyId);
    const color = party?.color || "#9A9488";
    setCandidates((prev) => [
      ...prev,
      { ...form, color, id: Date.now(), watched: false },
    ]);
    setShowModal(false);
  };

  const toggleBulkCheck = (id) =>
    setBulkChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleSelectAll = () =>
    setBulkChecked(
      bulkChecked.length === filtered.length ? [] : filtered.map((c) => c.id)
    );

  const applyBulkAssign = () => {
    const party = PARTIES.find((p) => p.id === bulkPartyId);
    setCandidates((prev) =>
      prev.map((c) =>
        bulkChecked.includes(c.id)
          ? { ...c, partyId: bulkPartyId, color: party?.color || c.color }
          : c
      )
    );
    setBulkChecked([]);
    setBulkMode(false);
    setShowBulkAssign(false);
  };

  return (
    <div>
      <Topbar
        title="Manage Candidates"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" size="sm" onClick={() => setShowImport(true)}>
              ⬆ Bulk Import
            </Btn>
            <Btn
              variant={bulkMode ? "danger" : "ghost"}
              size="sm"
              onClick={() => {
                setBulkMode((m) => !m);
                setBulkChecked([]);
              }}
            >
              {bulkMode ? "✕ Cancel Bulk" : "☑ Bulk Assign Party"}
            </Btn>
            <Btn variant="gold" size="sm" onClick={() => setShowModal(true)}>
              + Add Candidate
            </Btn>
          </div>
        }
      />
      <div style={{ padding: 28 }}>
        {/* Bulk assign action bar */}
        {bulkMode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: "rgba(232,184,75,.1)",
              border: "1px solid rgba(232,184,75,.25)",
              borderRadius: "var(--r)",
              marginBottom: 16,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600 }}
            >
              {bulkChecked.length === 0
                ? "Check candidates below to bulk-assign party"
                : `${bulkChecked.length} candidate${
                    bulkChecked.length > 1 ? "s" : ""
                  } selected`}
            </span>
            {bulkChecked.length > 0 && (
              <>
                <select
                  value={bulkPartyId}
                  onChange={(e) => setBulkPartyId(+e.target.value)}
                  style={{
                    background: "var(--navy3)",
                    border: "1px solid rgba(255,255,255,.15)",
                    borderRadius: "var(--r-sm)",
                    padding: "7px 12px",
                    color: "var(--white)",
                    fontSize: 13,
                    outline: "none",
                  }}
                >
                  {PARTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {/* Color preview */}
                {(() => {
                  const p = PARTIES.find((x) => x.id === bulkPartyId);
                  return (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        background: p?.color,
                        border: "1px solid rgba(255,255,255,.2)",
                      }}
                    />
                  );
                })()}
                <Btn variant="gold" size="sm" onClick={applyBulkAssign}>
                  Apply to {bulkChecked.length} candidates
                </Btn>
              </>
            )}
          </div>
        )}

        {/* Watch limit warning */}
        {watchWarning && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              background: "rgba(214,64,69,.12)",
              border: "1px solid rgba(214,64,69,.3)",
              borderRadius: "var(--r)",
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontSize: 13, color: "#EF9A9A" }}>
              <b>{watchWarning.position}</b> already has{" "}
              {watchWarning.max === 1
                ? "a watched candidate"
                : `${watchWarning.max} watched candidates (maximum reached)`}
              .
              {watchWarning.max === 1
                ? " Unwatch the current selection first."
                : " Unwatch one before adding another."}
            </span>
          </div>
        )}

        <Card style={{ overflow: "hidden" }}>
          <CardHeader
            title="Registered Candidates"
            right={
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates..."
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "var(--r-sm)",
                  padding: "6px 12px",
                  color: "var(--white)",
                  fontSize: 12,
                  outline: "none",
                  width: 200,
                }}
              />
            }
          />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {bulkMode && (
                  <th
                    style={{
                      padding: "9px 14px",
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        bulkChecked.length === filtered.length &&
                        filtered.length > 0
                      }
                      onChange={toggleSelectAll}
                      style={{ accentColor: "var(--gold)", cursor: "pointer" }}
                    />
                  </th>
                )}
                {["", "Name", "Position", "Party", "Watch", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".7px",
                        color: "var(--gray3)",
                        padding: "9px 18px",
                        textAlign: "left",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const party = PARTIES.find((p) => p.id === c.partyId);
                const partyColor = party?.color || c.color || "#9A9488";
                const isChecked = bulkChecked.includes(c.id);
                const maxWatch = maxWatchForPosition(c.position);
                const watchCount = watchCountForPosition(c.position);
                const isMultiWinner = maxWatch > 1;
                const atLimit = positionAtLimit(c.position);
                const watchBtnDisabled = !c.watched && atLimit;
                return (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,.04)",
                      background: isChecked
                        ? "rgba(232,184,75,.07)"
                        : "transparent",
                    }}
                  >
                    {bulkMode && (
                      <td style={{ padding: "11px 14px" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBulkCheck(c.id)}
                          style={{
                            accentColor: "var(--gold)",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    )}
                    <td style={{ padding: "11px 18px" }}>
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: 3,
                          background: partyColor,
                        }}
                      />
                    </td>
                    <td style={{ padding: "11px 18px", fontWeight: 600 }}>
                      {c.name}
                      {c.watched && <WatchedStar />}
                    </td>
                    <td style={{ padding: "11px 18px" }}>
                      <Badge color="gold">{c.position}</Badge>
                    </td>
                    <td style={{ padding: "11px 18px" }}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          fontSize: 12,
                          color: "var(--gray2)",
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: partyColor,
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        {party?.name || "—"}
                      </span>
                    </td>
                    <td style={{ padding: "11px 18px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Btn
                          variant={c.watched ? "watchActive" : "watch"}
                          onClick={() => toggleWatchSafe(c.id)}
                          disabled={watchBtnDisabled}
                        >
                          {c.watched ? "★ Watching" : "☆ Watch"}
                        </Btn>
                        {isMultiWinner && (
                          <span
                            style={{
                              fontSize: 10,
                              color:
                                atLimit && !c.watched
                                  ? "#EF9A9A"
                                  : "var(--gray3)",
                              fontFamily: "var(--font-head)",
                              fontWeight: 700,
                            }}
                          >
                            {watchCount}/{maxWatch}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "11px 18px" }}>
                      <Btn variant="ghost" size="sm">
                        Edit
                      </Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div
          style={{
            marginTop: 14,
            padding: "12px 16px",
            background: "rgba(232,184,75,.08)",
            border: "1px solid rgba(232,184,75,.2)",
            borderRadius: "var(--r)",
            fontSize: 12,
            color: "var(--gray2)",
          }}
        >
          ★ <b style={{ color: "var(--gold)" }}>Watch</b> marks the candidate
          you are monitoring/working for per position. Only one candidate per
          position can be watched at a time. Only Super Admin can set this.
        </div>
      </div>

      {/* Add Candidate Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Candidate"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Candidate Name"
            fullWidth
          />
          <Select
            label="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            options={POSITIONS}
          />
          <Select
            label="Political Party"
            value={form.partyId}
            onChange={(e) => setForm({ ...form, partyId: +e.target.value })}
            options={PARTIES.map((p) => ({ value: p.id, label: p.name }))}
            fullWidth
          />
          {(() => {
            const selectedParty = PARTIES.find((p) => p.id === form.partyId);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  gridColumn: "1/-1",
                }}
              >
                <label
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".7px",
                    color: "var(--gray2)",
                  }}
                >
                  Party Color (auto-assigned from party)
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "var(--r-sm)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background: selectedParty?.color || "#9A9488",
                      border: "1px solid rgba(255,255,255,.2)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--gray2)",
                      fontFamily: "monospace",
                    }}
                  >
                    {selectedParty?.color || "#9A9488"}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--gray3)" }}>
                    — {selectedParty?.name}
                  </span>
                </div>
              </div>
            );
          })()}
          <div style={{ gridColumn: "1/-1" }}>
            <label
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".7px",
                color: "var(--gray2)",
                display: "block",
                marginBottom: 8,
              }}
            >
              Include in Survey Waves
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {[1, 2, 3, 4, 5].map((w) => (
                <label
                  key={w}
                  style={{
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.waves.includes(w)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        waves: e.target.checked
                          ? [...form.waves, w]
                          : form.waves.filter((x) => x !== w),
                      })
                    }
                  />
                  Wave {w}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Btn>
          <Btn variant="gold" onClick={addCandidate}>
            Add Candidate
          </Btn>
        </div>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        open={showImport}
        onClose={() => setShowImport(false)}
        title="Bulk Import Candidates"
        width={560}
      >
        <div
          style={{
            padding: "14px 16px",
            background: "rgba(255,255,255,.04)",
            borderRadius: "var(--r-sm)",
            marginBottom: 16,
            fontSize: 12,
            color: "var(--gray2)",
            lineHeight: 1.8,
          }}
        >
          Upload an Excel (.xlsx) file with the following columns:
          <br />
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "monospace",
              fontSize: 11,
            }}
          >
            name | position | party_name | waves (e.g. 1,2,3,4,5)
          </span>
          <br />
          <span style={{ fontSize: 11, color: "var(--gray3)" }}>
            Party color is auto-assigned from the Political Parties table.
            Ensure party names match exactly.
          </span>
        </div>
        <div
          style={{
            border: "2px dashed rgba(255,255,255,.15)",
            borderRadius: "var(--r)",
            padding: "30px",
            textAlign: "center",
            marginBottom: 16,
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
          <div style={{ fontSize: 13, color: "var(--gray2)" }}>
            Click to upload or drag & drop your Excel file here
          </div>
          <div style={{ fontSize: 11, color: "var(--gray3)", marginTop: 4 }}>
            .xlsx or .xls supported — ideal for bulk entries like city
            councilors, senators, board members
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Btn variant="ghost" size="sm" onClick={() => {}}>
            ⬇ Download Sample Template
          </Btn>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setShowImport(false)}>
              Cancel
            </Btn>
            <Btn variant="gold">Import Candidates</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ── USER ACCOUNTS ──
const UserAccounts = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState("");
  const area = AREAS[0];
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "Surveyor",
    barangay: area.barangays[0].name,
    sitio: area.barangays[0].sitios[0],
    quota: 200,
    requiresPwChange: false,
    waves: "All Waves",
  });

  const selectedBrgy = area.barangays.find((b) => b.name === form.barangay);
  const sitios = selectedBrgy?.sitios || [];

  const statusColor = (s) =>
    ({
      Active: { bg: "rgba(34,168,110,.2)", c: "#6FCF97" },
      Behind: { bg: "rgba(232,151,58,.2)", c: "var(--warn)" },
      Inactive: { bg: "rgba(255,255,255,.08)", c: "var(--gray2)" },
    }[s] || {});

  const addUser = () => {
    setUsers((prev) => [
      ...prev,
      {
        ...form,
        id: Date.now(),
        submissions: 0,
        lastActive: "Never",
        status: "Active",
      },
    ]);
    setShowModal(false);
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar
        title="User Account Management"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" size="sm" onClick={() => setShowImport(true)}>
              ⬆ Import Excel
            </Btn>
            <Btn variant="gold" size="sm" onClick={() => setShowModal(true)}>
              + Create User
            </Btn>
          </div>
        }
      />
      <div style={{ padding: 28 }}>
        <Card style={{ overflow: "hidden" }}>
          <CardHeader
            title="All User Accounts"
            right={
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "var(--r-sm)",
                  padding: "6px 12px",
                  color: "var(--white)",
                  fontSize: 12,
                  outline: "none",
                  width: 200,
                }}
              />
            }
          />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Username",
                  "Role",
                  "Barangay",
                  "Sitio/Purok",
                  "Submissions",
                  "Last Active",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".7px",
                      color: "var(--gray3)",
                      padding: "9px 16px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const sc = statusColor(u.status);
                return (
                  <tr
                    key={u.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                  >
                    <td style={{ padding: "11px 16px", fontWeight: 600 }}>
                      {u.name}
                    </td>
                    <td
                      style={{
                        padding: "11px 16px",
                        color: "var(--gray2)",
                        fontSize: 12,
                      }}
                    >
                      {u.username}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <Badge color={u.role === "Super Admin" ? "gold" : "blue"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td style={{ padding: "11px 16px", fontSize: 12 }}>
                      {u.barangay}
                    </td>
                    <td
                      style={{
                        padding: "11px 16px",
                        fontSize: 12,
                        color: "var(--gray2)",
                      }}
                    >
                      {u.sitio}
                    </td>
                    <td style={{ padding: "11px 16px", fontSize: 12 }}>
                      {u.submissions === 0 ? "—" : u.submissions}
                    </td>
                    <td
                      style={{
                        padding: "11px 16px",
                        fontSize: 12,
                        color: "var(--gray2)",
                      }}
                    >
                      {u.lastActive}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <span
                        style={{
                          background: sc.bg,
                          color: sc.c,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "3px 9px",
                          borderRadius: 20,
                          textTransform: "uppercase",
                        }}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <Btn variant="ghost" size="sm">
                        Edit
                      </Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Create User Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create Surveyor Account"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Juan dela Cruz"
          />
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="e.g. jdelacruz"
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
          <Select
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            options={["Surveyor", "Admin", "Viewer"]}
          />
          <Select
            label="Assigned Barangay"
            value={form.barangay}
            onChange={(e) => {
              const brgy = area.barangays.find(
                (b) => b.name === e.target.value
              );
              setForm({
                ...form,
                barangay: e.target.value,
                sitio: brgy?.sitios[0] || "",
              });
            }}
            options={area.barangays.map((b) => b.name)}
          />
          <Select
            label="Assigned Sitio/Purok"
            value={form.sitio}
            onChange={(e) => setForm({ ...form, sitio: e.target.value })}
            options={sitios}
          />
          <Input
            label="Survey Quota"
            type="number"
            value={form.quota}
            onChange={(e) => setForm({ ...form, quota: +e.target.value })}
          />
          <Select
            label="Active Waves"
            value={form.waves}
            onChange={(e) => setForm({ ...form, waves: e.target.value })}
            options={["All Waves", "Wave 3 Only", "Wave 4 Only", "Wave 5 Only"]}
          />
          <div
            style={{
              gridColumn: "1/-1",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="checkbox"
              id="pwchange"
              checked={form.requiresPwChange}
              onChange={(e) =>
                setForm({ ...form, requiresPwChange: e.target.checked })
              }
              style={{ accentColor: "var(--gold)", width: 14, height: 14 }}
            />
            <label
              htmlFor="pwchange"
              style={{ fontSize: 13, cursor: "pointer" }}
            >
              Require password change on first login
            </label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Btn>
          <Btn variant="gold" onClick={addUser}>
            Create Account
          </Btn>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        open={showImport}
        onClose={() => setShowImport(false)}
        title="Import Surveyors via Excel"
      >
        <div
          style={{
            padding: "16px",
            background: "rgba(255,255,255,.04)",
            borderRadius: "var(--r-sm)",
            marginBottom: 16,
            fontSize: 12,
            color: "var(--gray2)",
            lineHeight: 1.7,
          }}
        >
          Upload an Excel (.xlsx) file with the following columns:
          <br />
          <span style={{ color: "var(--gold)", fontFamily: "monospace" }}>
            name | username | password | role | barangay | sitio | quota |
            require_pw_change
          </span>
        </div>
        <div
          style={{
            border: "2px dashed rgba(255,255,255,.15)",
            borderRadius: "var(--r)",
            padding: "32px",
            textAlign: "center",
            marginBottom: 16,
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
          <div style={{ fontSize: 13, color: "var(--gray2)" }}>
            Click to upload or drag & drop your Excel file here
          </div>
          <div style={{ fontSize: 11, color: "var(--gray3)", marginTop: 4 }}>
            .xlsx or .xls supported
          </div>
        </div>
        <div
          style={{ display: "flex", gap: 10, justifyContent: "space-between" }}
        >
          <Btn variant="ghost" size="sm" onClick={() => {}}>
            ⬇ Download Sample Format
          </Btn>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setShowImport(false)}>
              Cancel
            </Btn>
            <Btn variant="gold">Import Surveyors</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ── AUDIT TRAIL ──
const AuditTrail = () => (
  <div>
    <Topbar
      title="Audit Trail"
      right={
        <Btn variant="ghost" size="sm">
          Export Log
        </Btn>
      }
    />
    <div style={{ padding: 28 }}>
      <Card style={{ overflow: "hidden" }}>
        <CardHeader
          title="All System Actions"
          right={
            <input
              placeholder="Filter by user or action..."
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: "var(--r-sm)",
                padding: "6px 12px",
                color: "var(--white)",
                fontSize: 12,
                outline: "none",
                width: 240,
              }}
            />
          }
        />
        <div style={{ padding: "8px 0" }}>
          {AUDIT_LOG.map((log, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "11px 20px",
                borderBottom: "1px solid rgba(255,255,255,.04)",
                fontSize: 12,
              }}
            >
              <div style={{ color: "var(--gray3)", minWidth: 140 }}>
                {log.time}
              </div>
              <div
                style={{ color: "var(--gold)", minWidth: 120, fontWeight: 600 }}
              >
                {log.user}
              </div>
              <div style={{ color: "var(--white)", flex: 1 }}>{log.action}</div>
              <div
                style={{
                  color: log.warn ? "var(--warn)" : "var(--gray3)",
                  fontSize: 11,
                }}
              >
                {log.ip}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// ── POLITICAL PARTIES ──
const PoliticalParties = () => {
  const [parties, setParties] = useState(PARTIES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", color: "#1A6FC4" });
  return (
    <div>
      <Topbar
        title="Political Parties"
        right={
          <Btn variant="gold" size="sm" onClick={() => setShowModal(true)}>
            + Add Party
          </Btn>
        }
      />
      <div style={{ padding: 28 }}>
        <Card style={{ overflow: "hidden" }}>
          <CardHeader title="Registered Political Parties" />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["", "Party Name", "Color Code", "Candidates", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".7px",
                        color: "var(--gray3)",
                        padding: "9px 18px",
                        textAlign: "left",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {parties.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                >
                  <td style={{ padding: "11px 18px" }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: p.color,
                      }}
                    />
                  </td>
                  <td style={{ padding: "11px 18px", fontWeight: 600 }}>
                    {p.name}
                  </td>
                  <td style={{ padding: "11px 18px" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "var(--gray2)",
                      }}
                    >
                      {p.color}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "11px 18px",
                      color: "var(--gray2)",
                      fontSize: 12,
                    }}
                  >
                    —
                  </td>
                  <td style={{ padding: "11px 18px" }}>
                    <Btn variant="ghost" size="sm">
                      Edit
                    </Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Political Party"
      >
        <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
          <Input
            label="Party Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Partido Pagbabago"
            fullWidth
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".7px",
                color: "var(--gray2)",
              }}
            >
              Party Color
            </label>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              style={{
                height: 44,
                width: "100%",
                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: "var(--r-sm)",
                cursor: "pointer",
                background: "none",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Btn>
          <Btn
            variant="gold"
            onClick={() => {
              setParties((p) => [...p, { ...form, id: Date.now() }]);
              setShowModal(false);
            }}
          >
            Add Party
          </Btn>
        </div>
      </Modal>
    </div>
  );
};

// ── MANAGE AREAS ──
const ManageAreas = () => {
  const [areas, setAreas] = useState(AREAS);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({ name: "", type: "city" });
  return (
    <div>
      <Topbar
        title="Manage Areas"
        right={
          <Btn variant="gold" size="sm" onClick={() => setShowModal(true)}>
            + Add Area
          </Btn>
        }
      />
      <div style={{ padding: 28 }}>
        {areas.map((area) => (
          <Card key={area.id} style={{ marginBottom: 16, overflow: "hidden" }}>
            <div
              onClick={() => setExpanded(expanded === area.id ? null : area.id)}
              style={{
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {area.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--gray3)",
                    marginTop: 2,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {area.type} · {area.barangays.length} barangays
                </div>
              </div>
              <div style={{ color: "var(--gray3)" }}>
                {expanded === area.id ? "▲" : "▼"}
              </div>
            </div>
            {expanded === area.id && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,.07)",
                  padding: "14px 20px",
                }}
              >
                {area.barangays.map((b) => (
                  <div key={b.id} style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        marginBottom: 6,
                        color: "var(--gold)",
                      }}
                    >
                      Brgy. {b.name}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {b.sitios.map((s) => (
                        <span
                          key={s}
                          style={{
                            background: "rgba(255,255,255,.06)",
                            border: "1px solid rgba(255,255,255,.1)",
                            borderRadius: "var(--r-sm)",
                            padding: "3px 10px",
                            fontSize: 11,
                            color: "var(--gray2)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                      <span
                        style={{
                          background: "rgba(232,184,75,.1)",
                          border: "1px solid rgba(232,184,75,.2)",
                          borderRadius: "var(--r-sm)",
                          padding: "3px 10px",
                          fontSize: 11,
                          color: "var(--gold)",
                          cursor: "pointer",
                        }}
                      >
                        + Add Sitio
                      </span>
                    </div>
                  </div>
                ))}
                <Btn variant="ghost" size="sm" style={{ marginTop: 8 }}>
                  + Add Barangay
                </Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Area"
      >
        <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
          <Input
            label="Area Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Lapu-Lapu City"
            fullWidth
          />
          <Select
            label="Election Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              {
                value: "city",
                label: "City / Municipal (add barangays + sitios)",
              },
              {
                value: "province",
                label: "Provincial (add cities/municipalities)",
              },
              { value: "national", label: "National (country level)" },
            ]}
            fullWidth
          />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Btn>
          <Btn
            variant="gold"
            onClick={() => {
              setAreas((p) => [
                ...p,
                { ...form, id: Date.now(), barangays: [] },
              ]);
              setShowModal(false);
            }}
          >
            Create Area
          </Btn>
        </div>
      </Modal>
    </div>
  );
};

// ── NEW SURVEY ──
const NewSurvey = ({ candidates }) => {
  const [form, setForm] = useState({
    wave: 3,
    nickname: "",
    date: "",
    positions: [{ position: "Mayor", maxAnswers: 1, ask2ndChoice: false }],
    surveyors: [],
    area: "",
  });
  const [saved, setSaved] = useState(false);
  const posOptions = POSITIONS;

  const addPosition = () =>
    setForm((f) => ({
      ...f,
      positions: [
        ...f.positions,
        { position: "Councilor", maxAnswers: 8, ask2ndChoice: false },
      ],
    }));
  const removePosition = (i) =>
    setForm((f) => ({
      ...f,
      positions: f.positions.filter((_, idx) => idx !== i),
    }));

  const handleSubmit = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const surveyorList = [
    { id: 2, name: "Juanito Bautista" },
    { id: 3, name: "Maricel Delos Reyes" },
    { id: 4, name: "Ramon Salazar" },
    { id: 5, name: "Edwin Pacquiao" },
    { id: 6, name: "Teresita Robles" },
  ];

  return (
    <div>
      <Topbar title="Create New Survey" badge="Admin Only" />
      <div style={{ padding: 28 }}>
        {saved && (
          <div
            style={{
              background: "rgba(34,168,110,.15)",
              border: "1px solid rgba(34,168,110,.3)",
              borderRadius: "var(--r)",
              padding: "12px 18px",
              marginBottom: 20,
              color: "#6FCF97",
              fontSize: 13,
            }}
          >
            ✓ Survey job created and dispatched to selected surveyors!
          </div>
        )}
        <Card style={{ padding: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <Select
              label="Survey Wave"
              value={form.wave}
              onChange={(e) => setForm({ ...form, wave: +e.target.value })}
              options={WAVES.map((w) => ({ value: w.id, label: w.label }))}
            />
            <Input
              label="Survey Nickname"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              placeholder="e.g. Mactan Barangay Survey Wave 3"
            />
            <Input
              label="Survey Date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Select
              label="Select Area"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              options={[
                { value: "", label: "Select area..." },
                ...AREAS.map((a) => ({ value: a.name, label: a.name })),
              ]}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 4,
                color: "var(--gold)",
              }}
            >
              Survey Positions
            </div>
            <div
              style={{ fontSize: 11, color: "var(--gray3)", marginBottom: 12 }}
            >
              For each position, optionally enable "Ask 2nd Choice" — the
              surveyor will ask:{" "}
              <em style={{ color: "var(--gray2)" }}>
                "If this candidate cannot run, who would be your next choice?"
              </em>
            </div>
            {form.positions.map((pos, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "var(--r-sm)",
                  padding: "14px 16px",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 160px 40px",
                    gap: 10,
                    marginBottom: pos.ask2ndChoice ? 12 : 0,
                    alignItems: "end",
                  }}
                >
                  <Select
                    label={`Position ${i + 1}`}
                    value={pos.position}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        positions: f.positions.map((p, idx) =>
                          idx === i ? { ...p, position: e.target.value } : p
                        ),
                      }))
                    }
                    options={posOptions}
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".7px",
                        color: "var(--gray2)",
                      }}
                    >
                      Max Answers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={pos.maxAnswers}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          positions: f.positions.map((p, idx) =>
                            idx === i
                              ? { ...p, maxAnswers: +e.target.value }
                              : p
                          ),
                        }))
                      }
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.12)",
                        borderRadius: "var(--r-sm)",
                        padding: "9px 12px",
                        color: "var(--white)",
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                  </div>
                  {i > 0 ? (
                    <button
                      onClick={() => removePosition(i)}
                      style={{
                        background: "rgba(214,64,69,.15)",
                        border: "1px solid rgba(214,64,69,.3)",
                        borderRadius: "var(--r-sm)",
                        color: "var(--danger)",
                        cursor: "pointer",
                        padding: "9px",
                        alignSelf: "flex-end",
                      }}
                    >
                      ✕
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
                {/* 2nd Choice toggle */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    cursor: "pointer",
                    padding: "10px 12px",
                    background: pos.ask2ndChoice
                      ? "rgba(232,184,75,.08)"
                      : "rgba(255,255,255,.03)",
                    border: `1px solid ${
                      pos.ask2ndChoice
                        ? "rgba(232,184,75,.3)"
                        : "rgba(255,255,255,.08)"
                    }`,
                    borderRadius: "var(--r-sm)",
                    transition: "all .15s",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!pos.ask2ndChoice}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        positions: f.positions.map((p, idx) =>
                          idx === i
                            ? { ...p, ask2ndChoice: e.target.checked }
                            : p
                        ),
                      }))
                    }
                    style={{
                      accentColor: "var(--gold)",
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: pos.ask2ndChoice
                          ? "var(--gold)"
                          : "var(--gray2)",
                      }}
                    >
                      Ask 2nd Choice for {pos.position}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray3)",
                        marginTop: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      Surveyor will ask:{" "}
                      <span
                        style={{ color: "var(--gray2)", fontStyle: "italic" }}
                      >
                        "If your first choice cannot run, who would be your
                        second choice?"
                      </span>
                    </div>
                    {pos.ask2ndChoice && (
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            background: "rgba(232,184,75,.15)",
                            color: "var(--gold)",
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontWeight: 700,
                          }}
                        >
                          1ST CHOICE
                        </span>
                        <span style={{ fontSize: 11, color: "var(--gray3)" }}>
                          then
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            background: "rgba(26,111,196,.15)",
                            color: "#64B5F6",
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontWeight: 700,
                          }}
                        >
                          2ND CHOICE
                        </span>
                        <span style={{ fontSize: 11, color: "var(--gray3)" }}>
                          will appear in results as separate columns
                        </span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            ))}
            <Btn variant="ghost" size="sm" onClick={addPosition}>
              + Add Position
            </Btn>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 12,
                color: "var(--gold)",
              }}
            >
              Assign Surveyors
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 10,
              }}
            >
              {surveyorList.map((s) => (
                <label
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,.04)",
                    border: `1px solid ${
                      form.surveyors.includes(s.id)
                        ? "var(--gold)"
                        : "rgba(255,255,255,.1)"
                    }`,
                    borderRadius: "var(--r-sm)",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.surveyors.includes(s.id)}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        surveyors: e.target.checked
                          ? [...f.surveyors, s.id]
                          : f.surveyors.filter((x) => x !== s.id),
                      }))
                    }
                    style={{ accentColor: "var(--gold)" }}
                  />
                  <span style={{ fontSize: 13 }}>{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="ghost">Save Draft</Btn>
            <Btn variant="gold" onClick={handleSubmit}>
              Create & Dispatch Survey
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ── SURVEY SECTIONS (used inside Surveyor App survey screen) ──
const SURVEY_SECTIONS = [
  {
    label: "National — President",
    question: "Who would you vote for as President?",
    name: "pres",
    ask2nd: true,
    opts: [
      { name: "Carina Espinosa", party: "Partido Pagbabago", color: "#1A6FC4" },
      { name: "Rodrigo Salcedo", party: "PDP-Laban", color: "#D64045" },
      { name: "Lino Magsaysay", party: "Nationalist Party", color: "#D9622B" },
      { name: "Undecided", party: "", color: "#888" },
    ],
  },
  {
    label: "Local — Mayor",
    question: "Who would you vote for as Mayor of Lapu-Lapu City?",
    name: "mayor",
    ask2nd: false,
    opts: [
      { name: "Juan dela Cruz", party: "Partido Pagbabago", color: "#1A6FC4" },
      { name: "Maria Santos", party: "PDP-Laban", color: "#D64045" },
      { name: "Pedro Reyes", party: "Independent", color: "#888" },
    ],
  },
];

const SurveySections = () => {
  // Track 1st choice selection per section: { [sectionName]: optName }
  const [firstChoices, setFirstChoices] = useState({});

  return (
    <>
      {SURVEY_SECTIONS.map((section) => {
        const selected1st = firstChoices[section.name] || null;

        const OptList = ({ nameKey, is2nd }) => (
          <div style={{ marginBottom: section.ask2nd ? 10 : 0 }}>
            {section.opts.map((opt) => {
              const disabledIn2nd = is2nd && opt.name === selected1st;
              return (
                <label
                  key={opt.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 10,
                    marginBottom: 7,
                    border: is2nd
                      ? `1.5px solid ${
                          disabledIn2nd
                            ? "rgba(0,0,0,.08)"
                            : "rgba(26,111,196,.25)"
                        }`
                      : "1.5px solid #D0CCB8",
                    background: disabledIn2nd
                      ? "#F0EDE8"
                      : is2nd
                      ? "rgba(26,111,196,.04)"
                      : "#fff",
                    cursor: disabledIn2nd ? "not-allowed" : "pointer",
                    opacity: disabledIn2nd ? 0.45 : 1,
                    transition: "all .15s",
                  }}
                >
                  <input
                    type="radio"
                    name={nameKey}
                    disabled={disabledIn2nd}
                    onChange={() => {
                      if (!is2nd) {
                        setFirstChoices((prev) => ({
                          ...prev,
                          [section.name]: opt.name,
                        }));
                      }
                    }}
                    style={{ accentColor: "#0D1B2E", flexShrink: 0 }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: disabledIn2nd ? "#CCC" : opt.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      flex: 1,
                      color: disabledIn2nd ? "#AAA" : "#1A1A2E",
                    }}
                  >
                    {opt.name}
                  </span>
                  {opt.party && (
                    <span
                      style={{
                        fontSize: 10,
                        color: disabledIn2nd ? "#BBB" : "#888",
                      }}
                    >
                      {opt.party}
                    </span>
                  )}
                  {disabledIn2nd && (
                    <span
                      style={{
                        fontSize: 9,
                        color: "#AAA",
                        fontStyle: "italic",
                        marginLeft: 4,
                      }}
                    >
                      your 1st choice
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        );

        return (
          <div key={section.label}>
            {/* Section header */}
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 12,
                fontWeight: 700,
                color: "#1A1A2E",
                background: "rgba(10,22,40,.08)",
                padding: "9px 12px",
                borderRadius: 8,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: ".4px",
              }}
            >
              {section.label}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#2C2C3A",
                marginBottom: 8,
              }}
            >
              {section.question}
            </div>

            {/* 1st choice label */}
            {section.ask2nd && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 7,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: "rgba(232,184,75,.15)",
                    color: "var(--gold)",
                  }}
                >
                  1ST CHOICE
                </span>
                <span
                  style={{ fontSize: 11, color: "#555", fontStyle: "italic" }}
                >
                  Who is your first choice?
                </span>
              </div>
            )}

            <OptList nameKey={`${section.name}_1st`} is2nd={false} />

            {/* 2nd choice block */}
            {section.ask2nd && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    margin: "10px 0 8px",
                    padding: "8px 12px",
                    background: "rgba(26,111,196,.08)",
                    border: "1px solid rgba(26,111,196,.2)",
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 16 }}>💭</span>
                  <span
                    style={{ fontSize: 11, color: "#5B9FD4", lineHeight: 1.4 }}
                  >
                    <b>If your first choice cannot run,</b> who would be your
                    second choice?
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background: "rgba(26,111,196,.15)",
                      color: "#64B5F6",
                    }}
                  >
                    2ND CHOICE
                  </span>
                  <span
                    style={{ fontSize: 11, color: "#555", fontStyle: "italic" }}
                  >
                    Who is your second choice?
                  </span>
                  {!selected1st && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#FFAA00",
                        marginLeft: 4,
                        fontStyle: "italic",
                      }}
                    >
                      ← select 1st choice first
                    </span>
                  )}
                </div>
                <OptList nameKey={`${section.name}_2nd`} is2nd={true} />
              </>
            )}

            <div style={{ height: 12 }} />
          </div>
        );
      })}
    </>
  );
};

// ── SURVEYOR APP ──
const SurveyorApp = () => {
  const [screen, setScreen] = useState("login");
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationWarning, setLocationWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pwChange, setPwChange] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [pwDone, setPwDone] = useState(false);

  const handleLogin = () => {
    if (!locationGranted) {
      setLocationWarning(true);
      return;
    }
    setLocationWarning(false);
    // Simulate first login pw change
    setPwChange(true);
    setScreen("pwchange");
  };

  const handlePwChange = () => {
    if (newPw && newPw === newPw2) {
      setPwDone(true);
      setScreen("dashboard");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setScreen("dashboard");
    }, 2000);
  };

  const PhoneWrapper = ({ children }) => (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div
        style={{
          width: 390,
          minHeight: 720,
          background: "#F0EDE8",
          borderRadius: 32,
          border: "8px solid #1A1A2E",
          boxShadow: "0 30px 80px rgba(0,0,0,.6)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 120,
            height: 28,
            background: "#1A1A2E",
            borderRadius: "0 0 20px 20px",
            margin: "0 auto",
          }}
        />
        {children}
      </div>
    </div>
  );

  if (screen === "login")
    return (
      <div>
        <Topbar
          title="Surveyor Mobile App — Preview"
          badge="Front-End Preview"
          right={
            <div style={{ display: "flex", gap: 8 }}>
              <Btn
                variant="ghost"
                size="sm"
                onClick={() => setScreen("dashboard")}
              >
                Dashboard
              </Btn>
              <Btn
                variant="ghost"
                size="sm"
                onClick={() => setScreen("survey")}
              >
                Survey Screen
              </Btn>
            </div>
          }
        />
        <PhoneWrapper>
          <div
            style={{
              background: "var(--navy)",
              minHeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
            }}
          >
            <PulsePhilLogo size={80} />
            <div style={{ marginTop: 10, marginBottom: 4 }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "1px",
                  lineHeight: 1,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#E8E8F0" }}>PULSE</span>
                <span style={{ color: "#E04040" }}>PHIL</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "center",
                  marginTop: 3,
                }}
              >
                <div style={{ width: 16, height: 2, background: "#4A7FCC" }} />
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "3px",
                    color: "var(--gray2)",
                    fontWeight: 600,
                  }}
                >
                  SURVEY
                </div>
                <div style={{ width: 16, height: 2, background: "#E04040" }} />
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--gray3)",
                textAlign: "center",
                marginBottom: 28,
                letterSpacing: ".5px",
              }}
            >
              REAL VOICES. REAL INSIGHTS. REAL CHANGE.
              <br />
              <span style={{ color: "var(--gray3)", fontSize: 10 }}>
                Surveyor Access Portal
              </span>
            </div>
            <input
              type="text"
              defaultValue="jbautista"
              placeholder="Username"
              style={{
                width: "100%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "var(--white)",
                fontSize: 14,
                marginBottom: 10,
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
            />
            <input
              type="password"
              defaultValue="••••••••"
              placeholder="Password"
              style={{
                width: "100%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "var(--white)",
                fontSize: 14,
                marginBottom: 10,
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
            />
            <select
              style={{
                width: "100%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "var(--white)",
                fontSize: 13,
                marginBottom: 12,
                outline: "none",
              }}
            >
              <option>Wave 3 — 6 Months Before Election</option>
              <option>Wave 4 — 2 Months Before Election</option>
            </select>

            {/* Location toggle */}
            <div
              onClick={() => {
                setLocationGranted(!locationGranted);
                setLocationWarning(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: locationGranted
                  ? "rgba(34,168,110,.15)"
                  : "rgba(214,64,69,.1)",
                border: `1px solid ${
                  locationGranted ? "rgba(34,168,110,.3)" : "rgba(214,64,69,.3)"
                }`,
                borderRadius: 10,
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              <span>{locationGranted ? "📍" : "🚫"}</span>
              <span
                style={{
                  fontSize: 11,
                  color: locationGranted ? "#6FCF97" : "#EF9A9A",
                }}
              >
                {locationGranted
                  ? "Location services: ON"
                  : "Location services: OFF (tap to enable)"}
              </span>
            </div>
            {locationWarning && (
              <div
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "rgba(214,64,69,.15)",
                  border: "1px solid rgba(214,64,69,.3)",
                  borderRadius: 8,
                  fontSize: 11,
                  color: "#EF9A9A",
                  marginBottom: 10,
                }}
              >
                ⚠ Please enable location services before signing in.
              </div>
            )}

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 10,
                border: "none",
                background: "var(--gold)",
                color: "var(--navy)",
                fontFamily: "var(--font-head)",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Sign In →
            </button>
          </div>
        </PhoneWrapper>
      </div>
    );

  if (screen === "pwchange")
    return (
      <div>
        <Topbar
          title="Surveyor Mobile App — Preview"
          badge="Front-End Preview"
        />
        <PhoneWrapper>
          <div
            style={{
              background: "var(--navy)",
              minHeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔐</div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--gold)",
                marginBottom: 6,
              }}
            >
              Change Your Password
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--gray2)",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Your administrator requires you to set a new password before
              continuing.
            </div>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="New password"
              style={{
                width: "100%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "var(--white)",
                fontSize: 14,
                marginBottom: 10,
                outline: "none",
              }}
            />
            <input
              type="password"
              value={newPw2}
              onChange={(e) => setNewPw2(e.target.value)}
              placeholder="Confirm new password"
              style={{
                width: "100%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "var(--white)",
                fontSize: 14,
                marginBottom: 12,
                outline: "none",
              }}
            />
            {newPw && newPw !== newPw2 && (
              <div style={{ fontSize: 11, color: "#EF9A9A", marginBottom: 10 }}>
                Passwords do not match.
              </div>
            )}
            <button
              onClick={handlePwChange}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 10,
                border: "none",
                background: "var(--gold)",
                color: "var(--navy)",
                fontFamily: "var(--font-head)",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Set New Password
            </button>
          </div>
        </PhoneWrapper>
      </div>
    );

  if (screen === "dashboard")
    return (
      <div>
        <Topbar
          title="Surveyor Mobile App — Preview"
          badge="Front-End Preview"
          right={
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" size="sm" onClick={() => setScreen("login")}>
                Login
              </Btn>
              <Btn
                variant="ghost"
                size="sm"
                onClick={() => setScreen("survey")}
              >
                Survey Screen
              </Btn>
            </div>
          }
        />
        <PhoneWrapper>
          <div
            style={{ background: "#F0EDE8", minHeight: 700, color: "#1A1A2E" }}
          >
            <div
              style={{
                background: "var(--navy)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: ".5px",
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: "var(--white)" }}>PULSE</span>
                  <span style={{ color: "#E04040" }}>PHIL</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--gray2)",
                      fontWeight: 400,
                      marginLeft: 4,
                    }}
                  >
                    Survey
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "var(--gray2)" }}>
                  Surveyor: J. Bautista
                </div>
              </div>
              <div
                style={{
                  background: "rgba(232,184,75,.2)",
                  color: "var(--gold)",
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                Wave 3
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1A1A2E",
                  marginBottom: 14,
                }}
              >
                Available Survey Jobs
              </div>

              {/* Survey job card */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  border: "1.5px solid #D0CCB8",
                  marginBottom: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1A1A2E",
                      }}
                    >
                      Wave 3 — Mactan Survey
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                      Due: April 25, 2026
                    </div>
                  </div>
                  <span
                    style={{
                      background: "rgba(34,168,110,.15)",
                      color: "#1B8A5A",
                      fontSize: 10,
                      padding: "3px 8px",
                      borderRadius: 10,
                      fontWeight: 700,
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {[
                    ["📍 Barangay", "Pusok"],
                    ["🏘 Sitio/Purok", "Sitio Silangan"],
                    ["🎯 Quota", "200 responses"],
                    ["✅ Completed", "218 / 200"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        background: "#F8F6F0",
                        borderRadius: 8,
                        padding: "8px 10px",
                      }}
                    >
                      <div style={{ fontSize: 10, color: "#888" }}>{k}</div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#1A1A2E",
                          marginTop: 2,
                        }}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setScreen("survey")}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: 10,
                    border: "none",
                    background: "#0D1B2E",
                    color: "var(--gold)",
                    fontFamily: "var(--font-head)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Start Survey →
                </button>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  border: "1.5px dashed #D0CCB8",
                  textAlign: "center",
                  color: "#AAA",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>📋</div>
                <div style={{ fontSize: 12 }}>
                  No other survey jobs available
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1A1A2E",
                    marginBottom: 10,
                  }}
                >
                  Your Progress
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: "12px 14px",
                    border: "1.5px solid #D0CCB8",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#555" }}>
                      Wave 3 Completion
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1B8A5A",
                      }}
                    >
                      109%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "#E8E4DC",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 8,
                        background: "#1B8A5A",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
                    218 of 200 quota submitted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PhoneWrapper>
      </div>
    );

  if (screen === "survey")
    return (
      <div>
        <Topbar
          title="Surveyor Mobile App — Preview"
          badge="Front-End Preview"
          right={
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" size="sm" onClick={() => setScreen("login")}>
                Login
              </Btn>
              <Btn
                variant="ghost"
                size="sm"
                onClick={() => setScreen("dashboard")}
              >
                Dashboard
              </Btn>
            </div>
          }
        />
        <PhoneWrapper>
          <div
            style={{ background: "#F0EDE8", minHeight: 700, color: "#1A1A2E" }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 700,
                  padding: 32,
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 48 }}>✅</div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1A1A2E",
                  }}
                >
                  Survey Submitted!
                </div>
                <div
                  style={{ fontSize: 12, color: "#888", textAlign: "center" }}
                >
                  Location captured: 10.3157° N, 123.9000° E — Brgy. Agus
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: "var(--navy)",
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: ".5px",
                      }}
                    >
                      <span style={{ color: "var(--white)" }}>PULSE</span>
                      <span style={{ color: "#E04040" }}>PHIL</span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--gray2)",
                          fontWeight: 400,
                          marginLeft: 4,
                        }}
                      >
                        Wave 3 Survey
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--gray2)" }}>
                      Surveyor: J. Bautista | Brgy. Agus
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(232,184,75,.2)",
                      color: "var(--gold)",
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontWeight: 600,
                    }}
                  >
                    3/5
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,.1)", height: 3 }}>
                  <div
                    style={{
                      background: "var(--gold)",
                      height: 3,
                      width: "60%",
                    }}
                  />
                </div>
                <div style={{ padding: 18, overflowY: "auto", maxHeight: 580 }}>
                  <input
                    placeholder="Respondent name (optional)"
                    style={{
                      width: "100%",
                      background: "#fff",
                      border: "1.5px solid #D0CCB8",
                      borderRadius: 10,
                      padding: "11px 14px",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      marginBottom: 14,
                      outline: "none",
                      color: "#1A1A2E",
                    }}
                  />

                  <SurveySections />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(34,168,110,.1)",
                      border: "1px solid rgba(34,168,110,.2)",
                      borderRadius: 8,
                      padding: "9px 12px",
                      fontSize: 11,
                      color: "#1B8A5A",
                      marginBottom: 12,
                    }}
                  >
                    <span>📍</span>
                    <span>
                      Location captured: 10.3157° N, 123.9000° E — Brgy. Agus
                    </span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      padding: 14,
                      borderRadius: 12,
                      border: "none",
                      background: "#0D1B2E",
                      color: "var(--gold)",
                      fontFamily: "var(--font-head)",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Submit Survey ✓
                  </button>
                </div>
              </>
            )}
          </div>
        </PhoneWrapper>
      </div>
    );

  return null;
};

// ══════════════════════════════════════════════
// LOGO SVG COMPONENT
// ══════════════════════════════════════════════
const PulsePhilLogo = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer blue circle ring */}
    <circle
      cx="58"
      cy="56"
      r="50"
      stroke="#1A3A8C"
      strokeWidth="6"
      fill="none"
    />
    {/* Red swoosh bottom arc */}
    <path
      d="M18 80 Q58 115 98 80"
      stroke="#C0181E"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Philippine sun rays (gold) */}
    <g transform="translate(28,44)">
      <circle cx="0" cy="0" r="9" fill="#F5C518" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <line
          key={i}
          x1={Math.cos((deg * Math.PI) / 180) * 10}
          y1={Math.sin((deg * Math.PI) / 180) * 10}
          x2={Math.cos((deg * Math.PI) / 180) * 17}
          y2={Math.sin((deg * Math.PI) / 180) * 17}
          stroke="#F5C518"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
    </g>
    {/* Stars (gold) */}
    {[
      [50, 14],
      [72, 22],
      [64, 8],
    ].map(([x, y], i) => (
      <polygon
        key={i}
        points={`${x},${y - 5} ${x + 1.5},${y - 1.5} ${x + 5},${y - 1.5} ${
          x + 2.2
        },${y + 1} ${x + 3},${y + 4.5} ${x},${y + 2.5} ${x - 3},${y + 4.5} ${
          x - 2.2
        },${y + 1} ${x - 5},${y - 1.5} ${x - 1.5},${y - 1.5}`}
        fill="#F5C518"
      />
    ))}
    {/* Bold navy P letter */}
    <text
      x="36"
      y="78"
      fontFamily="Arial Black, sans-serif"
      fontSize="52"
      fontWeight="900"
      fill="#1A3A8C"
    >
      P
    </text>
    {/* Pulse / heartbeat line across P (white) */}
    <polyline
      points="34,56 42,56 45,44 48,68 51,50 54,62 58,56 70,56"
      stroke="white"
      strokeWidth="2.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bar chart (blue + red) */}
    <rect x="78" y="58" width="8" height="20" rx="1.5" fill="#1A6FC4" />
    <rect x="88" y="48" width="8" height="30" rx="1.5" fill="#1A6FC4" />
    <rect x="98" y="38" width="8" height="40" rx="1.5" fill="#C0181E" />
  </svg>
);

const PulsePhilWordmark = ({ dark = false }) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <div
      style={{
        fontFamily: "var(--font-head)",
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "1px",
        lineHeight: 1,
      }}
    >
      <span style={{ color: dark ? "#1A3A8C" : "#E8E8F0" }}>PULSE</span>
      <span style={{ color: "#C0181E" }}>PHIL</span>
    </div>
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}
    >
      <div style={{ width: 18, height: 2, background: "#1A3A8C" }} />
      <div
        style={{
          fontSize: 9,
          letterSpacing: "3px",
          color: dark ? "#444" : "var(--gray2)",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        SURVEY
      </div>
      <div style={{ width: 18, height: 2, background: "#C0181E" }} />
    </div>
  </div>
);

// ══════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════
const NAV = [
  {
    section: "Analytics",
    items: [
      { id: "dashboard", icon: "◉", label: "Dashboard" },
      { id: "results", icon: "▦", label: "Candidate Results" },
      { id: "map", icon: "⊕", label: "Geo Map" },
      { id: "barangay", icon: "≡", label: "Barangay Breakdown" },
    ],
  },
  {
    section: "Operations",
    items: [
      { id: "completion", icon: "◎", label: "Completion Tracker", badge: "3" },
      { id: "candidates", icon: "◈", label: "Manage Candidates" },
      { id: "users", icon: "⊛", label: "User Accounts" },
      { id: "parties", icon: "⚑", label: "Political Parties" },
      { id: "areas", icon: "⊞", label: "Manage Areas" },
      { id: "newsur", icon: "✦", label: "New Survey", adminOnly: true },
      { id: "audit", icon: "◫", label: "Audit Trail" },
    ],
  },
  {
    section: "Preview",
    items: [{ id: "surveyor", icon: "☎", label: "Surveyor App" }],
  },
];

// ══════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [wave, setWave] = useState(3);
  const [candidates, setCandidates] = useState(INIT_CANDIDATES);
  const [users, setUsers] = useState(INIT_USERS);

  const screens = {
    dashboard: (
      <Dashboard wave={wave} setWave={setWave} candidates={candidates} />
    ),
    results: <Results wave={wave} candidates={candidates} />,
    map: <GeoMap />,
    barangay: <BarangayBreakdown candidates={candidates} />,
    completion: <CompletionTracker />,
    candidates: (
      <ManageCandidates candidates={candidates} setCandidates={setCandidates} />
    ),
    users: <UserAccounts users={users} setUsers={setUsers} />,
    parties: <PoliticalParties />,
    areas: <ManageAreas />,
    newsur: <NewSurvey candidates={candidates} />,
    audit: <AuditTrail />,
    surveyor: <SurveyorApp />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <nav
        style={{
          width: 232,
          background: "var(--navy2)",
          borderRight: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "16px 18px 14px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <PulsePhilLogo size={42} />
            <PulsePhilWordmark />
          </div>
          <div
            style={{
              fontSize: 9,
              color: "var(--gray3)",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              marginTop: 5,
            }}
          >
            Real Voices. Real Insights. Real Change.
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {NAV.map((group) => (
            <div key={group.section}>
              <div
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "1.4px",
                  color: "var(--gray3)",
                  padding: "14px 18px 5px",
                }}
              >
                {group.section}
              </div>
              {group.items.map((item) => {
                const active = screen === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setScreen(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 18px",
                      fontSize: 12.5,
                      color: active ? "var(--gold)" : "var(--gray2)",
                      cursor: "pointer",
                      borderLeft: `3px solid ${
                        active ? "var(--gold)" : "transparent"
                      }`,
                      background: active
                        ? "rgba(232,184,75,.08)"
                        : "transparent",
                      transition: "all .12s",
                    }}
                  >
                    <span
                      style={{ width: 15, textAlign: "center", fontSize: 13 }}
                    >
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          background: "var(--gold)",
                          color: "var(--navy)",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "1px 5px",
                          borderRadius: 10,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.adminOnly && (
                      <span
                        style={{
                          background: "rgba(214,64,69,.2)",
                          color: "#EF9A9A",
                          fontSize: 9,
                          padding: "1px 5px",
                          borderRadius: 10,
                        }}
                      >
                        Admin
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 18px",
            borderTop: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--navy3)",
              border: "2px solid var(--gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gold)",
            }}
          >
            SA
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Super Admin</div>
            <div
              style={{
                fontSize: 10,
                color: "var(--gold)",
                textTransform: "uppercase",
                letterSpacing: ".4px",
              }}
            >
              Administrator
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ flex: 1, overflowY: "auto", background: "var(--navy)" }}>
        {screens[screen]}
      </main>
    </div>
  );
}
