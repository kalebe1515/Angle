import sys, json

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
filepath = params.get('filepath', '')

try:
    # 加载 JSON 文件 || Load JSON file
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    result = {'data': data}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 