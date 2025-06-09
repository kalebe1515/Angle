package modules

import (
	"encoding/json"
	"os/exec"
)

// RunSolveeqs 调用 Python 实现方程组求解 || Call Python for equation solving
func RunSolveeqs(input map[string]interface{}) map[string]interface{} {
	inBytes, _ := json.Marshal(input)
	cmd := exec.Command("../env_image/bin/python3.10", "../env_image/py_modules/solveeqs.py")
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
