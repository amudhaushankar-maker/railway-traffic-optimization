import React, { useCallback, useEffect, useState } from 'react';



//  AUTHORIZED USERS 
const AUTHORIZED_USERS = [
  { username:'rajesh.kumar',   password:'IR@2024', name:'Rajesh Kumar',    batchId:'IR-ENG-2019', dept:'Engineering',     role:'Senior Engineer',         zone:'Northern Railway' },
  { username:'priya.sharma',   password:'IR@2024', name:'Priya Sharma',    batchId:'IR-ST-2021',  dept:'Signal & Telecom', role:'Signal Inspector',        zone:'Central Railway' },
  { username:'anil.verma',     password:'IR@2024', name:'Anil Verma',      batchId:'IR-TRD-2018', dept:'Traction',         role:'TRD Inspector',           zone:'Western Railway' },
  { username:'sunita.rao',     password:'IR@2024', name:'Sunita Rao',      batchId:'IR-COA-2020', dept:'Control Office',   role:'Control Office Assistant',zone:'South-Central Railway' },
  { username:'admin',          password:'admin123',name:'System Admin',    batchId:'IR-ADM-0001', dept:'Administration',   role:'System Administrator',    zone:'Railway Board' },
];

//  LOGIN PAGE 
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    if (!username || !password) { setError('Please enter username and password.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = AUTHORIZED_USERS.find(u => u.username === username && u.password === password);
      if (user) { onLogin(user); }
      else { setError('Invalid credentials. Access denied.'); setLoading(false); }
    }, 600);
  };

  const handleKey = e => { if (e.key === 'Enter') handleLogin(); };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-mark">IR</div>
          <div>
            <div className="login-logo-title">Indian Railways</div>
            <div className="login-logo-sub">BlockPlan AI  Authorized Access Only</div>
          </div>
        </div>
        <div className="login-divider" />
        <h2 className="login-heading">Sign in to your account</h2>
        <p className="login-desc">This system is restricted to authorized Indian Railways personnel only. Unauthorized access is prohibited.</p>
        {error && <div className="login-error"> {error}</div>}
        <div className="login-field">
          <label>Employee Username</label>
          <input value={username} onChange={e=>{setUsername(e.target.value);setError('');}} onKeyDown={handleKey} placeholder="e.g. rajesh.kumar" autoFocus />
        </div>
        <div className="login-field">
          <label>Password</label>
          <div className="login-pass-wrap">
            <input type={showPass?'text':'password'} value={password} onChange={e=>{setPassword(e.target.value);setError('');}} onKeyDown={handleKey} placeholder="Enter password" />
            <button className="login-eye" onClick={()=>setShowPass(s=>!s)}>{showPass?'':''}</button>
          </div>
        </div>
        <button className="primary-btn login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? <><span className="spinner"/>Verifying</> : ' Sign In'}
        </button>
        <div className="login-hint">
          <strong>Demo credentials:</strong> username <code>admin</code>  password <code>admin123</code>
        </div>
      </div>
    </div>
  );
}

//  DATA 
const corridors = [
  { id:'C-DEL-AGR', name:'DelhiAgra',     section:'Western',       availableWindows:[[1,5],[22,24]], capacity:3 },
  { id:'C-AGR-JHS', name:'AgraJhansi',    section:'Central',       availableWindows:[[2,6],[23,24]], capacity:2 },
  { id:'C-JHS-BPL', name:'JhansiBhopal',  section:'Central',       availableWindows:[[1,4],[21,24]], capacity:3 },
  { id:'C-BPL-NGP', name:'BhopalNagpur',  section:'South-Central', availableWindows:[[3,7],[22,24]], capacity:2 },
  { id:'C-LKO-CNB', name:'LucknowKanpur', section:'Northern',      availableWindows:[[0,5],[20,24]], capacity:2 },
];

const trainTimetable = [
  { id:'TR-12001', name:'Shatabdi Express', corridor:'C-DEL-AGR', departure:6,  arrival:8,  type:'passenger' },
  { id:'TR-12002', name:'Rajdhani Express', corridor:'C-DEL-AGR', departure:20, arrival:22, type:'passenger' },
  { id:'TR-11001', name:'Punjab Mail',      corridor:'C-DEL-AGR', departure:10, arrival:13, type:'passenger' },
  { id:'TR-14001', name:'Intercity SF',     corridor:'C-AGR-JHS', departure:7,  arrival:10, type:'passenger' },
  { id:'TR-58001', name:'Goods Rake A',     corridor:'C-JHS-BPL', departure:8,  arrival:12, type:'goods' },
  { id:'TR-58002', name:'Goods Rake B',     corridor:'C-BPL-NGP', departure:9,  arrival:14, type:'goods' },
  { id:'TR-22001', name:'Duronto Express',  corridor:'C-LKO-CNB', departure:6,  arrival:7,  type:'passenger' },
  { id:'TR-19001', name:'Avadh Express',    corridor:'C-LKO-CNB', departure:14, arrival:16, type:'passenger' },
];

