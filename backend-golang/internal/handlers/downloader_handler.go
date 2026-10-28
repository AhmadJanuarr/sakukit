package handlers

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
	"toolkits/internal/config"
	"toolkits/internal/services"
	"toolkits/internal/utils"
)

type DownloaderHandler struct {
	config    *config.Config
	semaphore chan struct{}
}

func NewDownloaderHandler(cfg *config.Config, sem chan struct{}) *DownloaderHandler {
	return &DownloaderHandler{
		config:    cfg,
		semaphore: sem,
	}
}

func (h *DownloaderHandler) Downloader(w http.ResponseWriter, r *http.Request) {
	select {
	case h.semaphore <- struct{}{}:
		defer func() { <-h.semaphore }()
	default:
		utils.JSONResponse(w, http.StatusServiceUnavailable, map[string]interface{}{
			"status":  http.StatusServiceUnavailable,
			"message": "Server sibuk, coba lagi sebentar",
		})
		return
	}

	inputURL := strings.TrimSpace(r.URL.Query().Get("inputURL"))
	formatID := strings.TrimSpace(r.URL.Query().Get("format_id"))
	extension := strings.ToLower(strings.TrimPrefix(r.URL.Query().Get("ext"), "."))
	fileSizeStr := strings.TrimSpace(r.URL.Query().Get("fileSize"))

	if inputURL == "" || formatID == "" || !isSafeExtension(extension) {
		utils.JSONResponse(w, http.StatusBadRequest, map[string]any{
			"status":  http.StatusBadRequest,
			"message": "Input, format, atau ekstensi file tidak valid",
		})
		return
	}

	fileName := fmt.Sprintf("media_download.%s", extension)

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", mime.FormatMediaType(
		"attachment", map[string]string{"filename": fileName},
	))
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	if fileSizeStr != "" && fileSizeStr != "0" {
		if size, err := strconv.ParseInt(fileSizeStr, 10, 64); err == nil && size > 0 {
			w.Header().Set("Content-Length", strconv.FormatInt(size, 10))
			log.Printf("[INFO] Content-Length diset: %d bytes", size)
		}
	} else {
		log.Printf("[WARN] fileSize kosong/0, Content-Length tidak diset")
	}
	err := streamMediaDirectly(r.Context(), w, inputURL, formatID)
	if err != nil {
		log.Printf("[STREAM ERROR] %v", err)
		return
	}
}

func streamMediaDirectly(ctx context.Context, w http.ResponseWriter, inputURL, formatID string) error {

	args := []string{
		"-f", formatID,
		"-o", "-",
		"--no-playlist",
		"--concurrent-fragments", "5",
		"--postprocessor-args", "ffmpeg:-movflags frag_keyframe+empty_moov+default_base_moof",
		inputURL,
	}
	cmd := exec.CommandContext(ctx, ".\\yt-dlp.exe", args...)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to create stdout pipe: %w", err)
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("failed to create stderr pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start yt-dlp command: %w", err)
	}

	var stderrLog strings.Builder
	go func() {
		_, _ = io.Copy(&stderrLog, stderr)
	}()

	buf := make([]byte, 64*1024)
	bytesCopied, err := io.CopyBuffer(w, stdout, buf)
	cmdErr := cmd.Wait()
	if bytesCopied == 0 || cmdErr != nil {
		log.Printf("\n================ [DOWNLOAD ERROR LOG] ================\n")
		log.Printf("Bytes Copied: %d", bytesCopied)
		log.Printf("Command Err : %v", cmdErr)
		log.Printf("STDERR Output:\n%s", stderrLog.String())
		log.Printf("======================================================\n")
		return fmt.Errorf("yt-dlp error: %s", stderrLog.String())
	}

	return nil
}

func (h *DownloaderHandler) DownloaderGetInfo(w http.ResponseWriter, r *http.Request) {

	select {
	case h.semaphore <- struct{}{}:
		defer func() { <-h.semaphore }()
		//
		inputURL := r.FormValue("inputURL")
		if strings.Contains(inputURL, "/photo/") {
			utils.JSONResponse(w, http.StatusBadRequest, map[string]interface{}{
				"status":  http.StatusBadRequest,
				"message": "Maaf, untuk saat ini format tiktok berupa slide foto belum mendukung",
			})
			return
		}

		if inputURL == "" {
			utils.JSONResponse(w, http.StatusBadRequest, map[string]interface{}{
				"status":  http.StatusBadRequest,
				"message": "inputURL tidak boleh kosong atau tidak valid",
			})
			return
		}

		info, err := services.ProcessGetInfo(r.Context(), inputURL)
		if err != nil {
			utils.JSONResponse(w, http.StatusInternalServerError, map[string]interface{}{
				"status":  http.StatusInternalServerError,
				"message": "Gagal mengambil informasi video, waktu tunggu melebihi batas 30 detik, silahkan coba lagi",
				"error":   err.Error(),
			})
			return
		}
		utils.JSONResponse(w, http.StatusOK, map[string]interface{}{
			"status":  http.StatusOK,
			"message": "Informasi video berhasil diambil",
			"data": map[string]interface{}{
				"info": info,
			},
		})
	default:
		utils.JSONResponse(w, http.StatusServiceUnavailable, map[string]interface{}{
			"status":  http.StatusServiceUnavailable,
			"message": "Server sibuk, coba lagi sebentar",
		})
		return
	}

}

func isSafeExtension(extension string) bool {
	if extension == "" || len(extension) > 10 {
		return false
	}
	for _, char := range extension {
		if (char < 'a' || char > 'z') && (char < '0' || char > '9') {
			return false
		}
	}
	return true
}
