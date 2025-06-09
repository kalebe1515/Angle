import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import ModulePanel from '../components/ModulePanel';
import OutputConsole from '../components/OutputConsole';
import { ModuleContextProvider } from '../context/ModuleContext';

/**
 * Angle 主编辑器页面 || Angle Main Editor Page
 * 包含左侧栏、中间区、右侧栏和输出区 || Includes left sidebar, center area, right sidebar, and output area
 */
const MainEditor: React.FC = () => {
  const [runResult, setRunResult] = React.useState<any>(null);
  return (
    <ModuleContextProvider>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--main-bg)' }}>
        {/* 左侧模块栏 || Left Sidebar */}
        <SidebarLeft />
        {/* 中间模块内容区 || Center Module Panel */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <ModulePanel />
          {/* 输出区固定在右下角 || Output Console fixed at bottom right */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: 'var(--output-width)', height: 'var(--output-height)', zIndex: 10 }}>
            <OutputConsole result={runResult} />
          </div>
        </div>
        {/* 右侧控制栏 || Right Sidebar */}
        <SidebarRight onRunResult={setRunResult} />
      </div>
    </ModuleContextProvider>
  );
};

export default MainEditor;