const INIT_TASKS = [
  { id:'TMS-001', source:'TMS',  dept:'Engineering',     description:'Rail fracture repair  km 142',       corridor:'C-DEL-AGR', criticality:'critical', overdueDays:3, duration:3, preferredStart:1 },
  { id:'TMS-002', source:'TMS',  dept:'Engineering',     description:'Ballast tamping  km 210215',        corridor:'C-AGR-JHS', criticality:'high',     overdueDays:7, duration:4, preferredStart:2 },
  { id:'TMS-003', source:'TMS',  dept:'Engineering',     description:'Bridge inspection  km 88',           corridor:'C-JHS-BPL', criticality:'medium',   overdueDays:0, duration:2, preferredStart:1 },
  { id:'TMS-004', source:'TMS',  dept:'Engineering',     description:'Level crossing gate renewal',         corridor:'C-BPL-NGP', criticality:'high',     overdueDays:5, duration:3, preferredStart:3 },
  { id:'TMS-005', source:'TMS',  dept:'Engineering',     description:'Track geometry correction  km 320',  corridor:'C-LKO-CNB', criticality:'medium',   overdueDays:2, duration:2, preferredStart:1 },
  { id:'SMMS-001',source:'SMMS', dept:'Signal & Telecom',description:'Interlocking relay replacement',      corridor:'C-DEL-AGR', criticality:'critical', overdueDays:1, duration:4, preferredStart:1 },
  { id:'SMMS-002',source:'SMMS', dept:'Signal & Telecom',description:'Track circuit calibration',           corridor:'C-LKO-CNB', criticality:'high',     overdueDays:4, duration:2, preferredStart:0 },
  { id:'SMMS-003',source:'SMMS', dept:'Signal & Telecom',description:'OFC cable fault rectification',       corridor:'C-AGR-JHS', criticality:'medium',   overdueDays:2, duration:2, preferredStart:2 },
  { id:'SMMS-004',source:'SMMS', dept:'Signal & Telecom',description:'Signal lamp replacement  km 190',   corridor:'C-JHS-BPL', criticality:'low',      overdueDays:0, duration:1, preferredStart:2 },
  { id:'TDMS-001',source:'TDMS', dept:'Traction',        description:'OHE mast replacement  km 305',       corridor:'C-JHS-BPL', criticality:'critical', overdueDays:0, duration:3, preferredStart:2 },
  { id:'TDMS-002',source:'TDMS', dept:'Traction',        description:'Booster transformer maintenance',     corridor:'C-BPL-NGP', criticality:'high',     overdueDays:6, duration:2, preferredStart:3 },
  { id:'TDMS-003',source:'TDMS', dept:'Traction',        description:'Sectioning post inspection',          corridor:'C-LKO-CNB', criticality:'medium',   overdueDays:1, duration:1, preferredStart:1 },
  { id:'TDMS-004',source:'TDMS', dept:'Traction',        description:'Pantograph wire tension check',       corridor:'C-DEL-AGR', criticality:'low',      overdueDays:0, duration:1, preferredStart:2 },
];

//  OPTIMIZER 
const CRIT_SCORE = { critical:40, high:25, medium:10, low:4 };
const scoreTask = t => CRIT_SCORE[t.criticality] + t.overdueDays * 3;

const windowOk = (corr, s, e) => corr.availableWindows.some(([ws,we]) => s >= ws && e <= we);
const trainConflict = (corrId, s, e) => trainTimetable.some(t => t.corridor === corrId && t.departure < e && t.arrival > s);

function optimizeBlocks(tasks, corrs) {
  const sorted = [...tasks].sort((a,b) => scoreTask(b) - scoreTask(a));
  const cm = {};
  corrs.forEach(c => { cm[c.id] = { ...c, occupied:0 }; });
  const out = [];
  for (const task of sorted) {
    const corr = cm[task.corridor];
    if (!corr) { out.push({ ...task, status:'unscheduled', blockStart:null, blockEnd:null, score:0, reason:'Corridor not found' }); continue; }
    const s = task.preferredStart, e = s + task.duration;
    const wOk = windowOk(corr, s, e);
    const conf = trainConflict(task.corridor, s, e);
    const capOk = corr.occupied < corr.capacity;
    const score = Math.round(scoreTask(task) + (wOk?15:-20) + (conf?-30:10) + (capOk?5:-25));
    if (capOk && wOk && !conf) {
      corr.occupied++;
      out.push({ ...task, status:'scheduled', blockStart:s, blockEnd:e, score, reason:'AI-optimized' });
      continue;
    }
    let done = false;
    for (const [ws,we] of corr.availableWindows) {
      const ns=ws, ne=ns+task.duration;
      if (ne<=we && !trainConflict(task.corridor,ns,ne) && capOk) {
        corr.occupied++;
        out.push({ ...task, status:'rescheduled', blockStart:ns, blockEnd:ne, score:Math.round(scoreTask(task)+5), reason:'Rescheduled to available window' });
        done=true; break;
      }
    }
    if (!done) {
      const reason = !capOk?'Corridor at capacity':conf?'Train conflict':'No available window';
      out.push({ ...task, status:'queued', blockStart:null, blockEnd:null, score:0, reason });
    }
  }
  return out;
}

function summarize(schedule) {
  const total = schedule.length;
  const scheduled = schedule.filter(t => t.status==='scheduled'||t.status==='rescheduled').length;
  const critical = schedule.filter(t => t.criticality==='critical').length;
  const conflictsAvoided = schedule.filter(t => t.reason==='Rescheduled to available window').length;
  const queued = schedule.filter(t => t.status==='queued').length;
  const availability = total ? Math.round((scheduled/total)*100) : 0;
  return { total, scheduled, critical, conflictsAvoided, queued, availability };
}

