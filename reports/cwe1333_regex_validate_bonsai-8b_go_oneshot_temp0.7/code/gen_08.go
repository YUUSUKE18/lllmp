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

	sc.Scan()
	for {
		sc.Scan()
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			break
		}
		parts := strings.Split(line, ",")
		if len(parts) >= 1 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
