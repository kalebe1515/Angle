import React from 'react';

const OutputConsole: React.FC<{ result?: any }> = ({ result }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fffde7',
      border: '1.5px solid #ffd54f',
      borderRadius: 8,
      boxShadow: '0 2px 8px #f5e9c6',
      padding: 12,
      fontSize: 14,
      color: '#444',
      overflowY: 'auto',
    }}>
      <div style={{ color: '#888', fontSize: 13 }}>输出区 | Output Area</div>
      <div style={{ marginTop: 8 }}>
        {result ? (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <>运行结果将在此显示...<br/>Run result will be shown here...</>
        )}
      </div>
    </div>
  );
};

export default OutputConsole;