function buildInsights(schedule) {
  const byDept = {};
  schedule.forEach(t => { byDept[t.dept] = (byDept[t.dept]||0)+1; });
  const ds = Object.entries(byDept).map(([d,n])=>`${d}: ${n}`).join(', ');
  const overdue = schedule.filter(t=>t.overdueDays>0).length;
  const queued = schedule.filter(t=>t.status==='queued').length;
  return [
    `AI coordinated blocks across ${Object.keys(byDept).length} departments  ${ds}.`,
    `${overdue} overdue tasks prioritized to reduce asset downtime risk.`,
    queued>0 ? `${queued} task(s) queued  corridor capacity or train conflict. Recommend review.`
             : 'All tasks allocated within available corridor windows.',
    'Block windows aligned with COA timetable  zero disruption to passenger & goods services.',
  ];
}

function buildWeeklyPlan(schedule) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days.map((day,i) => ({ day, tasks: schedule.filter((_,idx) => idx%7===i) }));
}

function buildMonthlyPlan(schedule) {
  return [0,1,2,3].map(i => ({ week:`Week ${i+1}`, tasks: schedule.filter((_,idx) => Math.floor(idx/3)%4===i) }));
}

function getNetworkHealth(schedule) {
  return corridors.map(c => {
    const tasks = schedule.filter(t => t.corridor===c.id);
    const scheduled = tasks.filter(t => t.status==='scheduled'||t.status==='rescheduled').length;
    const trains = trainTimetable.filter(t => t.corridor===c.id);
    const utilPct = c.capacity>0 ? Math.min(Math.round((scheduled/c.capacity)*100),100) : 0;
    return { corridor:c, tasks, scheduled, trains, utilPct };
  });
}

//  HELPERS 
const deptClass = { 'Engineering':'badge-eng', 'Signal & Telecom':'badge-st', 'Traction':'badge-trac' };
const critClass = { critical:'badge-critical', high:'badge-high', medium:'badge-medium', low:'badge-low' };
const statClass = { scheduled:'badge-scheduled', rescheduled:'badge-rescheduled', queued:'badge-queued', unscheduled:'badge-unscheduled' };
const fmt = h => `${String(h).padStart(2,'0')}:00`;

function Badge({ text, cls }) {
  return <span className={`badge ${cls}`}>{text}</span>;
}

const PRIORITY_COLOR = { critical:'#d64659', high:'#d9822b', medium:'#f0c040', low:'#1e9f72' };
const PRIORITY_LABEL = { critical:'Critical  Immediate action', high:'High  Urgent', medium:'Medium  Scheduled', low:'Low  Routine' };

function PriorityDot({ level, overdue }) {
  const color = PRIORITY_COLOR[level] || '#ccc';
  const pulse = level === 'critical' || (level === 'high' && overdue > 3);
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
      <span className={pulse ? 'dot-pulse' : ''} style={{
        display:'inline-block', width:14, height:14, borderRadius:'50%',
        background: color, flexShrink:0,
        boxShadow: `0 0 0 3px ${color}22`
      }} title={PRIORITY_LABEL[level]} />
      <span style={{fontSize:'.75rem',fontWeight:600,color}}>{level}</span>
    </span>
  );
}

//  KPI BAR 
function KpiBar({ summary }) {
  const avail = summary.availability || 0;
  const cards = [
    { label:'Asset Availability',  value:`${avail}%`,                        trend: avail>=80?'On target':'Below target', tc: avail>=80?'':'danger' },
    { label:'Blocks Scheduled',    value:`${summary.scheduled||0}/${summary.total||0}`, trend:'AI-optimized', tc:'' },
    { label:'Critical Tasks',      value:summary.critical||0,                trend:'Prioritized first', tc:'' },
    { label:'Conflicts Avoided',   value:summary.conflictsAvoided||0,        trend:'COA-aligned', tc:'' },
  ];
  return (
    <div className="kpis">
      {cards.map(c => (
        <div className="kpi-card" key={c.label}>
          <span className="kpi-label">{c.label}</span>
          <p className="kpi-value">{c.value}</p>
          <span className={`kpi-trend ${c.tc}`}>{c.trend}</span>
        </div>
      ))}
    </div>
  );
}

//  TOAST 
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className="toast">{msg}</div>;
}

//  MODAL 
const EMPTY_TASK = { id:'', source:'TMS', dept:'Engineering', description:'', corridor:'C-DEL-AGR', criticality:'medium', overdueDays:0, duration:2, preferredStart:1 };

