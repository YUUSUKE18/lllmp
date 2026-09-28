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
		sc.Error("")
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			sc.Error("")
			continue
		}
		for _, part := range parts {
			if part == "" {
				sc.Error("")
				continue
			}
			n, err := strconv.Atoi(part)
			if err != nil {
				sc.Error("")
				continue
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
