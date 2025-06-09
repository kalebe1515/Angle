import React, { useRef, useState } from 'react';
// Tex2pdf 模块 | Tex2pdf module
const Tex2pdf: React.FC = () => {
  const [output, setOutput] = useState('');
  const [content, setContent] = useState('% LaTeX to PDF\n\nType your LaTeX content here...');
  const fileRef = useRef<HTMLAnchorElement>(null);
  const handleExport = () => {
    const blob = new Blob([content], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    fileRef.current!.href = url;
    fileRef.current!.download = 'angle.tex';
    fileRef.current!.click();
  };
  const handleRun = async () => {
    setOutput('运行中...');
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: 'tex2pdf', params: { content } })
      });
      const data = await res.json();
      setOutput(data.result || data.output || JSON.stringify(data));
    } catch (err) {
      setOutput('请求失败: ' + err);
    }
  };
  return (
    <div style={{ padding: 24, color: '#888', background: '#fffde7', borderRadius: 8, margin: 16, boxShadow: '0 2px 8px #f5e9c6' }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>LaTeX 转 PDF | LaTeX to PDF</div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: '100%', height: 200, fontFamily: 'monospace', fontSize: 15, borderRadius: 6, border: '1.5px solid #ffd54f', padding: 8, background: '#fff' }}
      />
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button onClick={handleRun}>Convert to PDF</button>
        <button onClick={handleExport}>Export .tex</button>
        <a ref={fileRef} style={{ display: 'none' }}>Download</a>
      </div>
      <div style={{ marginTop: 16, color: '#555', background: '#f5e9c6', borderRadius: 6, padding: 10, minHeight: 40 }}>
        <b>输出 Output:</b><br />
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{output}</pre>
      </div>
    </div>
  );
};
export default Tex2pdf; 