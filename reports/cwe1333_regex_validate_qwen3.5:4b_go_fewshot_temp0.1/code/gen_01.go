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
		isValid := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}
			_, err := strconv.Atoi(part)
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
