import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';
import type { Connection, Edge, Node } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';

// Graphsim 子模块列表 | Graphsim submodules
const submodules = [
  { type: 'node', label: '节点' },
  { type: 'edge', label: '边' },
  { type: 'weight', label: '权重' },
  { type: 'start', label: '起点' },
  { type: 'end', label: '终点' }
];

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Graphsim: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [output, setOutput] = useState('');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowWrapper.current || !reactFlowInstance) return;
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
    const newNode: Node = {
      id: `${type}_${+new Date()}`,
      type: 'default',
      position,
      data: { label: submodules.find(s => s.type === type)?.label || type }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleRun = async () => {
    const params = {
      nodes: nodes.map(n => ({ id: n.id, type: n.data.label, position: n.position })),
      edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
    };
    try {
      const res = await fetch('http://localhost:8080/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: 'graphsim', params })
      });
      const data = await res.json();
      setOutput(JSON.stringify(data));
    } catch (err) {
      setOutput('请求失败: ' + err);
    }
  };

  return (
    <div style={{ display: 'flex', background: '#fffde7', borderRadius: 8, margin: 16, boxShadow: '0 2px 8px #f5e9c6', minHeight: 480 }}>
      <div ref={reactFlowWrapper} style={{ flex: 1, height: 480, borderRight: '1px solid #f5e9c6' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <div style={{ width: 220, padding: 16, background: '#fffde7' }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>子模块 | Submodules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {submodules.map((mod) => (
            <div
              key={mod.type}
              style={{
                padding: 10,
                borderRadius: 6,
                background: '#fff9c4',
                boxShadow: '0 1px 3px #f5e9c6',
                textAlign: 'center',
                cursor: 'grab',
                userSelect: 'none',
                fontWeight: 500
              }}
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('application/reactflow', mod.type);
                e.dataTransfer.effectAllowed = 'move';
              }}
            >
              {mod.label}
            </div>
          ))}
        </div>
        <button style={{ marginTop: 24, width: '100%' }} onClick={handleRun}>运行 | Run</button>
        <div style={{ marginTop: 16, fontSize: 13, color: '#888' }}>输出区 | Output:<br />{output}</div>
      </div>
    </div>
  );
};

export default Graphsim; 