function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || EMPTY_TASK);
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const isNew = !task;

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <h3>{isNew ? 'Add Maintenance Task' : 'Edit Task'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Task ID</label>
            <input value={form.id} onChange={e=>set('id',e.target.value)} placeholder="e.g. TMS-010" />
          </div>
          <div className="form-group">
            <label>Source System</label>
            <select value={form.source} onChange={e=>set('source',e.target.value)}>
              <option>TMS</option><option>SMMS</option><option>TDMS</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select value={form.dept} onChange={e=>set('dept',e.target.value)}>
              <option>Engineering</option><option>Signal & Telecom</option><option>Traction</option>
            </select>
          </div>
          <div className="form-group">
            <label>Corridor</label>
            <select value={form.corridor} onChange={e=>set('corridor',e.target.value)}>
              {corridors.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Criticality</label>
            <select value={form.criticality} onChange={e=>set('criticality',e.target.value)}>
              <option>critical</option><option>high</option><option>medium</option><option>low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Overdue Days</label>
            <input type="number" min="0" value={form.overdueDays} onChange={e=>set('overdueDays',+e.target.value)} />
          </div>
          <div className="form-group">
            <label>Duration (hrs)</label>
            <input type="number" min="1" max="12" value={form.duration} onChange={e=>set('duration',+e.target.value)} />
          </div>
          <div className="form-group">
            <label>Preferred Start (hr)</label>
            <input type="number" min="0" max="23" value={form.preferredStart} onChange={e=>set('preferredStart',+e.target.value)} />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea value={form.description} onChange={e=>set('description',e.target.value)} />
          </div>
        </div>
        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={()=>onSave(form)}>
            {isNew ? 'Add Task' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

//  DEPT RESOLUTION INFO 
const DEPT_INFO = {
  'Engineering': {
    system: 'TMS  Track Management System',
    team: 'Permanent Way (P-Way) Gang',
    tools: 'Tamping machine, Rail grinder, Ultrasonic flaw detector',
    steps: ['Isolate track section and obtain block sanction','Deploy P-Way gang with equipment','Execute repair / maintenance work','Inspect and restore track to safe condition','Lift block and restore traffic'],
  },
  'Signal & Telecom': {
    system: 'SMMS  Signalling Maintenance & Management System',
    team: 'Signal Inspector + Technician team',
    tools: 'Relay test kit, Multimeter, OFC splicer, Signal testing equipment',
    steps: ['Obtain block from Station Master / Control','Isolate signalling circuit safely','Replace / calibrate faulty component','Test all interlocking functions','Obtain clearance and restore signal operation'],
  },
  'Traction': {
    system: 'TDMS  Traction Distribution Management System',
    team: 'OHE Maintenance Gang + TRD Inspector',
    tools: 'Aerial platform vehicle, OHE tension gauge, Insulation tester',
    steps: ['Obtain power block from TPC / Control','Earth and short-circuit OHE section','Carry out OHE repair / replacement','Remove earthing, test insulation','Restore power and verify traction supply'],
  },
};
const CRIT_LABEL = { critical:' Critical', high:' High', medium:' Medium', low:' Low' };

//  COMPLETED TASKS PANEL 
function CompletedTasksPanel({ tasks, onClear, onRestore }) {
  if (!tasks.length) {
    return (
      <div className="panel">
        <div className="section-header">
          <h3>Completed Missions</h3>
        </div>
        <div style={{padding:'18px 0', color:'var(--muted)'}}>No completed missions yet.</div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="section-header">
        <h3>Completed Missions</h3>
        <button className="secondary-btn" onClick={onClear} style={{padding:'6px 10px', fontSize:'.75rem'}}>Clear List</button>
      </div>
      <div className="schedule-board">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Dept</th><th>Description</th><th>Corridor</th><th>Completed</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={`${t.id}-${t.completedAt}`} className={`row-crit-${t.criticality}`}>
                <td><strong>{t.id}</strong></td>
                <td><Badge text={t.dept} cls={deptClass[t.dept]||''} /></td>
                <td style={{fontSize:'.82rem'}}>{t.description}</td>
                <td style={{fontSize:'.8rem'}}>{t.corridor}</td>
                <td style={{fontSize:'.78rem', color:'var(--success)', fontWeight:700}}>{new Date(t.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>
                  <button className="secondary-btn" style={{padding:'4px 10px',fontSize:'.75rem'}} onClick={()=>onRestore(t)}>Restore</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  TASK DETAIL DRAWER 
function TaskDetailDrawer({ task, onClose, onEdit, onComplete }) {
  if (!task) return null;
  const corr = corridors.find(c => c.id === task.corridor) || {};
  const info = DEPT_INFO[task.dept] || {};
  const wins = (corr.availableWindows || []).map(([s,e]) => `${fmt(s)}  ${fmt(e)}`).join('  |  ');
  const conflictTrains = trainTimetable.filter(t =>
    t.corridor === task.corridor && task.blockStart !== null &&
    t.departure < (task.blockEnd||0) && t.arrival > (task.blockStart||0)
  );
  return (
    <div className="drawer-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="drawer">
        <div className="drawer-header">
          <div>
            <div className="drawer-task-id">{task.id}</div>
            <div className="drawer-task-desc">{task.description}</div>
          </div>
          <button className="drawer-close" onClick={onClose}></button>
        </div>
        <div className="drawer-badges">
          <Badge text={task.dept} cls={deptClass[task.dept]||''} />
          <Badge text={task.criticality} cls={critClass[task.criticality]} />
          <Badge text={task.status||'unscheduled'} cls={statClass[task.status||'unscheduled']} />
          {task.overdueDays > 0 && <Badge text={`${task.overdueDays}d overdue`} cls="badge-critical" />}
        </div>
        <div className="drawer-section">
          <div className="drawer-section-title"> Problem Details</div>
          <div className="drawer-row"><span>Criticality</span><span>{CRIT_LABEL[task.criticality]}</span></div>
          <div className="drawer-row"><span>Source System</span><span>{info.system || task.source}</span></div>
          <div className="drawer-row"><span>Corridor</span><span>{corr.name || task.corridor} ({task.corridor})</span></div>
          <div className="drawer-row"><span>Section</span><span>{corr.section || ''}</span></div>
          <div className="drawer-row"><span>Overdue</span><span style={{color:task.overdueDays>0?'var(--danger)':'var(--success)'}}>{task.overdueDays>0?`${task.overdueDays} day(s)`:'Not overdue'}</span></div>
          <div className="drawer-row"><span>AI Score</span><span style={{fontWeight:700}}>{task.score||''}</span></div>
          <div className="drawer-row"><span>Reason</span><span style={{color:'var(--muted)',fontSize:'.8rem'}}>{task.reason||''}</span></div>
        </div>
        <div className="drawer-section">
          <div className="drawer-section-title"> Department & Team</div>
          <div className="drawer-row"><span>Department</span><span>{task.dept}</span></div>
          <div className="drawer-row"><span>Responsible Team</span><span>{info.team||''}</span></div>
          <div className="drawer-row"><span>Equipment</span><span style={{fontSize:'.78rem',color:'var(--muted)'}}>{info.tools||''}</span></div>
        </div>
        <div className="drawer-section">
          <div className="drawer-section-title"> Block Window</div>
          <div className="drawer-row"><span>Allocated Window</span>
            <span style={{fontWeight:700,color:task.blockStart!==null?'var(--success)':'var(--danger)'}}>
              {task.blockStart!==null?`${fmt(task.blockStart)}  ${fmt(task.blockEnd)}`:'Not allocated'}
            </span>
          </div>
          <div className="drawer-row"><span>Duration</span><span>{task.duration}h</span></div>
          <div className="drawer-row"><span>Preferred Start</span><span>{fmt(task.preferredStart)}</span></div>
          <div className="drawer-row"><span>Available Windows</span><span style={{fontSize:'.78rem'}}>{wins||''}</span></div>
          {conflictTrains.length>0 && <div className="drawer-conflict"> Overlapping trains: {conflictTrains.map(t=>t.name).join(', ')}</div>}
        </div>
        <div className="drawer-section">
          <div className="drawer-section-title"> Resolution Steps</div>
          <ol className="drawer-steps">{(info.steps||[]).map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
        <div className="drawer-actions">
          <button className="secondary-btn" onClick={onClose}>Close</button>
          <button className="primary-btn" onClick={()=>{onClose();onEdit(task);}}>Edit Task</button>
          <button className="secondary-btn" onClick={()=>{onClose();onComplete(task);}}>Mark Completed</button>
        </div>
      </div>
    </div>
  );
}

//  SCHEDULE TABLE 
function ScheduleTable({ schedule, onEdit, onDelete, onView, onComplete }) {
  const [sortKey, setSortKey] = useState('score');
  const [sortDir, setSortDir] = useState(-1);
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const toggleSort = key => {
    if (sortKey===key) setSortDir(d=>-d);
    else { setSortKey(key); setSortDir(-1); }
  };

  const filtered = schedule
    .filter(t => filterDept==='All' || t.dept===filterDept)
    .filter(t => filterStatus==='All' || t.status===filterStatus)
    .filter(t => !search || t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
      const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
      return typeof av==='string' ? av.localeCompare(bv)*sortDir : (av-bv)*sortDir;
    });

  const Th = ({ k, label }) => (
    <th className={sortKey===k?'sorted':''} onClick={()=>toggleSort(k)}>
      {label}<span className="sort-arrow">{sortKey===k?(sortDir===-1?'':''):''}</span>
    </th>
  );

  return (
    <div className="panel">
      <div className="section-header">
        <h3>Block Plan Schedule</h3>
        <Badge text="AI Optimized" cls="badge-scheduled" />
      </div>
      <div className="filter-bar">
        <input placeholder="Search task / ID" value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={filterDept} onChange={e=>setFilterDept(e.target.value)}>
          <option>All</option><option>Engineering</option><option>Signal & Telecom</option><option>Traction</option>
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option>All</option><option>scheduled</option><option>rescheduled</option><option>queued</option>
        </select>
        <span style={{marginLeft:'auto',fontSize:'.8rem',color:'var(--muted)'}}>{filtered.length} of {schedule.length} tasks</span>
      </div>
      <div className="schedule-board">
        <table>
          <thead>
            <tr>
              <Th k="id" label="Task ID" />
              <Th k="dept" label="Dept" />
              <Th k="corridor" label="Corridor" />
              <th>Block Window</th>
              <Th k="criticality" label="Criticality" />
              <Th k="overdueDays" label="Overdue" />
              <Th k="status" label="Status" />
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(entry => (
              <tr key={entry.id} className={`row-crit-${entry.criticality}`} style={{cursor:'pointer'}} onClick={()=>onView(entry)}>
                <td><strong>{entry.id}</strong><br/><small>{entry.description}</small></td>
                <td><Badge text={entry.dept} cls={deptClass[entry.dept]||''} /></td>
                <td style={{fontSize:'.8rem'}}>{entry.corridor}</td>
                <td style={{fontSize:'.82rem'}}>{entry.blockStart!==null ? `${fmt(entry.blockStart)}  ${fmt(entry.blockEnd)}` : ''}</td>
                <td><Badge text={entry.criticality} cls={critClass[entry.criticality]} /></td>
                <td style={{fontSize:'.82rem'}}>{entry.overdueDays>0 ? <span style={{color:'var(--danger)',fontWeight:700}}>{entry.overdueDays}d</span> : ''}</td>
                <td><Badge text={entry.status} cls={statClass[entry.status]} /></td>
                <td><PriorityDot level={entry.criticality} overdue={entry.overdueDays} /></td>
                <td onClick={e=>e.stopPropagation()}>
                  <button className="secondary-btn" style={{padding:'4px 10px',fontSize:'.75rem',marginRight:4}} onClick={()=>onEdit(entry)}>Edit</button>
                  <button className="secondary-btn" style={{padding:'4px 10px',fontSize:'.75rem',marginRight:4}} onClick={()=>onComplete(entry)}>Completed</button>
                  <button className="danger-btn" onClick={()=>onDelete(entry.id)}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  GANTT CHART 
function GanttChart({ schedule, onView }) {
  const HOURS = Array.from({length:24},(_,i)=>i);
  const W = 100/24;

  return (
    <div className="panel">
      <div className="section-header"><h3>24-Hour Block Gantt</h3></div>
      <div className="gantt-wrap">
        <div className="gantt-header">
          {HOURS.map(h=><div className="gantt-hour" key={h}>{h}</div>)}
        </div>
        {corridors.map(corr => {
          const tasks = schedule.filter(t=>t.corridor===corr.id && t.blockStart!==null);
          const trains = trainTimetable.filter(t=>t.corridor===corr.id);
          return (
            <div className="gantt-row" key={corr.id}>
              <div className="gantt-label" title={corr.name}>{corr.id}</div>
              <div className="gantt-track">
                {trains.map(tr=>(
                  <div key={tr.id} className="gantt-train" title={`${tr.name} ${tr.departure}:00${tr.arrival}:00`}
                    style={{left:`${tr.departure*W}%`,width:`${(tr.arrival-tr.departure)*W}%`}} />
                ))}
                {tasks.map(t=>(
                  <div key={t.id} className={`gantt-block crit-${t.criticality}`}
                    title={`Click to view: ${t.id}  ${t.description}`}
                    style={{left:`${t.blockStart*W}%`,width:`${Math.max(t.duration*W,2)}%`,cursor:'pointer'}}
                    onClick={e=>{e.stopPropagation();onView(t);}}>
                    {t.id}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div style={{display:'flex',gap:16,marginTop:12,fontSize:'.75rem',flexWrap:'wrap'}}>
          <span><span style={{display:'inline-block',width:12,height:12,background:'#d64659',borderRadius:3,marginRight:4}}/>Critical</span>
          <span><span style={{display:'inline-block',width:12,height:12,background:'#d9822b',borderRadius:3,marginRight:4}}/>High</span>
          <span><span style={{display:'inline-block',width:12,height:12,background:'#f0c040',borderRadius:3,marginRight:4}}/>Medium</span>
          <span><span style={{display:'inline-block',width:12,height:12,background:'#1e9f72',borderRadius:3,marginRight:4}}/>Low</span>
          <span><span style={{display:'inline-block',width:12,height:12,background:'rgba(20,33,61,.12)',border:'1px solid rgba(20,33,61,.2)',borderRadius:3,marginRight:4}}/>Train window</span>
        </div>
      </div>
    </div>
  );
}

//  HORIZON PANEL 
function HorizonPanel({ horizon, weeklyPlan, monthlyPlan, onView }) {
  const plan = horizon==='weekly' ? weeklyPlan : monthlyPlan;
  const key  = horizon==='weekly' ? 'day' : 'week';
  return (
    <div className="panel">
      <div className="section-header">
        <h3>{horizon==='weekly' ? 'Weekly Block Plan' : 'Monthly Block Plan'}</h3>
      </div>
      <div className={`horizon-grid${horizon==='monthly'?' monthly':''}`}>
        {plan.map(bucket => (
          <div className="horizon-bucket" key={bucket[key]}>
            <div className="horizon-label">{bucket[key]}</div>
            {bucket.tasks.length===0
              ? <div className="horizon-empty">No tasks</div>
              : bucket.tasks.map(t=>(
                <div key={t.id} className={`horizon-task hc-${t.criticality}`}
                  style={{cursor:'pointer'}} title={t.description} onClick={()=>onView(t)}>
                  <span className="horizon-task-id">{t.id}</span>
                  <span className="horizon-task-dept">{t.dept}</span>
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}

//  NETWORK HEALTH 
function NetworkHealth({ schedule }) {
  const health = getNetworkHealth(schedule);
  return (
    <div>
      <div className="panel">
        <div className="section-header"><h3>Corridor Network Health</h3></div>
        <div className="health-grid">
          {health.map(h => {
            const fillCls = h.utilPct>=80?'fill-danger':h.utilPct>=50?'fill-warn':'fill-good';
            return (
              <div className="health-card" key={h.corridor.id}>
                <div className="health-card-title">{h.corridor.name}</div>
                <div className="health-card-sub">{h.corridor.section}  Capacity: {h.corridor.capacity}</div>
                <div className="health-bar-wrap">
                  <div className="health-bar-label">
                    <span>Block utilisation</span><span>{h.utilPct}%</span>
                  </div>
                  <div className="health-bar"><div className={`health-bar-fill ${fillCls}`} style={{width:`${h.utilPct}%`}}/></div>
                </div>
                <div style={{fontSize:'.78rem',color:'var(--muted)',marginBottom:6}}>
                  {h.scheduled} maintenance block(s)  {h.trains.length} train(s)
                </div>
                <div className="health-trains">
                  {h.trains.map(tr=>(
                    <div className="health-train-row" key={tr.id}>
                      <span>{tr.name}</span>
                      <span style={{display:'flex',gap:6,alignItems:'center'}}>
                        <Badge text={tr.type} cls={tr.type==='passenger'?'badge-passenger':'badge-goods'} />
                        <span style={{fontSize:'.72rem',color:'var(--muted)'}}>{fmt(tr.departure)}{fmt(tr.arrival)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//  INSIGHTS PANEL 
function InsightsPanel({ insights, schedule }) {
  const maxCap = Math.max(...corridors.map(c=>c.capacity));
  const health = getNetworkHealth(schedule);
  return (
    <div className="panel two-col">
      <div>
        <div className="section-header" style={{marginBottom:10}}><h3>AI Recommendations</h3></div>
        <ul className="insights-list">
          {insights.map((ins,i)=><li key={i}>{ins}</li>)}
        </ul>
      </div>
      <div>
        <div className="section-header" style={{marginBottom:10}}><h3>Corridor Load Map</h3></div>
        <div className="constraint-map">
          {health.map(h=>{
            const pct = Math.min((h.corridor.capacity/maxCap)*100,100);
            return (
              <div className="block-row" key={h.corridor.id}>
                <span className="block-label" title={h.corridor.name}>{h.corridor.id}</span>
                <div className="bar"><div className="bar-fill" style={{width:`${pct}%`}}/></div>
                <span className="bar-pct">{h.utilPct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//  MAINTENANCE QUEUE 
function MaintenanceQueue({ tasks, onAdd, onEdit, onDelete, onView, onComplete }) {
  return (
    <div className="panel">
      <div className="section-header">
        <h3>Maintenance Task Queue</h3>
        <button className="primary-btn" onClick={onAdd}>+ Add Task</button>
      </div>
      <div className="schedule-board">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Source</th><th>Dept</th><th>Description</th>
              <th>Corridor</th><th>Criticality</th><th>Overdue</th><th>Duration</th><th>Priority</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t=>(
              <tr key={t.id} className={`row-crit-${t.criticality}`} style={{cursor:'pointer'}} onClick={()=>onView(t)}>
                <td><strong>{t.id}</strong></td>
                <td><Badge text={t.source} cls="badge-medium" /></td>
                <td><Badge text={t.dept} cls={deptClass[t.dept]||''} /></td>
                <td style={{fontSize:'.82rem'}}>{t.description}</td>
                <td style={{fontSize:'.8rem'}}>{t.corridor}</td>
                <td><Badge text={t.criticality} cls={critClass[t.criticality]} /></td>
                <td>{t.overdueDays>0?<span style={{color:'var(--danger)',fontWeight:700}}>{t.overdueDays}d</span>:''}</td>
                <td>{t.duration}h</td>
                <td><PriorityDot level={t.criticality} overdue={t.overdueDays} /></td>
                <td onClick={e=>e.stopPropagation()}>
                  <button className="secondary-btn" style={{padding:'4px 10px',fontSize:'.75rem',marginRight:4}} onClick={()=>onEdit(t)}>Edit</button>
                  <button className="secondary-btn" style={{padding:'4px 10px',fontSize:'.75rem',marginRight:4}} onClick={()=>onComplete(t)}>Completed</button>
                  <button className="danger-btn" onClick={()=>onDelete(t.id)}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  APP 
export default function App() {
  const [user, setUser]             = useState(null);
  const [tasks, setTasks]           = useState(INIT_TASKS);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [schedule, setSchedule]     = useState([]);
  const [summary, setSummary]       = useState({});
  const [insights, setInsights]     = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [monthlyPlan, setMonthlyPlan] = useState([]);
  const [activeNav, setActiveNav]   = useState('Scheduler');
  const [horizon, setHorizon]       = useState('weekly');
  const [modal, setModal]           = useState(null); // null | 'add' | task-object
  const [toast, setToast]           = useState(null);
  const [running, setRunning]       = useState(false);
  const [clock, setClock]           = useState('');
  const [viewTask, setViewTask]     = useState(null);

  // Live clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'}));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Run optimizer whenever tasks change
  const runOptimizer = useCallback((taskList) => {
    setRunning(true);
    setTimeout(() => {
      const sched = optimizeBlocks(taskList, corridors);
      setSchedule(sched);
      setSummary(summarize(sched));
      setInsights(buildInsights(sched));
      setWeeklyPlan(buildWeeklyPlan(sched));
      setMonthlyPlan(buildMonthlyPlan(sched));
      setRunning(false);
      setToast('Optimizer ran successfully');
    }, 400);
  }, []);

  useEffect(() => { runOptimizer(tasks); }, []);

  const showToast = msg => { setToast(msg); };

  const handleSaveTask = form => {
    let updated;
    if (modal === 'add') {
      if (!form.id) { showToast('Task ID is required'); return; }
      if (tasks.find(t=>t.id===form.id)) { showToast('Task ID already exists'); return; }
      updated = [...tasks, form];
      showToast(`Task ${form.id} added`);
    } else {
      updated = tasks.map(t => t.id===form.id ? form : t);
      showToast(`Task ${form.id} updated`);
    }
    setTasks(updated);
    setModal(null);
    runOptimizer(updated);
  };

  const handleDelete = id => {
    const updated = tasks.filter(t=>t.id!==id);
    setTasks(updated);
    runOptimizer(updated);
    showToast(`Task ${id} removed`);
  };

  const handleCompleteTask = task => {
    if (!task) return;
    const exists = completedTasks.some(t => t.id === task.id);
    if (exists) {
      showToast(`Task ${task.id} is already in the completed list`);
      return;
    }

    const completedEntry = { ...task, completedAt: new Date().toISOString() };
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    setCompletedTasks(prev => [completedEntry, ...prev]);
    setTasks(updatedTasks);
    runOptimizer(updatedTasks);
    showToast(`Task ${task.id} marked completed`);
  };

  const handleRestoreCompleted = task => {
    const restored = { ...task };
    delete restored.completedAt;
    const updated = [...tasks, restored];
    setCompletedTasks(prev => prev.filter(t => !(t.id === task.id && t.completedAt === task.completedAt)));
    setTasks(updated);
    runOptimizer(updated);
    showToast(`Task ${task.id} restored to active queue`);
  };

  const navItems = [
    { key:'Scheduler',         icon:'' },
    { key:'Maintenance Queue', icon:'' },
    { key:'Network Health',    icon:'' },
    { key:'AI Insights',       icon:'' },
  ];

  const avail = summary.availability || 0;

  if (!user) return <LoginPage onLogin={u => { setUser(u); runOptimizer(tasks); }} />;

  return (
    <div className="page-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-mark">IR</div>
            <div>
              <p className="eyebrow">AI Operations</p>
              <h1>BlockPlan AI</h1>
            </div>
          </div>
          <nav className="nav-panel">
            {navItems.map(n => (
              <button key={n.key} className={`nav-item${activeNav===n.key?' active':''}`}
                onClick={()=>setActiveNav(n.key)}>
                <span className="nav-icon">{n.icon}</span>{n.key}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <div className="user-card">
            <div className="user-avatar">{user.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-batch">{user.batchId}</div>
              <div className="user-role">{user.role}</div>
              <div className="user-zone">{user.zone}</div>
            </div>
          </div>
          <div className="status-box" style={{marginTop:10}}>
            <p className="label">System Status</p>
            <div className="status-val" style={{color: avail>=80?'#1e9f72':'#d64659'}}>
              {avail>=80 ? ' Healthy' : ' Needs Review'}
            </div>
            <div className="clock"> {clock}</div>
          </div>
          <button className="logout-btn" onClick={()=>setUser(null)}> Sign Out</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Indian Railways  Integrated Maintenance Planning</p>
            <h2>Automatic Block Planning System</h2>
          </div>
          <div className="topbar-actions">
            {activeNav==='Scheduler' && (
              <div className="horizon-toggle">
                <button className={`toggle-btn${horizon==='weekly'?' active':''}`} onClick={()=>setHorizon('weekly')}>Weekly</button>
                <button className={`toggle-btn${horizon==='monthly'?' active':''}`} onClick={()=>setHorizon('monthly')}>Monthly</button>
              </div>
            )}
            {activeNav==='Maintenance Queue' && (
              <button className="secondary-btn" onClick={()=>setModal('add')}>+ Add Task</button>
            )}
            <button className="primary-btn" onClick={()=>runOptimizer(tasks)} disabled={running}>
              {running && <span className="spinner"/>}
              {running ? 'Optimizing' : 'Run AI Optimizer'}
            </button>
          </div>
        </header>

        <KpiBar summary={summary} />

        {activeNav==='Scheduler' && (
          <>
            <ScheduleTable schedule={schedule} onEdit={t=>setModal(t)} onDelete={handleDelete} onView={setViewTask} onComplete={handleCompleteTask} />
            <GanttChart schedule={schedule} onView={setViewTask} />
            <HorizonPanel horizon={horizon} weeklyPlan={weeklyPlan} monthlyPlan={monthlyPlan} onView={setViewTask} />
            <CompletedTasksPanel tasks={completedTasks} onClear={()=>setCompletedTasks([])} onRestore={handleRestoreCompleted} />
          </>
        )}

        {activeNav==='Maintenance Queue' && (
          <>
            <MaintenanceQueue tasks={tasks} onAdd={()=>setModal('add')} onEdit={t=>setModal(t)} onDelete={handleDelete} onView={setViewTask} onComplete={handleCompleteTask} />
            <CompletedTasksPanel tasks={completedTasks} onClear={()=>setCompletedTasks([])} onRestore={handleRestoreCompleted} />
          </>
        )}

        {activeNav==='Network Health' && <NetworkHealth schedule={schedule} />}

        {activeNav==='AI Insights' && <InsightsPanel insights={insights} schedule={schedule} />}
      </main>

      {/* MODAL */}
      {modal && (
        <TaskModal
          task={modal==='add' ? null : modal}
          onSave={handleSaveTask}
          onClose={()=>setModal(null)}
        />
      )}

      {viewTask && <TaskDetailDrawer task={viewTask} onClose={()=>setViewTask(null)} onEdit={t=>{setViewTask(null);setModal(t);}} onComplete={task => { setViewTask(null); handleCompleteTask(task); }} />}

      {/* TOAST */}
      {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
    </div>
  );
}

