import sys, json

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
nodes = params.get('nodes', [])
edges = params.get('edges', [])
extra_params = params.get('params', {})

# 简单校验 || Simple validation
if not isinstance(nodes, list) or not isinstance(edges, list):
    result = {'error': 'Invalid nodes or edges'}
else:
    result = {'nodes': nodes, 'edges': edges, 'params': extra_params}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 