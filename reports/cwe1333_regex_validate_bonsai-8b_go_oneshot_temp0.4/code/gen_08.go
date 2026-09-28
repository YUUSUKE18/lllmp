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
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 1 {
			continue
		}
		for _, p := range parts {
			if p == "" {
				continue
			}
			n, err := strconv.Atoi(p)
			if err != nil {
				continue
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
