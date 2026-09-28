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
		isValid := true
		var lastPart string
		for _, part := range parts {
			p = strings.TrimSpace(part)
			if p == "" {
				isValid = false
				break
			}
			n, err := strconv.Atoi(p)
			if err != nil {
				isValid = false
				break
			}
			lastPart = p
		}
		if isValid {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
