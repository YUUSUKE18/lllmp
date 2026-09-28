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
		n, err := sc.Read([]byte(1 << 30))
		if err != nil {
			break
		}
		lines := strings.Fields(strings.TrimSpace(string(n)))
		if len(lines) >= 1 {
			var isValid bool
			for _, s := range lines {
				if !strings.TrimSpace(s) || !strconv.Atoi(s) {
					isValid = false
					break
				}
			}
			if isValid {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
