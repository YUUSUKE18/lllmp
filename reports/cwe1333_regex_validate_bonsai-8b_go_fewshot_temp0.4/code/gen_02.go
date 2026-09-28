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
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		lines := strings.Fields(buf)
		if len(lines) < 1 {
			continue
		}
		for _, line := range lines {
			if strings.TrimSpace(line) == "" {
				continue
			}
			if !strings.Contains(line, ",") {
				continue
			}
			parts := strings.Split(line, ",")
			if len(parts) < 2 {
				continue
			}
			for _, part := range parts {
				if !strings.TrimSpace(part) {
					continue
				}
				if !strconv.Atoi(part) {
					continue
				}
			}
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
