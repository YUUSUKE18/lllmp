package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
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
		sc.Shunt(buf, n)
		if n == 0 {
			break
		}
		line := strings.TrimSpace(buf[:n])
		if !regexp.MustCompile(`^(\d+)(?:,\d+)*$`).Match(line) {
			continue
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
