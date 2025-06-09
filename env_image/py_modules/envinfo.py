import sys, json
import platform
import pkgutil
import pkg_resources

# 获取 Python 版本和已安装包 || Get Python version and installed packages
info = {
    'python_version': platform.python_version(),
    'packages': sorted([p.project_name for p in pkg_resources.working_set]),
    'modules': sorted([m.name for m in pkgutil.iter_modules()]),
}

# 输出结果为 JSON || Output result as JSON
json.dump(info, sys.stdout) 