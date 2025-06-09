import sys, json
import sympy as sp

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
eqs = params.get('eqs', ['x + y - 2', 'x - y'])
vars_ = params.get('vars', ['x', 'y'])
try:
    # 定义符号变量 || Define symbols
    symbols = sp.symbols(' '.join(vars_))
    # 构建方程组 || Build equations
    equations = [sp.sympify(eq) for eq in eqs]
    # 求解方程组 || Solve equations
    sol = sp.solve(equations, symbols, dict=True)
    result = {'result': sol}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 