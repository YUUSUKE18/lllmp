package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int

	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		sc.Scan()
		if err != nil {
			break
		}
		line := strings.TrimSpace(buf[:n])
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
		if re.MatchString(line) {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
