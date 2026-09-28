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
	sc.Scan()
	var validLines int
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 1 {
			continue
		}
		var allDigits bool
		for _, part := range parts {
			if part == "" {
				continue
			}
			if !allDigits {
				allDigits = false
			}
			n, err := strconv.Atoi(part)
			if err != nil {
				continue
			}
		}
		if allDigits {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
