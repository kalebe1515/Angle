import React, { useContext } from 'react';
import { ModuleContext } from '../context/ModuleContext';
// 自动导入所有模块组件
import Python from './modules/Python';
import Matrixsolve from './modules/Matrixsolve';
import Symbolcalc from './modules/Symbolcalc';
import Calculus from './modules/Calculus';
import Solveeqs from './modules/Solveeqs';
import Optimizefit from './modules/Optimizefit';
import Fftmod from './modules/Fftmod';
import Stats from './modules/Stats';
import Plot2d from './modules/Plot2d';
import Plot3d from './modules/Plot3d';
import Curvefit from './modules/Curvefit';
import Loadcsv from './modules/Loadcsv';
import Numpycore from './modules/Numpycore';
import Md2pdf from './modules/Md2pdf';
import Tex2pdf from './modules/Tex2pdf';
import Renderpdf from './modules/Renderpdf';
import Tlatex from './modules/Tlatex';
import Importjson from './modules/Importjson';
import Stdout from './modules/Stdout';
import Envinfo from './modules/Envinfo';
import Simcore from './modules/Simcore';
import Anglesim from './modules/Anglesim';
import Controlsys from './modules/Controlsys';
import Graphsim from './modules/Graphsim';
import Visualgraph from './modules/Visualgraph';
import Py2block from './modules/Py2block';
import Tcodegen from './modules/Tcodegen';
import Snapshot from './modules/Snapshot';
import Modmanager from './modules/Modmanager';
import Aiassist from './modules/Aiassist';

const moduleCompMap: Record<string, React.FC> = {
  python: Python,
  matrixsolve: Matrixsolve,
  symbolcalc: Symbolcalc,
  calculus: Calculus,
  solveeqs: Solveeqs,
  optimizefit: Optimizefit,
  fftmod: Fftmod,
  stats: Stats,
  plot2d: Plot2d,
  plot3d: Plot3d,
  curvefit: Curvefit,
  loadcsv: Loadcsv,
  numpycore: Numpycore,
  md2pdf: Md2pdf,
  tex2pdf: Tex2pdf,
  renderpdf: Renderpdf,
  tlatex: Tlatex,
  importjson: Importjson,
  stdout: Stdout,
  envinfo: Envinfo,
  simcore: Simcore,
  anglesim: Anglesim,
  controlsys: Controlsys,
  graphsim: Graphsim,
  visualgraph: Visualgraph,
  py2block: Py2block,
  tcodegen: Tcodegen,
  snapshot: Snapshot,
  modmanager: Modmanager,
  aiassist: Aiassist
};

const ModulePanel: React.FC = () => {
  const ctx = useContext(ModuleContext);
  if (!ctx) return null;
  const { currentModule } = ctx;
  const Comp = moduleCompMap[currentModule];
  if (!Comp) return <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>未找到模块组件 | Module not found</div>;
  return <Comp />;
};

export default ModulePanel;
