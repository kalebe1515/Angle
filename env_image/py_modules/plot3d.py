import sys, json, tempfile, base64
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
x = np.array(params.get('x', [0,1,2,3]))
y = np.array(params.get('y', [0,1,0,-1]))
z = np.array(params.get('z', [0,0,1,1]))
try:
    # 绘制3D图像 || Plot 3D figure
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot(x, y, z)
    ax.set_title(params.get('title', '3D Plot'))
    ax.set_xlabel(params.get('xlabel', 'x'))
    ax.set_ylabel(params.get('ylabel', 'y'))
    ax.set_zlabel(params.get('zlabel', 'z'))
    # 保存为临时文件并转为 base64 || Save as temp file and encode as base64
    with tempfile.NamedTemporaryFile(suffix='.png', delete=True) as tmp:
        fig.savefig(tmp.name)
        tmp.seek(0)
        img_b64 = base64.b64encode(tmp.read()).decode('utf-8')
    plt.close(fig)
    result = {'image_base64': img_b64}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 