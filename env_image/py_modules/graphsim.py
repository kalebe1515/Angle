import sys, json, heapq
from collections import deque, defaultdict

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
type_ = params.get('type', 'dijkstra')
nodes = params.get('nodes', [])
edges = params.get('edges', [])
start = params.get('start')
end = params.get('end')

# 构建邻接表 || Build adjacency list
adj = defaultdict(list)
for e in edges:
    src, tgt = e['source'], e['target']
    w = e.get('weight', 1)
    adj[src].append((tgt, w))
    if not e.get('directed', False):
        adj[tgt].append((src, w))

path, steps = [], []

if type_ == 'dijkstra':
    # Dijkstra 最短路 || Dijkstra shortest path
    dist = {n['id']: float('inf') for n in nodes}
    prev = {n['id']: None for n in nodes}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, u = heapq.heappop(heap)
        steps.append({'node': u, 'dist': d})
        if u == end:
            break
        for v, w in adj[u]:
            if dist[v] > d + w:
                dist[v] = d + w
                prev[v] = u
                heapq.heappush(heap, (dist[v], v))
    # 回溯路径 || Backtrack path
    u = end
    while u is not None:
        path.append(u)
        u = prev[u]
    path = path[::-1]
elif type_ == 'dfs':
    # 深度优先遍历 || DFS
    stack = [(start, [start])]
    visited = set()
    while stack:
        u, p = stack.pop()
        steps.append({'node': u, 'path': p})
        if u == end:
            path = p
            break
        if u in visited:
            continue
        visited.add(u)
        for v, _ in adj[u]:
            if v not in visited:
                stack.append((v, p + [v]))
elif type_ == 'bfs':
    # 广度优先遍历 || BFS
    queue = deque([(start, [start])])
    visited = set([start])
    while queue:
        u, p = queue.popleft()
        steps.append({'node': u, 'path': p})
        if u == end:
            path = p
            break
        for v, _ in adj[u]:
            if v not in visited:
                visited.add(v)
                queue.append((v, p + [v]))

# 输出路径和步骤 || Output path and steps
json.dump({'path': path, 'steps': steps}, sys.stdout) 