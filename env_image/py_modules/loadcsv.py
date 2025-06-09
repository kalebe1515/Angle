import sys, json
import pandas as pd

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
filepath = params.get('filepath', 'data.csv')
try:
    # 加载 CSV 文件 || Load CSV file
    df = pd.read_csv(filepath)
    data = df.to_dict(orient='list')
    result = {'data': data}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 