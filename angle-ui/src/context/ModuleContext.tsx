import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// help.md顺序与命名，Python编辑器放首位
export const moduleIds = [
  'python',
  'matrixsolve', 'symbolcalc', 'calculus', 'solveeqs', 'optimizefit', 'fftmod', 'stats', 'plot2d', 'plot3d',
  'curvefit', 'loadcsv', 'numpycore', 'md2pdf', 'tex2pdf', 'renderpdf', 'tlatex', 'importjson', 'stdout', 'envinfo',
  'simcore', 'anglesim', 'controlsys', 'graphsim', 'visualgraph', 'py2block', 'tcodegen', 'snapshot', 'modmanager', 'aiassist'
];

export interface ModuleContextType {
  currentModule: string;
  setCurrentModule: (id: string) => void;
  params: Record<string, any>;
  setParams: (params: Record<string, any>) => void;
}

export const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentModule, setCurrentModule] = useState<string>(moduleIds[0]);
  const [params, setParams] = useState<Record<string, any>>({});

  return (
    <ModuleContext.Provider value={{ currentModule, setCurrentModule, params, setParams }}>
      {children}
    </ModuleContext.Provider>
  );
};
