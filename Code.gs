<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Sistem Manajemen Anggaran</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #ffffff;
    --bg2: #f5f5f4;
    --bg3: #eeece8;
    --text: #1a1a18;
    --text2: #6b6b67;
    --text3: #a0a09b;
    --border: rgba(0,0,0,0.10);
    --border2: rgba(0,0,0,0.18);
    --radius: 8px;
    --radius-lg: 12px;
    --shadow: 0 1px 3px rgba(0,0,0,0.07);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #18181b;
      --bg2: #222226;
      --bg3: #2a2a2f;
      --text: #f0f0ed;
      --text2: #9b9b96;
      --text3: #6b6b67;
      --border: rgba(255,255,255,0.08);
      --border2: rgba(255,255,255,0.14);
      --shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: var(--text);
    background: var(--bg3);
    min-height: 100vh;
  }

  /* ── Layout ── */
  .layout { display: flex; min-height: 100vh; }

  .sidebar {
    width: 220px;
    flex-shrink: 0;
    background: var(--bg);
    border-right: 0.5px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-brand {
    padding: 20px 18px 16px;
    border-bottom: 0.5px solid var(--border);
  }
  .sidebar-brand .logo {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .sidebar-brand .logo-icon {
    width: 32px; height: 32px;
    background: #185FA5;
    border-radius: var(--radius);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 16px;
  }
  .sidebar-brand .logo-text { font-size: 14px; font-weight: 600; }
  .sidebar-brand .logo-sub { font-size: 11px; color: var(--text2); margin-top: 1px; }

  .sidebar-nav { padding: 12px 10px; flex: 1; }
  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--text3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0 8px;
    margin: 14px 0 6px;
  }
  .nav-section-label:first-child { margin-top: 0; }

  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 13px;
    color: var(--text2);
    transition: all 0.15s;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }
  .nav-item i { font-size: 16px; flex-shrink: 0; }
  .nav-item:hover { background: var(--bg2); color: var(--text); }
  .nav-item.active { background: #EBF3FC; color: #185FA5; font-weight: 500; }
  @media (prefers-color-scheme: dark) {
    .nav-item.active { background: #0a2440; color: #7BBFF0; }
  }
  .nav-badge {
    margin-left: auto;
    background: #FCEBEB; color: #A32D2D;
    font-size: 10px; font-weight: 600;
    padding: 2px 6px; border-radius: 10px;
  }
  @media (prefers-color-scheme: dark) {
    .nav-badge { background: #501313; color: #F7C1C1; }
  }

  .main { margin-left: 220px; flex: 1; }

  .topbar {
    background: var(--bg);
    border-bottom: 0.5px solid var(--border);
    padding: 0 24px;
    height: 52px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 30;
  }
  .topbar h1 { font-size: 15px; font-weight: 600; }
  .topbar .topbar-right { display: flex; align-items: center; gap: 8px; }

  .content { padding: 24px; }

  /* ── Cards / Metrics ── */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }
  .metric-card {
    background: var(--bg);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
  }
  .metric-card .mc-label {
    font-size: 11px;
    color: var(--text2);
    margin-bottom: 6px;
    display: flex; align-items: center; gap: 5px;
  }
  .metric-card .mc-value { font-size: 20px; font-weight: 600; }
  .mc-value.blue { color: #185FA5; }
  .mc-value.green { color: #3B6D11; }
  .mc-value.red { color: #A32D2D; }
  .mc-value.amber { color: #854F0B; }
  .mc-value.purple { color: #534AB7; }
  @media (prefers-color-scheme: dark) {
    .mc-value.blue { color: #7BBFF0; }
    .mc-value.green { color: #C0DD97; }
    .mc-value.red { color: #F7C1C1; }
    .mc-value.amber { color: #FAC775; }
    .mc-value.purple { color: #CECBF6; }
  }

  /* ── Section header ── */
  .section-hdr {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
    flex-wrap: wrap; gap: 8px;
  }
  .section-hdr h2 { font-size: 14px; font-weight: 600; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border-radius: var(--radius);
    border: 0.5px solid var(--border2);
    background: transparent;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    color: var(--text);
    transition: all 0.15s;
  }
  .btn:hover { background: var(--bg2); }
  .btn i { font-size: 15px; }
  .btn-primary { background: #185FA5; color: #fff; border-color: #185FA5; }
  .btn-primary:hover { background: #0C447C; border-color: #0C447C; }
  .btn-sm { padding: 4px 10px; font-size: 11px; }
  .btn-danger { color: #A32D2D; border-color: #F09595; }
  .btn-danger:hover { background: #FCEBEB; }
  @media (prefers-color-scheme: dark) {
    .btn-danger:hover { background: #501313; }
  }
  .btn-action { background: #EBF3FC; color: #185FA5; border-color: #B5D4F4; }
  .btn-action:hover { background: #d0e7f8; }
  @media (prefers-color-scheme: dark) {
    .btn-action { background: #0a2440; color: #7BBFF0; border-color: #185FA5; }
    .btn-action:hover { background: #102f55; }
  }

  /* ── Filters ── */
  .filter-row {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .filter-row select, .filter-row input[type="text"] {
    padding: 7px 11px;
    border: 0.5px solid var(--border2);
    border-radius: var(--radius);
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
    cursor: pointer;
  }
  .filter-row select:focus, .filter-row input:focus { outline: none; border-color: #185FA5; }

  /* ── Table ── */
  .table-wrap {
    background: var(--bg);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 20px;
  }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    background: var(--bg2);
    padding: 9px 14px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: var(--text2);
    border-bottom: 0.5px solid var(--border);
    white-space: nowrap;
  }
  thead th.r { text-align: right; }
  thead th.c { text-align: center; }
  tbody tr { border-bottom: 0.5px solid var(--border); }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--bg2); }
  tbody td {
    padding: 10px 14px;
    font-size: 12px;
    vertical-align: middle;
  }
  tbody td.r { text-align: right; font-variant-numeric: tabular-nums; }
  tbody td.c { text-align: center; }

  .item-name-cell .name { font-weight: 500; }
  .item-name-cell .sub { font-size: 11px; color: var(--text2); margin-top: 1px; }

  /* ── Badges ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 500;
    padding: 3px 9px; border-radius: 20px;
    white-space: nowrap;
  }
  .badge i { font-size: 12px; }
  .badge-ok      { background: #EAF3DE; color: #3B6D11; }
  .badge-warn    { background: #FAEEDA; color: #854F0B; }
  .badge-over    { background: #FCEBEB; color: #A32D2D; }
  .badge-lock    { background: #EEEDFE; color: #3C3489; }
  .badge-pending { background: #E6F1FB; color: #185FA5; }
  .badge-gray    { background: #F1EFE8; color: #5F5E5A; }
  @media (prefers-color-scheme: dark) {
    .badge-ok      { background: #1e3d08; color: #C0DD97; }
    .badge-warn    { background: #3d2103; color: #FAC775; }
    .badge-over    { background: #3d0a0a; color: #F7C1C1; }
    .badge-lock    { background: #1e1a42; color: #CECBF6; }
    .badge-pending { background: #031929; color: #7BBFF0; }
    .badge-gray    { background: #2a2a27; color: #B4B2A9; }
  }

  /* ── Progress bar ── */
  .progress { background: var(--bg2); border-radius: 4px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
  .p-ok   { background: #639922; }
  .p-warn { background: #BA7517; }
  .p-over { background: #E24B4A; }
  .p-lock { background: #534AB7; }

  .progress-cell { display: flex; align-items: center; gap: 8px; }
  .progress-cell .progress { width: 70px; flex-shrink: 0; }
  .progress-cell .pct { font-size: 11px; color: var(--text2); min-width: 28px; }

  /* ── Dot indicator ── */
  .dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; display: inline-block; }

  .dept-cell { display: flex; align-items: center; gap: 7px; }

  /* ── Charts ── */
  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 20px;
  }
  @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr; } }
  .chart-card {
    background: var(--bg);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px 18px;
  }
  .chart-card h3 {
    font-size: 12px;
    font-weight: 600;
    color: var(--text2);
    margin-bottom: 14px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .bar-row {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 9px; font-size: 11px;
  }
  .bar-row .br-label {
    width: 95px; flex-shrink: 0;
    text-align: right;
    color: var(--text2);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .bar-row .br-bar { flex: 1; background: var(--bg2); border-radius: 3px; height: 14px; overflow: hidden; }
  .bar-row .br-fill { height: 100%; border-radius: 3px; }
  .bar-row .br-val { width: 50px; text-align: right; font-weight: 500; font-variant-numeric: tabular-nums; }

  /* ── Alert ── */
  .alert {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px;
    border-radius: var(--radius);
    margin-bottom: 16px;
    font-size: 12px;
  }
  .alert i { font-size: 17px; flex-shrink: 0; }
  .alert-danger { background: #FCEBEB; color: #791F1F; border: 0.5px solid #F09595; }
  @media (prefers-color-scheme: dark) {
    .alert-danger { background: #3d0a0a; color: #F7C1C1; border-color: #791F1F; }
  }

  /* ── Modal ── */
  .modal-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 100;
    align-items: center;
    justify-content: center;
  }
  .modal-overlay.open { display: flex; }
  .modal {
    background: var(--bg);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 22px 24px;
    width: 400px;
    max-width: 92vw;
    box-shadow: 0 8px 32px rgba(0,0,0,0.16);
  }
  .modal h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  .modal .modal-sub { font-size: 12px; color: var(--text2); margin-bottom: 18px; line-height: 1.5; }
  .form-group { margin-bottom: 13px; }
  .form-group label { display: block; font-size: 11px; font-weight: 500; color: var(--text2); margin-bottom: 5px; }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 8px 11px;
    border: 0.5px solid var(--border2);
    border-radius: var(--radius);
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
    font-family: inherit;
    transition: border-color 0.15s;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    outline: none; border-color: #185FA5;
  }
  .form-group input[type="color"] { height: 38px; padding: 3px 8px; cursor: pointer; }
  .form-group textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .modal-footer { display: flex; gap: 8px; justify-content: flex-end; margin-top: 18px; }

  /* ── Color swatch ── */
  .color-swatch { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; display: inline-block; }

  /* ── Empty state ── */
  .empty-state {
    padding: 32px;
    text-align: center;
    color: var(--text2);
  }
  .empty-state i { font-size: 32px; margin-bottom: 8px; display: block; color: var(--text3); }
  .empty-state p { font-size: 12px; }

  /* ── Toast ── */
  #toast {
    position: fixed;
    bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--text);
    color: var(--bg);
    padding: 9px 20px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.25s;
    pointer-events: none;
    white-space: nowrap;
  }
  #toast.show { opacity: 1; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .sidebar { width: 100%; height: auto; position: relative; flex-direction: row; }
    .sidebar-nav { display: flex; flex-direction: row; overflow-x: auto; gap: 2px; }
    .nav-item { white-space: nowrap; }
    .main { margin-left: 0; }
    .charts-grid { grid-template-columns: 1fr; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
</style>
</head>
<body>

<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">
        <div class="logo-icon"><i class="ti ti-chart-pie"></i></div>
        <div>
          <div class="logo-text">BudgetApp</div>
          <div class="logo-sub">Manajemen Anggaran</div>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Utama</div>
      <button class="nav-item active" onclick="gotoPage('dashboard')">
        <i class="ti ti-layout-dashboard"></i> Dashboard
      </button>
      <button class="nav-item" onclick="gotoPage('budget')">
        <i class="ti ti-receipt"></i> Anggaran
        <span class="nav-badge" id="nav-locked-badge" style="display:none"></span>
      </button>

      <div class="nav-section-label">Master Data</div>
      <button class="nav-item" onclick="gotoPage('dept')">
        <i class="ti ti-building"></i> Departemen
      </button>
      <button class="nav-item" onclick="gotoPage('cat')">
        <i class="ti ti-tag"></i> Kategori
      </button>
    </nav>
  </aside>

  <!-- Main -->
  <div class="main">
    <header class="topbar">
      <h1 id="page-title">Dashboard</h1>
      <div class="topbar-right">
        <span id="topbar-date" style="font-size:11px;color:var(--text2)"></span>
      </div>
    </header>

    <main class="content">
      <div id="page-dashboard"></div>
      <div id="page-budget" style="display:none"></div>
      <div id="page-dept" style="display:none"></div>
      <div id="page-cat" style="display:none"></div>
    </main>
  </div>
</div>

<!-- Modal -->
<div class="modal-overlay" id="modal-overlay">
  <div class="modal" id="modal-box"></div>
</div>

<!-- Toast -->
<div id="toast"></div>

<script>
/* ═══════════════════════════════════════
   DATABASE (in-memory)
═══════════════════════════════════════ */
const DB = {
  depts: [
    { id:1, name:'Keuangan',    desc:'Pengelolaan keuangan perusahaan',  color:'#185FA5', active:true },
    { id:2, name:'Operasional', desc:'Kegiatan operasional harian',      color:'#0F6E56', active:true },
    { id:3, name:'Marketing',   desc:'Pemasaran dan branding',           color:'#993C1D', active:true },
    { id:4, name:'Teknologi',   desc:'IT dan pengembangan sistem',       color:'#534AB7', active:true },
    { id:5, name:'SDM',         desc:'Sumber daya manusia',              color:'#854F0B', active:true },
  ],
  cats: [
    { id:1, name:'Gaji & Tunjangan',   desc:'Biaya tenaga kerja',          deptId:1, active:true },
    { id:2, name:'Operasional Kantor', desc:'ATK, utilitas, sewa',         deptId:2, active:true },
    { id:3, name:'Iklan & Promosi',    desc:'Digital dan konvensional',    deptId:3, active:true },
    { id:4, name:'Infrastruktur IT',   desc:'Server, lisensi, cloud',      deptId:4, active:true },
    { id:5, name:'Rekrutmen',          desc:'Seleksi dan onboarding',      deptId:5, active:true },
    { id:6, name:'Perjalanan Dinas',   desc:'Transportasi dan akomodasi',  deptId:2, active:true },
    { id:7, name:'Pelatihan',          desc:'Training dan sertifikasi',    deptId:5, active:true },
    { id:8, name:'Maintenance',        desc:'Perawatan aset',              deptId:2, active:true },
  ],
  items: [
    { id:1, name:'Gaji Karyawan Q2',  deptId:1, catId:1, budget:85000000, actual:85000000, locked:true,  requests:[] },
    { id:2, name:'Sewa Kantor',        deptId:2, catId:2, budget:25000000, actual:18500000, locked:false, requests:[] },
    { id:3, name:'Google Ads',         deptId:3, catId:3, budget:20000000, actual:22100000, locked:true,  requests:[] },
    { id:4, name:'AWS & Tools',        deptId:4, catId:4, budget:35000000, actual:27000000, locked:false, requests:[] },
    { id:5, name:'Rekrutmen Dev',      deptId:5, catId:5, budget:10000000, actual:8200000,  locked:false, requests:[] },
    { id:6, name:'Business Trip CEO',  deptId:2, catId:6, budget:8000000,  actual:9100000,  locked:true,  requests:[] },
    { id:7, name:'Training Backend',   deptId:4, catId:7, budget:6000000,  actual:4200000,  locked:false, requests:[] },
    { id:8, name:'ATK & Supplies',     deptId:2, catId:2, budget:5000000,  actual:3800000,  locked:false, requests:[] },
  ],
  requests: [],
  _nextDept: 6, _nextCat: 9, _nextItem: 9, _nextReq: 1,
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
const fmt  = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const fmtM = n => {
  const m = Math.round(n / 1000000);
  return m >= 1 ? `Rp ${m}jt` : `Rp ${Math.round(n/1000)}rb`;
};
const pct = (a, b) => b === 0 ? 0 : Math.min((a / b) * 100, 999);
const findDept = id => DB.depts.find(d => d.id === id);
const findCat  = id => DB.cats.find(c => c.id === id);
const todayStr = () => new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });

function getItemStatus(item) {
  if (item.locked) return { label:'Terkunci',    cls:'badge-lock', pcls:'p-lock' };
  const p = pct(item.actual, item.budget);
  if (p >= 100) return { label:'Melebihi',       cls:'badge-over', pcls:'p-over' };
  if (p >= 80)  return { label:'Hampir Habis',   cls:'badge-warn', pcls:'p-warn' };
  return           { label:'Aman',               cls:'badge-ok',   pcls:'p-ok'   };
}

function checkAutoLock() {
  DB.items.forEach(it => {
    if (!it.locked && it.actual >= it.budget) it.locked = true;
  });
}

function updateNavBadge() {
  const n = DB.items.filter(i => i.locked).length;
  const el = document.getElementById('nav-locked-badge');
  if (n > 0) { el.textContent = n; el.style.display = ''; }
  else el.style.display = 'none';
}

/* ═══════════════════════════════════════
   ROUTING
═══════════════════════════════════════ */
const pageTitles = {
  dashboard: 'Dashboard',
  budget:    'Manajemen Anggaran',
  dept:      'Master Departemen',
  cat:       'Master Kategori',
};

let currentPage = 'dashboard';

function gotoPage(pg) {
  checkAutoLock();
  updateNavBadge();
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('.nav-item');
  const idx = { dashboard:0, budget:1, dept:2, cat:3 };
  btns[idx[pg]]?.classList.add('active');

  document.querySelectorAll('.content > div').forEach(d => d.style.display = 'none');
  document.getElementById('page-' + pg).style.display = 'block';
  document.getElementById('page-title').textContent = pageTitles[pg];
  currentPage = pg;

  if (pg === 'dashboard') renderDashboard();
  else if (pg === 'budget') renderBudget();
  else if (pg === 'dept') renderDept();
  else if (pg === 'cat') renderCat();
}

/* ═══════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════ */
function renderDashboard() {
  checkAutoLock();
  const totalB = DB.items.reduce((s, i) => s + i.budget, 0);
  const totalA = DB.items.reduce((s, i) => s + i.actual, 0);
  const sisa   = totalB - totalA;
  const p      = totalB > 0 ? (totalA / totalB) * 100 : 0;
  const locked  = DB.items.filter(i => i.locked).length;
  const pending = DB.requests.filter(r => r.status === 'pending').length;
  const pCls   = p >= 100 ? 'red' : p >= 80 ? 'amber' : 'green';

  // Dept stats for chart
  const deptStats = DB.depts
    .filter(d => d.active)
    .map(d => {
      const its = DB.items.filter(i => i.deptId === d.id);
      const b = its.reduce((s, i) => s + i.budget, 0);
      const a = its.reduce((s, i) => s + i.actual, 0);
      return { ...d, b, a, p: pct(a, b) };
    })
    .filter(d => d.b > 0)
    .sort((a, b2) => b2.p - a.p);

  // Category stats
  const catStats = DB.cats
    .filter(c => c.active)
    .map(c => {
      const its = DB.items.filter(i => i.catId === c.id);
      const a = its.reduce((s, i) => s + i.actual, 0);
      const dpt = findDept(c.deptId);
      return { ...c, a, color: dpt ? dpt.color : '#888' };
    })
    .filter(c => c.a > 0)
    .sort((a, b2) => b2.a - a.a)
    .slice(0, 6);

  const maxCatA = Math.max(...catStats.map(c => c.a), 1);

  const overItems = DB.items.filter(i => i.locked);

  const el = document.getElementById('page-dashboard');
  el.innerHTML = `
    ${overItems.length > 0 ? `
    <div class="alert alert-danger">
      <i class="ti ti-alert-triangle"></i>
      <span><strong>${overItems.length} item</strong> anggaran terkunci karena melebihi batas — diperlukan pengajuan tambahan.</span>
    </div>` : ''}

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-wallet" style="font-size:13px"></i> Total Anggaran</div>
        <div class="mc-value blue">${fmt(totalB)}</div>
      </div>
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-trending-up" style="font-size:13px"></i> Total Terpakai</div>
        <div class="mc-value ${pCls}">${fmt(totalA)}</div>
      </div>
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-piggy-bank" style="font-size:13px"></i> Sisa Anggaran</div>
        <div class="mc-value ${sisa < 0 ? 'red' : 'green'}">${fmt(sisa)}</div>
      </div>
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-percent" style="font-size:13px"></i> Realisasi</div>
        <div class="mc-value ${pCls}">${p.toFixed(1)}%</div>
      </div>
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-lock" style="font-size:13px"></i> Item Terkunci</div>
        <div class="mc-value ${locked > 0 ? 'red' : 'green'}">${locked} item</div>
      </div>
      <div class="metric-card">
        <div class="mc-label"><i class="ti ti-clock" style="font-size:13px"></i> Pengajuan Pending</div>
        <div class="mc-value ${pending > 0 ? 'amber' : 'green'}">${pending} pengajuan</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3>Realisasi per departemen</h3>
        ${deptStats.length === 0 ? '<p style="font-size:12px;color:var(--text2)">Tidak ada data</p>' :
          deptStats.map(d => {
            const p2 = Math.min(d.p, 100);
            return `<div class="bar-row">
              <div class="br-label">${d.name}</div>
              <div class="br-bar"><div class="br-fill" style="width:${p2}%;background:${d.color}"></div></div>
              <div class="br-val" style="color:${d.p>=100?'#A32D2D':d.p>=80?'#854F0B':'var(--text2)'}">${Math.round(d.p)}%</div>
            </div>`;
          }).join('')}
      </div>
      <div class="chart-card">
        <h3>Top kategori pengeluaran</h3>
        ${catStats.length === 0 ? '<p style="font-size:12px;color:var(--text2)">Tidak ada data</p>' :
          catStats.map(c => `<div class="bar-row">
            <div class="br-label">${c.name}</div>
            <div class="br-bar"><div class="br-fill" style="width:${(c.a/maxCatA*100).toFixed(1)}%;background:${c.color}"></div></div>
            <div class="br-val" style="color:var(--text2)">${fmtM(c.a)}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section-hdr">
      <h2>Monitoring semua item</h2>
      <button class="btn btn-primary btn-sm" onclick="gotoPage('budget')"><i class="ti ti-arrow-right"></i> Lihat semua</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:22%">Item Anggaran</th>
          <th style="width:13%">Departemen</th>
          <th style="width:13%">Kategori</th>
          <th class="r" style="width:13%">Anggaran</th>
          <th class="r" style="width:13%">Aktual</th>
          <th style="width:14%">Realisasi</th>
          <th class="c" style="width:12%">Status</th>
        </tr></thead>
        <tbody>
          ${DB.items.map(it => {
            const st  = getItemStatus(it);
            const p2  = Math.min(pct(it.actual, it.budget), 100);
            const dpt = findDept(it.deptId);
            const ct  = findCat(it.catId);
            return `<tr>
              <td><div class="item-name-cell"><div class="name">${it.name}</div></div></td>
              <td><div class="dept-cell"><span class="dot" style="background:${dpt?dpt.color:'#888'}"></span>${dpt?dpt.name:'—'}</div></td>
              <td>${ct ? ct.name : '—'}</td>
              <td class="r">${fmtM(it.budget)}</td>
              <td class="r" style="color:${it.actual>it.budget?'#A32D2D':'inherit'}">${fmtM(it.actual)}</td>
              <td><div class="progress-cell">
                <div class="progress"><div class="progress-fill ${st.pcls}" style="width:${p2}%"></div></div>
                <span class="pct">${Math.round(p2)}%</span>
              </div></td>
              <td class="c"><span class="badge ${st.cls}">${st.label}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    ${DB.requests.length > 0 ? `
    <div class="section-hdr" style="margin-top:4px"><h2>Pengajuan tambahan anggaran</h2></div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:20%">Item</th>
          <th style="width:14%">Departemen</th>
          <th style="width:30%">Alasan</th>
          <th class="r" style="width:12%">Jumlah</th>
          <th style="width:10%">Tanggal</th>
          <th class="c" style="width:14%">Status / Aksi</th>
        </tr></thead>
        <tbody>
          ${DB.requests.slice().reverse().map(r => {
            const it  = DB.items.find(i => i.id === r.itemId);
            const dpt = it ? findDept(it.deptId) : null;
            const sMap = {
              pending:  ['badge-pending', 'Menunggu'],
              approved: ['badge-ok',      'Disetujui'],
              rejected: ['badge-over',    'Ditolak'],
            };
            const [cls, lbl] = sMap[r.status];
            const aksi = r.status === 'pending'
              ? `<button class="btn btn-sm" style="margin-right:4px;background:#EAF3DE;color:#3B6D11;border-color:#C0DD97" onclick="approveReq('${r.id}',true)">Setujui</button>
                 <button class="btn btn-sm btn-danger" onclick="approveReq('${r.id}',false)">Tolak</button>`
              : `<span class="badge ${cls}">${lbl}</span>`;
            return `<tr>
              <td><div class="name">${it ? it.name : '—'}</div></td>
              <td><div class="dept-cell"><span class="dot" style="background:${dpt?dpt.color:'#888'}"></span>${dpt?dpt.name:'—'}</div></td>
              <td style="color:var(--text2)">${r.reason}</td>
              <td class="r">+${fmtM(r.amount)}</td>
              <td style="color:var(--text2)">${r.date}</td>
              <td class="c">${aksi}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : ''}
  `;
}

/* ═══════════════════════════════════════
   BUDGET PAGE
═══════════════════════════════════════ */
let filterDept = 'all', filterCat = 'all', filterStatus = 'all';

function renderBudget() {
  checkAutoLock();
  const items = DB.items.filter(it => {
    if (filterDept !== 'all' && it.deptId !== parseInt(filterDept)) return false;
    if (filterCat  !== 'all' && it.catId  !== parseInt(filterCat))  return false;
    if (filterStatus === 'locked' && !it.locked) return false;
    if (filterStatus === 'ok'     &&  it.locked) return false;
    return true;
  });

  const el = document.getElementById('page-budget');
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:14px">
      <div class="filter-row" style="margin-bottom:0">
        <select onchange="filterDept=this.value;renderBudget()">
          <option value="all">Semua Departemen</option>
          ${DB.depts.filter(d=>d.active).map(d=>`<option value="${d.id}" ${filterDept==d.id?'selected':''}>${d.name}</option>`).join('')}
        </select>
        <select onchange="filterCat=this.value;renderBudget()">
          <option value="all">Semua Kategori</option>
          ${DB.cats.filter(c=>c.active).map(c=>`<option value="${c.id}" ${filterCat==c.id?'selected':''}>${c.name}</option>`).join('')}
        </select>
        <select onchange="filterStatus=this.value;renderBudget()">
          <option value="all">Semua Status</option>
          <option value="ok" ${filterStatus==='ok'?'selected':''}>Tidak Terkunci</option>
          <option value="locked" ${filterStatus==='locked'?'selected':''}>Terkunci</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="openAddItem()"><i class="ti ti-plus"></i> Tambah Item</button>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:20%">Item Anggaran</th>
          <th style="width:13%">Departemen</th>
          <th style="width:13%">Kategori</th>
          <th class="r" style="width:11%">Anggaran</th>
          <th class="r" style="width:11%">Aktual</th>
          <th class="r" style="width:9%">Sisa</th>
          <th style="width:11%">Realisasi</th>
          <th class="c" style="width:9%">Status</th>
          <th class="c" style="width:8%">Aksi</th>
        </tr></thead>
        <tbody>
          ${items.length === 0
            ? `<tr><td colspan="9"><div class="empty-state"><i class="ti ti-inbox"></i><p>Tidak ada data yang sesuai filter</p></div></td></tr>`
            : items.map(it => {
              const st   = getItemStatus(it);
              const p2   = Math.min(pct(it.actual, it.budget), 100);
              const dpt  = findDept(it.deptId);
              const ct   = findCat(it.catId);
              const sisa = it.budget - it.actual;
              const hasPending = DB.requests.some(r => r.itemId === it.id && r.status === 'pending');
              let aksi = '';
              if (it.locked) {
                aksi = hasPending
                  ? `<span class="badge badge-pending" style="font-size:10px"><i class="ti ti-clock"></i> Menunggu</span>`
                  : `<button class="btn btn-sm btn-action" onclick="openRequest(${it.id})"><i class="ti ti-send"></i> Ajukan</button>`;
              } else {
                aksi = `<button class="btn btn-sm" onclick="openActual(${it.id})"><i class="ti ti-plus"></i> Input</button>`;
              }
              return `<tr>
                <td>
                  <div class="item-name-cell">
                    <div class="name">${it.name}</div>
                    <div class="sub">#${it.id}</div>
                  </div>
                </td>
                <td><div class="dept-cell"><span class="dot" style="background:${dpt?dpt.color:'#888'}"></span>${dpt?dpt.name:'—'}</div></td>
                <td>${ct ? ct.name : '—'}</td>
                <td class="r">${fmtM(it.budget)}</td>
                <td class="r" style="color:${it.actual>it.budget?'#A32D2D':'inherit'}">${fmtM(it.actual)}</td>
                <td class="r" style="color:${sisa<0?'#A32D2D':'#3B6D11'}">${fmtM(sisa)}</td>
                <td><div class="progress-cell">
                  <div class="progress"><div class="progress-fill ${st.pcls}" style="width:${p2}%"></div></div>
                  <span class="pct">${Math.round(p2)}%</span>
                </div></td>
                <td class="c"><span class="badge ${st.cls}" style="font-size:10px">${st.label}</span></td>
                <td class="c">${aksi}</td>
              </tr>`;
            }).join('')}
        </tbody>
      </table>
    </div>

    ${DB.requests.length > 0 ? `
    <div class="section-hdr"><h2>Riwayat pengajuan</h2></div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:20%">Item</th>
          <th style="width:14%">Departemen</th>
          <th style="width:30%">Alasan</th>
          <th class="r" style="width:12%">Jumlah</th>
          <th style="width:10%">Tanggal</th>
          <th class="c" style="width:14%">Status / Aksi</th>
        </tr></thead>
        <tbody>
          ${DB.requests.slice().reverse().map(r => {
            const it  = DB.items.find(i => i.id === r.itemId);
            const dpt = it ? findDept(it.deptId) : null;
            const sMap = {
              pending:  ['badge-pending','Menunggu'],
              approved: ['badge-ok','Disetujui'],
              rejected: ['badge-over','Ditolak'],
            };
            const [cls, lbl] = sMap[r.status];
            const aksi = r.status === 'pending'
              ? `<button class="btn btn-sm" style="margin-right:4px;background:#EAF3DE;color:#3B6D11;border-color:#C0DD97" onclick="approveReq('${r.id}',true)">Setujui</button>
                 <button class="btn btn-sm btn-danger" onclick="approveReq('${r.id}',false)">Tolak</button>`
              : `<span class="badge ${cls}">${lbl}</span>`;
            return `<tr>
              <td><div class="name">${it?it.name:'—'}</div></td>
              <td><div class="dept-cell"><span class="dot" style="background:${dpt?dpt.color:'#888'}"></span>${dpt?dpt.name:'—'}</div></td>
              <td style="color:var(--text2)">${r.reason}</td>
              <td class="r">+${fmtM(r.amount)}</td>
              <td style="color:var(--text2)">${r.date}</td>
              <td class="c">${aksi}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : ''}
  `;
}

/* ═══════════════════════════════════════
   DEPT PAGE
═══════════════════════════════════════ */
function renderDept() {
  const el = document.getElementById('page-dept');
  el.innerHTML = `
    <div class="section-hdr">
      <h2>Database departemen</h2>
      <button class="btn btn-primary" onclick="openAddDept()"><i class="ti ti-plus"></i> Tambah Departemen</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:4%">#</th>
          <th style="width:18%">Nama</th>
          <th style="width:28%">Deskripsi</th>
          <th class="c" style="width:12%">Warna</th>
          <th class="r" style="width:10%">Item</th>
          <th class="r" style="width:10%">Kategori</th>
          <th class="c" style="width:10%">Status</th>
          <th class="c" style="width:14%">Aksi</th>
        </tr></thead>
        <tbody>
          ${DB.depts.length === 0
            ? `<tr><td colspan="8"><div class="empty-state"><i class="ti ti-building-off"></i><p>Belum ada departemen</p></div></td></tr>`
            : DB.depts.map((d, i) => {
              const itemCount = DB.items.filter(it => it.deptId === d.id).length;
              const catCount  = DB.cats.filter(c => c.deptId === d.id).length;
              return `<tr>
                <td style="color:var(--text2)">${i+1}</td>
                <td><strong>${d.name}</strong></td>
                <td style="color:var(--text2)">${d.desc}</td>
                <td class="c">
                  <div style="display:flex;align-items:center;justify-content:center;gap:6px">
                    <span class="color-swatch" style="background:${d.color}"></span>
                    <span style="font-size:11px;color:var(--text2)">${d.color}</span>
                  </div>
                </td>
                <td class="r">${itemCount}</td>
                <td class="r">${catCount}</td>
                <td class="c"><span class="badge ${d.active?'badge-ok':'badge-gray'}">${d.active?'Aktif':'Nonaktif'}</span></td>
                <td class="c">
                  <button class="btn btn-sm" onclick="openEditDept(${d.id})" style="margin-right:4px"><i class="ti ti-edit"></i> Edit</button>
                  <button class="btn btn-sm ${d.active?'btn-danger':''}" onclick="toggleDept(${d.id})">${d.active?'Nonaktifkan':'Aktifkan'}</button>
                </td>
              </tr>`;
            }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ═══════════════════════════════════════
   CAT PAGE
═══════════════════════════════════════ */
function renderCat() {
  const el = document.getElementById('page-cat');
  el.innerHTML = `
    <div class="section-hdr">
      <h2>Database kategori</h2>
      <button class="btn btn-primary" onclick="openAddCat()"><i class="ti ti-plus"></i> Tambah Kategori</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th style="width:4%">#</th>
          <th style="width:20%">Nama</th>
          <th style="width:28%">Deskripsi</th>
          <th style="width:18%">Departemen</th>
          <th class="r" style="width:10%">Item</th>
          <th class="c" style="width:10%">Status</th>
          <th class="c" style="width:10%">Aksi</th>
        </tr></thead>
        <tbody>
          ${DB.cats.length === 0
            ? `<tr><td colspan="7"><div class="empty-state"><i class="ti ti-tag-off"></i><p>Belum ada kategori</p></div></td></tr>`
            : DB.cats.map((c, i) => {
              const dpt = findDept(c.deptId);
              const itemCount = DB.items.filter(it => it.catId === c.id).length;
              return `<tr>
                <td style="color:var(--text2)">${i+1}</td>
                <td><strong>${c.name}</strong></td>
                <td style="color:var(--text2)">${c.desc}</td>
                <td><div class="dept-cell"><span class="dot" style="background:${dpt?dpt.color:'#888'}"></span>${dpt?dpt.name:'—'}</div></td>
                <td class="r">${itemCount}</td>
                <td class="c"><span class="badge ${c.active?'badge-ok':'badge-gray'}">${c.active?'Aktif':'Nonaktif'}</span></td>
                <td class="c">
                  <button class="btn btn-sm" onclick="openEditCat(${c.id})" style="margin-right:4px"><i class="ti ti-edit"></i> Edit</button>
                  <button class="btn btn-sm ${c.active?'btn-danger':''}" onclick="toggleCat(${c.id})">${c.active?'Nonaktifkan':'Aktifkan'}</button>
                </td>
              </tr>`;
            }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ═══════════════════════════════════════
   MODAL HELPERS
═══════════════════════════════════════ */
function openModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

/* ═══════════════════════════════════════
   DEPT CRUD
═══════════════════════════════════════ */
function openAddDept() {
  openModal(`
    <h3>Tambah Departemen</h3>
    <p class="modal-sub">Isi informasi departemen baru</p>
    <div class="form-group"><label>Nama departemen *</label><input id="m-name" placeholder="cth. Produksi"/></div>
    <div class="form-group"><label>Deskripsi</label><input id="m-desc" placeholder="Singkat deskripsi departemen"/></div>
    <div class="form-group"><label>Warna identitas</label><input id="m-color" type="color" value="#185FA5"/></div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveDept(0)"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function openEditDept(id) {
  const d = findDept(id);
  openModal(`
    <h3>Edit Departemen</h3>
    <p class="modal-sub">${d.name}</p>
    <div class="form-group"><label>Nama departemen *</label><input id="m-name" value="${d.name}"/></div>
    <div class="form-group"><label>Deskripsi</label><input id="m-desc" value="${d.desc}"/></div>
    <div class="form-group"><label>Warna identitas</label><input id="m-color" type="color" value="${d.color}"/></div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveDept(${id})"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function saveDept(id) {
  const name  = document.getElementById('m-name').value.trim();
  const desc  = document.getElementById('m-desc').value.trim();
  const color = document.getElementById('m-color').value;
  if (!name) { toast('Nama departemen wajib diisi'); return; }
  if (id === 0) {
    DB.depts.push({ id: DB._nextDept++, name, desc, color, active: true });
    toast('Departemen berhasil ditambahkan');
  } else {
    const d = findDept(id);
    d.name = name; d.desc = desc; d.color = color;
    toast('Departemen berhasil diperbarui');
  }
  closeModal(); renderDept();
}

function toggleDept(id) {
  const d = findDept(id);
  d.active = !d.active;
  renderDept();
  toast(d.active ? 'Departemen diaktifkan' : 'Departemen dinonaktifkan');
}

/* ═══════════════════════════════════════
   CAT CRUD
═══════════════════════════════════════ */
function openAddCat() {
  openModal(`
    <h3>Tambah Kategori</h3>
    <p class="modal-sub">Pilih departemen induk terlebih dahulu</p>
    <div class="form-group"><label>Nama kategori *</label><input id="m-name" placeholder="cth. Listrik & Air"/></div>
    <div class="form-group"><label>Deskripsi</label><input id="m-desc" placeholder="Singkat deskripsi"/></div>
    <div class="form-group"><label>Departemen *</label>
      <select id="m-dept">
        ${DB.depts.filter(d=>d.active).map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}
      </select>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveCat(0)"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function openEditCat(id) {
  const c = findCat(id);
  openModal(`
    <h3>Edit Kategori</h3>
    <p class="modal-sub">${c.name}</p>
    <div class="form-group"><label>Nama kategori *</label><input id="m-name" value="${c.name}"/></div>
    <div class="form-group"><label>Deskripsi</label><input id="m-desc" value="${c.desc}"/></div>
    <div class="form-group"><label>Departemen *</label>
      <select id="m-dept">
        ${DB.depts.filter(d=>d.active).map(d=>`<option value="${d.id}" ${d.id===c.deptId?'selected':''}>${d.name}</option>`).join('')}
      </select>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveCat(${id})"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function saveCat(id) {
  const name   = document.getElementById('m-name').value.trim();
  const desc   = document.getElementById('m-desc').value.trim();
  const deptId = parseInt(document.getElementById('m-dept').value);
  if (!name) { toast('Nama kategori wajib diisi'); return; }
  if (id === 0) {
    DB.cats.push({ id: DB._nextCat++, name, desc, deptId, active: true });
    toast('Kategori berhasil ditambahkan');
  } else {
    const c = findCat(id);
    c.name = name; c.desc = desc; c.deptId = deptId;
    toast('Kategori berhasil diperbarui');
  }
  closeModal(); renderCat();
}

function toggleCat(id) {
  const c = findCat(id);
  c.active = !c.active;
  renderCat();
  toast(c.active ? 'Kategori diaktifkan' : 'Kategori dinonaktifkan');
}

/* ═══════════════════════════════════════
   ITEM / ANGGARAN CRUD
═══════════════════════════════════════ */
function openAddItem() {
  const firstDeptId = DB.depts.filter(d=>d.active)[0]?.id;
  const filteredCats = firstDeptId ? DB.cats.filter(c=>c.active&&c.deptId===firstDeptId) : [];
  openModal(`
    <h3>Tambah Item Anggaran</h3>
    <p class="modal-sub">Pilih departemen dan kategori terlebih dahulu</p>
    <div class="form-group"><label>Nama item *</label><input id="m-name" placeholder="cth. Pembelian Laptop"/></div>
    <div class="form-row">
      <div class="form-group"><label>Departemen *</label>
        <select id="m-dept" onchange="refreshCatOptions()">
          ${DB.depts.filter(d=>d.active).map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Kategori *</label>
        <select id="m-cat">
          ${filteredCats.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group"><label>Jumlah anggaran (Rp) *</label><input id="m-budget" type="number" placeholder="0" min="1"/></div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveItem()"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function refreshCatOptions() {
  const deptId = parseInt(document.getElementById('m-dept').value);
  const cats   = DB.cats.filter(c => c.active && c.deptId === deptId);
  document.getElementById('m-cat').innerHTML = cats.length === 0
    ? '<option value="">— Tidak ada kategori —</option>'
    : cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function saveItem() {
  const name   = document.getElementById('m-name').value.trim();
  const deptId = parseInt(document.getElementById('m-dept').value);
  const catId  = parseInt(document.getElementById('m-cat').value);
  const budget = parseFloat(document.getElementById('m-budget').value);
  if (!name || isNaN(budget) || budget <= 0 || !catId) { toast('Lengkapi semua kolom dengan benar'); return; }
  DB.items.push({ id: DB._nextItem++, name, deptId, catId, budget, actual: 0, locked: false, requests: [] });
  closeModal(); renderBudget(); toast('Item anggaran berhasil ditambahkan');
}

/* ═══════════════════════════════════════
   INPUT AKTUAL
═══════════════════════════════════════ */
function openActual(id) {
  const it  = DB.items.find(i => i.id === id);
  const dpt = findDept(it.deptId);
  const ct  = findCat(it.catId);
  openModal(`
    <h3>Input Biaya Aktual</h3>
    <p class="modal-sub">
      <strong>${it.name}</strong><br>
      ${dpt?dpt.name:'—'} › ${ct?ct.name:'—'}<br>
      Anggaran: ${fmt(it.budget)} &nbsp;|&nbsp; Terpakai: ${fmt(it.actual)}<br>
      <strong>Sisa: ${fmt(it.budget - it.actual)}</strong>
    </p>
    <div class="form-group"><label>Tambah biaya aktual (Rp) *</label><input id="m-actual" type="number" placeholder="0" min="1"/></div>
    <div class="form-group"><label>Keterangan</label><input id="m-ket" placeholder="cth. Invoice #001 vendor XYZ"/></div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveActual(${id})"><i class="ti ti-check"></i> Simpan</button>
    </div>
  `);
}

function saveActual(id) {
  const val = parseFloat(document.getElementById('m-actual').value);
  if (isNaN(val) || val <= 0) { toast('Masukkan jumlah yang valid'); return; }
  const it = DB.items.find(i => i.id === id);
  it.actual += val;
  checkAutoLock();
  closeModal();
  if (it.locked) {
    renderBudget(); toast('⚠ Anggaran terlampaui — item dikunci otomatis');
  } else {
    renderBudget(); toast('Biaya aktual berhasil dicatat');
  }
  updateNavBadge();
}

/* ═══════════════════════════════════════
   PENGAJUAN TAMBAHAN
═══════════════════════════════════════ */
function openRequest(id) {
  const it  = DB.items.find(i => i.id === id);
  const over = Math.max(0, it.actual - it.budget);
  openModal(`
    <h3>Pengajuan Tambahan Anggaran</h3>
    <p class="modal-sub">
      <strong>${it.name}</strong><br>
      Anggaran saat ini: ${fmt(it.budget)}<br>
      Biaya aktual: ${fmt(it.actual)}<br>
      ${over > 0 ? `<span style="color:#A32D2D">Kelebihan: ${fmt(over)}</span>` : ''}
    </p>
    <div class="form-group"><label>Jumlah tambahan yang diajukan (Rp) *</label><input id="m-amount" type="number" placeholder="0" min="1"/></div>
    <div class="form-group"><label>Alasan pengajuan *</label>
      <textarea id="m-reason" placeholder="Jelaskan alasan kebutuhan tambahan anggaran secara detail..."></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveRequest(${id})"><i class="ti ti-send"></i> Kirim Pengajuan</button>
    </div>
  `);
}

function saveRequest(id) {
  const amount = parseFloat(document.getElementById('m-amount').value);
  const reason = document.getElementById('m-reason').value.trim();
  if (isNaN(amount) || amount <= 0 || !reason) { toast('Lengkapi semua kolom'); return; }
  DB.requests.push({
    id: 'req-' + DB._nextReq++,
    itemId: id,
    amount,
    reason,
    date: todayStr(),
    status: 'pending',
  });
  closeModal(); renderBudget(); toast('Pengajuan dikirim — menunggu persetujuan');
}

function approveReq(reqId, approved) {
  const r = DB.requests.find(x => x.id === reqId);
  if (!r) return;
  r.status = approved ? 'approved' : 'rejected';
  if (approved) {
    const it = DB.items.find(i => i.id === r.itemId);
    it.budget += r.amount;
    if (it.actual < it.budget) it.locked = false;
  }
  updateNavBadge();
  if (currentPage === 'dashboard') renderDashboard();
  else renderBudget();
  toast(approved ? 'Disetujui — anggaran ditambahkan & kunci dibuka' : 'Pengajuan ditolak');
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.getElementById('topbar-date').textContent = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});
checkAutoLock();
updateNavBadge();
renderDashboard();
</script>
</body>
</html>