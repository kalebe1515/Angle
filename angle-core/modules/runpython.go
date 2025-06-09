package modules

import (
	"os/exec"
)

// RunPython 运行 Python 代码（支持 code/pycode 字段）
func RunPython(input map[string]interface{}) map[string]interface{} {
	code := ""
	if v, ok := input["code"]; ok {
		code, _ = v.(string)
	} else if v, ok := input["pycode"]; ok {
		code, _ = v.(string)
	}
	if code == "" {
		return map[string]interface{}{"error": "no code provided"}
	}
	cmd := exec.Command("../env_image/bin/python3.10", "-c", code)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return map[string]interface{}{"error": err.Error(), "output": string(out)}
	}
	return map[string]interface{}{"result": string(out)}
}
