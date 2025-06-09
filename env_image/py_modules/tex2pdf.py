import sys, json, os, time, subprocess

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
content = params.get('content', '')
tmp_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..', 'tmp'))
os.makedirs(tmp_dir, exist_ok=True)
tmp_name = time.strftime('%Y%m%d%H%M%S')
tex_path = os.path.join(tmp_dir, tmp_name + '.tex')
pdf_path = os.path.join(tmp_dir, tmp_name + '.pdf')

with open(tex_path, 'w', encoding='utf-8') as f:
    f.write(content)

try:
    # 调用 pdflatex 生成 PDF || Call pdflatex to generate PDF
    subprocess.run(['pdflatex', '-output-directory', tmp_dir, tex_path], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    result = {'filename': tmp_name + '.pdf', 'download': '/download/pdf?file=' + tmp_name + '.pdf'}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 