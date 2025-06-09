import React, { useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
// 全局Python代码编辑器 | Global Python Editor
const Python: React.FC = () => {
  const [code, setCode] = useState('# Type your Python code here\nprint("Hello Angle!")');
  const [output, setOutput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 选择JSON文件并插入代码 | Select JSON file and insert code
  const handleImportJson = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 推荐的自动代码模板
      const path = file.name;
      const template = `\nimport json\nwith open(r'${path}', 'r') as f:\n    data = json.load(f)\n# 自动将画布json转为Python代码并执行\ndef node_to_code(node):\n    # 这里可根据实际节点类型映射为Python代码\n    return f"# 节点: {node['id']} 类型: {node['type']}"\nfor node in data.get('nodes', []):\n    print(node_to_code(node))\n`;
      setCode(c => c + template);
    }
  };

  const handleRun = async () => {
    setOutput('运行中...');
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: 'python', params: { code } })
      });
      const data = await res.json();
      setOutput(data.result || data.output || JSON.stringify(data));
    } catch (err) {
      setOutput('请求失败: ' + err);
    }
  };
  return (
    <div style={{ background: '#fffde7', borderRadius: 8, margin: 16, boxShadow: '0 2px 8px #f5e9c6', padding: 24, position: 'relative' }}>
      {/* 右上角导入JSON按钮 */}
      <button
        style={{ position: 'absolute', right: 24, top: 24, zIndex: 2, background: '#ffd54f', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}
        onClick={handleImportJson}
        title="导入JSON文件"
      >导入JSON</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>全局Python代码编辑器 | Python Editor</div>
      <div style={{ height: 260, marginBottom: 12 }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={v => setCode(v || '')}
          theme="vs"
          options={{ fontSize: 15, minimap: { enabled: false } }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleRun}>运行 | Run</button>
      </div>
      <div style={{ marginTop: 16, color: '#555', background: '#f5e9c6', borderRadius: 6, padding: 10, minHeight: 40 }}>
        <b>输出 Output:</b><br />
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{output}</pre>
      </div>
    </div>
  );
};
export default Python; 