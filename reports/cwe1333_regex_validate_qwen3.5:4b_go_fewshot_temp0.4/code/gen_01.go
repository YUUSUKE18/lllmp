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
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		parts := strings.Split(strings.TrimSpace(line), ",")
		if len(parts) == 0 {
			continue
		}
		valid := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				valid = false
				break
			}
			_, err := strconv.Atoi(part)
			if err != nil {
				valid = false
				break
			}
		}
		if valid {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
