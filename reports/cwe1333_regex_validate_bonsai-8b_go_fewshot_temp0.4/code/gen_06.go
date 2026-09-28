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
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		parts := strings.Split(buf[:n], ",")
		if len(parts) < 2 {
			continue
		}
		valid := true
		for _, p := range parts {
			if len(p) == 0 || !strings.TrimSpace(p) {
				valid = false
				break
			}
			if _, err := strconv.Atoi(p); err != nil {
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
