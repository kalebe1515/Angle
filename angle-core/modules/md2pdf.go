package modules

import (
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

// RunMd2Pdf 生成 pdf 文件并返回下载链接
func RunMd2Pdf(input map[string]interface{}) map[string]interface{} {
	content, _ := input["content"].(string)
	typeStr, _ := input["type"].(string) // "md" or "tex"
	tmpDir := os.TempDir()
	tmpName := time.Now().Format("20060102150405")
	inExt := ".md"
	if typeStr == "tex" {
		inExt = ".tex"
	}
	inPath := filepath.Join(tmpDir, tmpName+inExt)
	outPath := filepath.Join(tmpDir, tmpName+".pdf")
	os.WriteFile(inPath, []byte(content), 0644)
	cmd := exec.Command("pandoc", inPath, "-o", outPath)
	cmd.Run()
	return map[string]interface{}{
		"filename": tmpName + ".pdf",
		"download": "/download/pdf?file=" + tmpName + ".pdf",
	}
}
