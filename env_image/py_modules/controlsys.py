import sys, json
import numpy as np

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
type_ = params.get('type', 'pid')
result = {}

if type_ == 'pid':
    Kp = float(params.get('Kp', 1.0))
    Ki = float(params.get('Ki', 0.0))
    Kd = float(params.get('Kd', 0.0))
    setpoint = float(params.get('setpoint', 1.0))
    dt = float(params.get('dt', 0.01))
    steps = int(params.get('steps', 1000))
    y = 0
    integral = 0
    prev_error = setpoint - y
    t_list, y_list = [], []
    for i in range(steps):
        t = i * dt
        error = setpoint - y
        integral += error * dt
        derivative = (error - prev_error) / dt if i > 0 else 0
        u = Kp * error + Ki * integral + Kd * derivative
        y += u * dt
        prev_error = error
        t_list.append(t)
        y_list.append(y)
    result = {'t': t_list, 'y': y_list}
elif type_ == 'state':
    # 状态空间模型 || State-space model
    A = np.array(params.get('A', [[0]]))
    B = np.array(params.get('B', [[1]]))
    C = np.array(params.get('C', [[1]]))
    D = np.array(params.get('D', [[0]]))
    x = np.array(params.get('x0', [[0]])).reshape(-1,1)
    u = np.array(params.get('u', [[1]]))
    t = np.array(params.get('t', np.linspace(0, 10, 100)))
    y_list = []
    for i in range(len(t)):
        y = C @ x + D @ u[i:i+1] if u.shape[0] > 1 else D * u[i]
        y_list.append(float(y))
        x = A @ x + B * u[i] if u.shape[0] > 1 else A @ x + B * u[i]
    result = {'t': t.tolist(), 'y': y_list}
else:
    result = {'error': 'Unknown type'}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 