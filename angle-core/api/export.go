package api

import (
	"io"
	"net/http"
	"os"
	"path/filepath"
)

// DownloadPdfHandler 支持下载 pdf 文件
func DownloadPdfHandler(w http.ResponseWriter, r *http.Request) {
	// CORS 允许跨域请求 || Allow CORS for cross-origin requests
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// 处理预检请求 || Handle preflight OPTIONS request
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	file := r.URL.Query().Get("file")
	if file == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no file specified"))
		return
	}
	path := filepath.Join(os.TempDir(), file)
	pdf, err := os.Open(path)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("file not found"))
		return
	}
	defer pdf.Close()
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "attachment; filename="+file)
	io.Copy(w, pdf)
	os.Remove(path)
}
