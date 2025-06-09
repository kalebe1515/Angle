import sys, json, math
from collections import defaultdict, deque

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
nodes = params.get('nodes', [])
edges = params.get('edges', [])
extra_params = params.get('params', {})

# 构建邻接表和入度表 || Build adjacency and indegree
adj = defaultdict(list)
indegree = defaultdict(int)
for e in edges:
    adj[e['source']].append(e['target'])
    indegree[e['target']] += 1

# 节点信息映射 || Node info map
node_map = {n['id']: n for n in nodes}

# 拓扑排序 || Topological sort
queue = deque([n['id'] for n in nodes if indegree[n['id']] == 0])
order = []
while queue:
    nid = queue.popleft()
    order.append(nid)
    for t in adj[nid]:
        indegree[t] -= 1
        if indegree[t] == 0:
            queue.append(t)

# 计算每个节点输出 || Compute node outputs
results = {}
for nid in order:
    n = node_map[nid]
    ntype = n.get('type', 'const')
    inputs = [results[e['source']] for e in edges if e['target'] == nid]
    val = None
    if ntype == 'const':
        val = n.get('value', extra_params.get(nid, 0))
    elif ntype == 'add':
        val = sum(inputs)
    elif ntype == 'sub':
        val = inputs[0] - sum(inputs[1:]) if inputs else 0
    elif ntype == 'mul':
        val = 1
        for v in inputs: val *= v
    elif ntype == 'div':
        val = inputs[0]
        for v in inputs[1:]: val /= v
    elif ntype == 'floordiv':
        val = inputs[0]
        for v in inputs[1:]: val //= v
    elif ntype == 'mod':
        val = inputs[0]
        for v in inputs[1:]: val %= v
    elif ntype == 'sin':
        val = math.sin(inputs[0]) if inputs else 0
    elif ntype == 'cos':
        val = math.cos(inputs[0]) if inputs else 0
    elif ntype == 'tan':
        val = math.tan(inputs[0]) if inputs else 0
    elif ntype == 'max':
        val = max(inputs) if inputs else 0
    elif ntype == 'min':
        val = min(inputs) if inputs else 0
    else:
        val = None
    results[nid] = val

# 输出每个节点结果 || Output node results
json.dump({'results': results}, sys.stdout) 