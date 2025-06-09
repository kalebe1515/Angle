import sys, json, os

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
action = params.get('action', 'list')
name = params.get('name', '')
data = params.get('data', {})
snap_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../snapshots'))
os.makedirs(snap_dir, exist_ok=True)

result = {}

try:
    if action == 'save':
        path = os.path.join(snap_dir, f'{name}.json')
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f)
        result = {'status': 'saved', 'name': name}
    elif action == 'load':
        path = os.path.join(snap_dir, f'{name}.json')
        with open(path, 'r', encoding='utf-8') as f:
            loaded = json.load(f)
        result = {'status': 'loaded', 'name': name, 'data': loaded}
    elif action == 'delete':
        path = os.path.join(snap_dir, f'{name}.json')
        os.remove(path)
        result = {'status': 'deleted', 'name': name}
    elif action == 'list':
        files = [f[:-5] for f in os.listdir(snap_dir) if f.endswith('.json')]
        result = {'snapshots': files}
    else:
        result = {'error': 'Unknown action'}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 