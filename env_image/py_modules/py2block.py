import sys, json, ast

# 读取输入参数 || Read input params
params = json.load(sys.stdin)
pycode = params.get('pycode', '')

block_list = []

# 递归解析 AST 节点为 block || Recursively parse AST node to block

def node_to_block(node):
    if isinstance(node, ast.If):
        return {'type': 'if', 'test': ast.dump(node.test), 'body': [node_to_block(n) for n in node.body]}
    elif isinstance(node, ast.For):
        return {'type': 'for', 'target': ast.dump(node.target), 'iter': ast.dump(node.iter), 'body': [node_to_block(n) for n in node.body]}
    elif isinstance(node, ast.While):
        return {'type': 'while', 'test': ast.dump(node.test), 'body': [node_to_block(n) for n in node.body]}
    elif isinstance(node, ast.Assign):
        return {'type': 'assign', 'targets': [ast.dump(t) for t in node.targets], 'value': ast.dump(node.value)}
    elif isinstance(node, ast.Expr):
        return {'type': 'expr', 'value': ast.dump(node.value)}
    else:
        return {'type': type(node).__name__}

try:
    tree = ast.parse(pycode)
    for n in tree.body:
        block_list.append(node_to_block(n))
    result = {'block_list': block_list}
except Exception as e:
    result = {'error': str(e)}

# 输出结果为 JSON || Output result as JSON
json.dump(result, sys.stdout) 