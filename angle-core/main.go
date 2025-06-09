package main

import (
	"log"
	"net/http"

	"angle-core/api"
)

func main() {
	http.HandleFunc("/run", api.RunHandler)
	http.HandleFunc("/download/pdf", api.DownloadPdfHandler)

	log.Println("Angle 控制层已启动，端口: 8080 | Angle core started on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
