import sys, json
import sympy as sp

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
expr_str = params.get('expr', 'x + x + 1')
try:
    # 符号表达式简化 || Symbolic expression simplification
    x, y, z = sp.symbols('x y z')
    expr = sp.sympify(expr_str)
    simplified = sp.simplify(expr)
    result = {'result': str(simplified)}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 