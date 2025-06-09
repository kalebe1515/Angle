import sys, json
import numpy as np

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
op = params.get('op', 'add')
a = np.array(params.get('a', []))
b = np.array(params.get('b', [])) if 'b' in params else None

try:
    if op == 'add':
        # 数组加法 || Array addition
        result_data = (a + b).tolist()
    elif op == 'mul':
        # 数组乘法 || Array multiplication
        result_data = (a * b).tolist()
    elif op == 'transpose':
        # 数组转置 || Array transpose
        result_data = a.T.tolist()
    else:
        raise ValueError('Unsupported op')
    result = {'result': result_data}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 