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
		if len(parts) < 1 {
			continue
		}
		for _, p := range parts {
			if strings.TrimSpace(p) == "" {
				continue
			}
			if !strconv.Atoi(p) {
				continue
			}
		}
		validLines++
		sc.Scan(buf)
	}
	fmt.Printf("valid=%d\n", validLines)
}
