import sys, json
import subprocess
import tempfile
import os

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
content = params.get('content', '')

try:
    # 创建临时 tex 文件 || Create temp tex file
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, 'eq.tex')
        svg_path = os.path.join(tmpdir, 'eq.svg')
        # 生成完整 LaTeX 文档 || Generate full LaTeX document
        tex_doc = r"""
        \\documentclass[preview]{standalone}
        \\usepackage{amsmath}
        \\begin{document}
        %s
        \\end{document}
        """ % content
        with open(tex_path, 'w', encoding='utf-8') as f:
            f.write(tex_doc)
        # 调用 dvisvgm 渲染为 SVG || Call dvisvgm to render SVG
        subprocess.run(['latex', '-output-directory', tmpdir, tex_path], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        dvi_path = tex_path.replace('.tex', '.dvi')
        subprocess.run(['dvisvgm', dvi_path, '-n', '-o', svg_path], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        with open(svg_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()
        result = {'svg': svg_content}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 