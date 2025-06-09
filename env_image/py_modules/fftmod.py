import sys, json
import numpy as np

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
x = np.array(params.get('x', [0,1,0,-1]))
try:
    # 傅里叶变换 || FFT
    y = np.fft.fft(x)
    result = {'result': y.tolist()}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 