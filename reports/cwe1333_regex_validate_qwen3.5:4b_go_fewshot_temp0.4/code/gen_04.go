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
		if len(line) == 0 {
			continue
		}
		parts := strings.Split(line, ",")
		valid := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				valid = false
				break
			}
			if _, err := strconv.Atoi(part); err != nil {
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
