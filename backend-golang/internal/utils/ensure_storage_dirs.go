package utils

import (
	"fmt"
	"os"
)

func EnsureStorageDirs(dirs []string) error {
	for _, dir := range dirs {
		if dir == "" {
			continue
		}
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("failed to create storage directory %s: %w", dir, err)
		}
	}
	return nil
}
