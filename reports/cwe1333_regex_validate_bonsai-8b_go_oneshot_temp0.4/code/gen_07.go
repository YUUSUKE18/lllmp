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
		if len(parts) < 2 {
			continue
		}
		valid := true
		for _, part := range parts {
			if part == "" {
				valid = false
				break
			}
			if !strconv.Atoi(part) {
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
