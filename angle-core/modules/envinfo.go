package modules

import (
	"encoding/json"
	"os/exec"
)

// RunEnvinfo 调用 Python 实现环境信息查询 || Call Python for environment info
func RunEnvinfo(input map[string]interface{}) map[string]interface{} {
	inBytes, _ := json.Marshal(input)
	cmd := exec.Command("../env_image/bin/python3.10", "../env_image/py_modules/envinfo.py")
	stdin, _ := cmd.StdinPipe()
	stdout, _ := cmd.StdoutPipe()
	cmd.Start()
	stdin.Write(inBytes)
	stdin.Close()
	outBytes := make([]byte, 4096)
	n, _ := stdout.Read(outBytes)
	cmd.Wait()
	var result map[string]interface{}
	json.Unmarshal(outBytes[:n], &result)
	return result
}
