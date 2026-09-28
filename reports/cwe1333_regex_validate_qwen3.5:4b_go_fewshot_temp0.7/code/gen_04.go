package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			continue
		}

		var hasError bool
		for _, p := range parts {
			s := strings.TrimSpace(p)
			if s == "" || !strings.HasPrefix(s, "-") && !strings.HasPrefix(s, "+") {
				if n, err := strconv.Atoi(s); err != nil {
					hasError = true
					break
				}
			}
		}

		if hasError {
			continue
		} else if len(parts) > 1 {
			for i := 0; i < len(parts)-1; i++ {
				s := strings.TrimSpace(parts[i])
				n, err := strconv.Atoi(s)
				if err != nil || (s == "" && n != 0) {
					hasError = true
					break
				}
			}
		}

		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
