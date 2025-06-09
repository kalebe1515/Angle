import React, { useState } from 'react';
// Snapshot 模块 | Snapshot module
const Snapshot: React.FC = () => {
  const [output, setOutput] = useState('');
  const handleRun = async () => {
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'snapshot',
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
    <div style={{
      padding: 24,
      textAlign: 'center',
      color: '#888',
      background: '#fffde7',
      borderRadius: 8,
      margin: 16,
      boxShadow: '0 2px 8px #f5e9c6'
    }}>
      <div>Snapshot 模块 | Snapshot module</div>
      <button onClick={handleRun}>运行 | Run</button>
      <div>输出区 | Output: {output}</div>
    </div>
  );
};
export default Snapshot; 