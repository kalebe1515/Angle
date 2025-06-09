package api

import (
	"angle-core/modules"
	"encoding/json"
	"net/http"
)

// RunHandler 统一调度入口
func RunHandler(w http.ResponseWriter, r *http.Request) {
	// CORS 允许跨域请求 || Allow CORS for cross-origin requests
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// 处理预检请求 || Handle preflight OPTIONS request
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Module string                 `json:"module"`
		Params map[string]interface{} `json:"params"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid json"))
		return
	}

	var result map[string]interface{}
	switch req.Module {
	case "matrixsolve":
		result = modules.RunMatrixsolve(req.Params)
	case "symbolcalc":
		result = modules.RunSymbolcalc(req.Params)
	case "mdexport":
		result = modules.RunMdExport(req.Params)
	case "latexexport":
		result = modules.RunLatexExport(req.Params)
	case "md2pdf":
		result = modules.RunMd2Pdf(req.Params)
	case "python":
		result = modules.RunPython(req.Params)
	case "calculus":
		result = modules.RunCalculus(req.Params)
	case "solveeqs":
		result = modules.RunSolveeqs(req.Params)
	case "fftmod":
		result = modules.RunFftmod(req.Params)
	case "stats":
		result = modules.RunStats(req.Params)
	case "plot2d":
		result = modules.RunPlot2d(req.Params)
	case "plot3d":
		result = modules.RunPlot3d(req.Params)
	case "curvefit":
		result = modules.RunCurvefit(req.Params)
	case "loadcsv":
		result = modules.RunLoadcsv(req.Params)
	case "numpycore":
		result = modules.RunNumpycore(req.Params)
	case "tex2pdf":
		result = modules.RunTex2pdf(req.Params)
	case "renderpdf":
		result = modules.RunRenderpdf(req.Params)
	case "tlatex":
		result = modules.RunTlatex(req.Params)
	case "importjson":
		result = modules.RunImportjson(req.Params)
	case "stdout":
		result = modules.RunStdout(req.Params)
	case "envinfo":
		result = modules.RunEnvinfo(req.Params)
	case "anglesim":
		result = modules.RunAnglesim(req.Params)
	case "simcore":
		result = modules.RunSimcore(req.Params)
	case "controlsys":
		result = modules.RunControlsys(req.Params)
	case "graphsim":
		result = modules.RunGraphsim(req.Params)
	case "visualgraph":
		result = modules.RunVisualgraph(req.Params)
	case "py2block":
		result = modules.RunPy2block(req.Params)
	case "snapshot":
		result = modules.RunSnapshot(req.Params)
	default:
		result = map[string]interface{}{"error": "unknown module"}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
