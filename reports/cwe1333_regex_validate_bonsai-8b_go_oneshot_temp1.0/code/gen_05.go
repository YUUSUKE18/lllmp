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
	for _, line := range strings.Fields(sc.Text()) {
		if strings.TrimSpace(line) {
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
			n, err := strconv.Atoi(part)
			if err != nil {
				continue
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
