import sys, json
import numpy as np
from scipy.optimize import curve_fit

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
x = np.array(params.get('x', [0,1,2,3]))
y = np.array(params.get('y', [1,2,3,4]))
degree = params.get('degree', 2)

# 多项式拟合函数 || Polynomial fit function
def poly_func(x, *coeffs):
    return sum(c * x**i for i, c in enumerate(coeffs))

try:
    # 多项式拟合 || Polynomial curve fitting
    popt, pcov = curve_fit(lambda x, *c: poly_func(x, *c), x, y, p0=[1]*(degree+1))
    result = {'params': popt.tolist(), 'cov': pcov.tolist()}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 