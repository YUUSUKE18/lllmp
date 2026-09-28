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
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		sc.Clear()
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 1 {
			continue
		}
		for _, part := range parts {
			if part == "" {
				continue
			}
			if part == "" {
				continue
			}
			n, err := strconv.Atoi(part)
			if err != nil {
				sc.Err()
				break
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
