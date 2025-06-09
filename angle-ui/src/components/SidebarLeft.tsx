import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModuleContext } from '../context/ModuleContext';

// help.md顺序与命名，Python编辑器放首位
const modules = [
  { id: 'python', label: 'PY' },
  { id: 'matrixsolve', label: 'MX' },
  { id: 'symbolcalc', label: 'SY' },
  { id: 'calculus', label: 'CA' },
  { id: 'solveeqs', label: 'SE' },
  { id: 'optimizefit', label: 'OP' },
  { id: 'fftmod', label: 'FT' },
  { id: 'stats', label: 'ST' },
  { id: 'plot2d', label: 'P2' },
  { id: 'plot3d', label: 'P3' },
  { id: 'curvefit', label: 'CF' },
  { id: 'loadcsv', label: 'LC' },
  { id: 'numpycore', label: 'NP' },
  { id: 'md2pdf', label: 'MP' },
  { id: 'tex2pdf', label: 'TP' },
  { id: 'renderpdf', label: 'RP' },
  { id: 'tlatex', label: 'TL' },
  { id: 'importjson', label: 'IJ' },
  { id: 'stdout', label: 'SO' },
  { id: 'envinfo', label: 'EI' },
  { id: 'simcore', label: 'SC' },
  { id: 'anglesim', label: 'AS' },
  { id: 'controlsys', label: 'CS' },
  { id: 'graphsim', label: 'GS' },
  { id: 'visualgraph', label: 'VG' },
  { id: 'py2block', label: 'PB' },
  { id: 'tcodegen', label: 'TC' },
  { id: 'snapshot', label: 'SN' },
  { id: 'modmanager', label: 'MM' },
  { id: 'aiassist', label: 'AI' }
];

const SidebarLeft: React.FC = () => {
  const ctx = useContext(ModuleContext);
  if (!ctx) return null;
  const { currentModule, setCurrentModule } = ctx;
  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        height: '100vh',
        background: 'var(--main-accent)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        borderRight: '1px solid #f5e9c6',
        paddingTop: 12,
      }}
    >
      {modules.map((mod) => (
        <motion.button
          key={mod.id}
          whileHover={{ scale: 1.1 }}
          style={{
            margin: '8px 0',
            width: 40,
            height: 40,
            fontSize: 16,
            borderRadius: '50%',
            background: currentModule === mod.id ? '#ffe082' : '#fffde7',
            border: currentModule === mod.id ? '2px solid #ffb300' : '1.5px solid #ffd54f',
            boxShadow: '0 1px 2px #f5e9c6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: currentModule === mod.id ? 700 : 500,
          }}
          title={mod.id}
          onClick={() => setCurrentModule(mod.id)}
        >
          {mod.label}
        </motion.button>
      ))}
    </aside>
  );
};

export default SidebarLeft;
