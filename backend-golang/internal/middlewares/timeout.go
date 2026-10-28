package middlewares

import (
	"context"
	"net/http"
	"time"
)

func TimeoutMiddleware(timeDuration time.Duration) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/api/v1/downloader/download" {
				next.ServeHTTP(w, r)
				return
			}
			ctx, cancel := context.WithTimeout(r.Context(), timeDuration)

			defer cancel()
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
