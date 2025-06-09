import React, { useContext } from 'react';
import { ModuleContext } from '../context/ModuleContext';

interface SidebarRightProps {
  onRunResult?: (result: any) => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ onRunResult }) => {
  const ctx = useContext(ModuleContext);
  if (!ctx) return null;
  const { currentModule, params, setParams } = ctx;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [currentModule]: { ...params[currentModule], [e.target.name]: e.target.value } });
  };

  const handleRun = async () => {
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: currentModule,
          params: params[currentModule] || {},
        }),
      });
      const data = await res.json();
      if (onRunResult) onRunResult(data);
    } catch (err) {
      if (onRunResult) onRunResult({ error: 'Network error' });
    }
  };

  return (
    <aside
      style={{
        width: 'var(--sidebar-right-width)',
        height: '100vh',
        background: 'var(--main-accent)',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #f5e9c6',
      }}
    >
      <div style={{ height: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <button>📂</button>
        <button onClick={handleRun}>▶️</button>
      </div>
      <div style={{ height: '90%', overflowY: 'auto', padding: 8 }}>
        <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>参数输入区<br/>Params Area</div>
        <form style={{ marginTop: 12 }}>
          <label style={{ fontSize: 13, color: '#555' }}>
            参数1 Param1:
            <input
              type="text"
              name="param1"
              value={params[currentModule]?.param1 || ''}
              onChange={handleChange}
              style={{ marginLeft: 4, borderRadius: 4, border: '1px solid #ffd54f', padding: '2px 6px' }}
            />
          </label>
        </form>
      </div>
    </aside>
  );
};

export default SidebarRight;
