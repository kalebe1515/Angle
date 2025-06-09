package modules

import (
	"encoding/json"
	"os/exec"
)

// RunVisualgraph 仅回传模块流图结构 || Just return the module flow graph structure
func RunVisualgraph(input map[string]interface{}) map[string]interface{} {
	inBytes, _ := json.Marshal(input)
	cmd := exec.Command("../env_image/bin/python3.10", "../env_image/py_modules/visualgraph.py")
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
