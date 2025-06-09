package modules

import (
	"os"
	"path/filepath"
	"time"
)

// RunMdExport 生成 md 文件并返回内容
func RunMdExport(input map[string]interface{}) map[string]interface{} {
	content, _ := input["content"].(string)
	tmpDir := os.TempDir()
	tmpName := time.Now().Format("20060102150405") + ".md"
	path := filepath.Join(tmpDir, tmpName)
	os.WriteFile(path, []byte(content), 0644)
	return map[string]interface{}{
		"filename": tmpName,
		"content":  content,
	}
}
