import sys, json
import sympy as sp

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
expr_str = params.get('expr', 'x**2')
var_str = params.get('var', 'x')
mode = params.get('mode', 'diff')  # diff, integrate, limit
point = params.get('point', 0)
try:
    x, y, z = sp.symbols('x y z')
    expr = sp.sympify(expr_str)
    var = sp.Symbol(var_str)
    if mode == 'diff':
        # 求导 || Derivative
        result_val = sp.diff(expr, var)
    elif mode == 'integrate':
        # 积分 || Integral
        result_val = sp.integrate(expr, var)
    elif mode == 'limit':
        # 极限 || Limit
        result_val = sp.limit(expr, var, point)
    else:
        result_val = 'Unknown mode'
    result = {'result': str(result_val)}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 