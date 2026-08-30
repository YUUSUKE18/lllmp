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
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}

		var hasNonDigit bool
		for _, p := range parts {
			hasNonDigit = false
			for _, r := range p {
				if !strings.ContainsRune("0123456789", r) {
					hasNonDigit = true
					break
				}
			}
			if hasNonDigit {
				break
			}
		}

		if hasNonDigit {
			continue
		}

		for _, p := range parts {
			_, err := strconv.Atoi(p)
			if err != nil {
				continue
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
