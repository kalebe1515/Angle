import React, { useState } from 'react';
// Visualgraph 模块 | Visualgraph module

const submodules = ['节点', '连线', '分组', '注释'];

const SubmoduleSidebar: React.FC<{ submodules: string[] }> = ({ submodules }) => (
  <div style={{
    width: '100%',
    background: '#fffde7',
    borderLeft: '2px solid #ffe082',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>
    {submodules.map(name => (
      <div key={name} style={{
        padding: 8,
        borderRadius: 6,
        background: '#fff9c4',
        boxShadow: '0 1px 3px #f5e9c6',
        textAlign: 'center',
        cursor: 'grab'
      }}>
        {name}
      </div>
    ))}
  </div>
);

const Visualgraph: React.FC = () => {
  const [output, setOutput] = useState('');
  const handleRun = async () => {
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'visualgraph',
          params: {}
        })
      });
      const data = await res.json();
      setOutput(JSON.stringify(data));
    } catch (err) {
      setOutput('请求失败: ' + err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 画布区 */}
      <div style={{
        flex: 1,
        background: '#fffde7',
        margin: 16,
        borderRadius: 8,
        boxShadow: '0 2px 8px #f5e9c6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Visualgraph 画布区 | Canvas Area (可拖拽子模块)</div>
        <button onClick={handleRun}>运行 | Run</button>
        <div>输出区 | Output: {output}</div>
      </div>
      {/* 右侧子模块栏 */}
      <div style={{ width: 180, margin: 16 }}>
        <SubmoduleSidebar submodules={submodules} />
      </div>
    </div>
  );
};

export default Visualgraph; 