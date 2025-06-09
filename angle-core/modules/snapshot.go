package modules

import (
	"encoding/json"
	"os/exec"
)

// RunSnapshot 调用 Python 实现快照系统 || Call Python for snapshot system
func RunSnapshot(input map[string]interface{}) map[string]interface{} {
	inBytes, _ := json.Marshal(input)
	cmd := exec.Command("../env_image/bin/python3.10", "../env_image/py_modules/snapshot.py")
	stdin, _ := cmd.StdinPipe()
	stdout, _ := cmd.StdoutPipe()
	cmd.Start()
	stdin.Write(inBytes)
	stdin.Close()
	outBytes := make([]byte, 40960)
	n, _ := stdout.Read(outBytes)
	cmd.Wait()
	var result map[string]interface{}
	json.Unmarshal(outBytes[:n], &result)
	return result
}
