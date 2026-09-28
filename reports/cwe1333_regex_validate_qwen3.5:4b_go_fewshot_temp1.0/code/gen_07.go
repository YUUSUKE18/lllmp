package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" || len(strings.TrimSpace(line)) == 0 {
			continue
		}
		parts := strings.Split(line, ",")
		validLine := true
		for _, p := range parts {
			tail := strings.TrimRight(p, " \t")
			front := strings.TrimLeft(tail, " \t")
			if len(front) == 0 || len(front) != len(tail) {
				validLine = false
				break
			}
			for _, r := range front {
				if !(r >= '0' && r <= '9') {
					validLine = false
					break
				}
			}
		}
		if validLine {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
