package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewScanner(os.Stdin)
	validLines := 0

	for r.Scan() {
		line := r.Text()
		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			continue
		}

		isValid := true
		for _, p := range parts {
			s := strings.TrimSpace(p)
			if s == "" {
				isValid = false
				break
			}
			_, err := strconv.Atoi(s)
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
