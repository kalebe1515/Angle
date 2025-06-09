package modules

import (
	"encoding/json"
	"os/exec"
)

// RunMatrixsolve 调用 Python 实现矩阵求解 || Call Python for matrix solving
func RunMatrixsolve(input map[string]interface{}) map[string]interface{} {
	// 参数转为 JSON || Marshal params to JSON
	inBytes, _ := json.Marshal(input)
	cmd := exec.Command("../env_image/bin/python3.10", "../env_image/py_modules/matrixsolve.py")
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
