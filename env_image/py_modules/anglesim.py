import sys, json
import math

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
sim_type = params.get('type', 'fall')
mass = float(params.get('mass', 1.0))
g = 9.8
frames = []

if sim_type == 'fall':
    h = float(params.get('height', 10.0))
    t, dt = 0, 0.05
    y = h
    while y > 0:
        y = h - 0.5 * g * t * t
        y = max(y, 0)
        v = g * t
        frames.append({'t': t, 'y': y, 'v': v})
        t += dt
elif sim_type == 'incline':
    angle = float(params.get('angle', 30.0))
    length = float(params.get('length', 5.0))
    theta = math.radians(angle)
    a = g * math.sin(theta)
    t, dt = 0, 0.05
    s = 0
    while s < length:
        s = 0.5 * a * t * t
        s = min(s, length)
        v = a * t
        x = s * math.cos(theta)
        y = s * math.sin(theta)
        frames.append({'t': t, 'x': x, 'y': y, 'v': v})
        t += dt
elif sim_type == 'spring':
    k = float(params.get('k', 10.0))
    x0 = float(params.get('x0', 1.0))
    t, dt = 0, 0.05
    omega = math.sqrt(k / mass)
    while t < 10:
        x = x0 * math.cos(omega * t)
        v = -x0 * omega * math.sin(omega * t)
        frames.append({'t': t, 'x': x, 'v': v})
        t += dt
else:
    frames = []

result = {'frame_data': frames}
# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 