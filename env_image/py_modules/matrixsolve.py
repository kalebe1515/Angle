import sys, json
import numpy as np

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
A = np.array(params.get('A', [[1,0],[0,1]]))
b = np.array(params.get('b', [0,0]))

try:
    # 求解线性方程组 Ax = b || Solve Ax = b
    x = np.linalg.solve(A, b)
    result = {'result': x.tolist()}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 