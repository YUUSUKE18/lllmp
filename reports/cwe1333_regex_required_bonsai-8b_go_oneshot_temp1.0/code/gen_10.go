package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string

	sc.Scan()
	for { ; sc.Scan(); } {
		line := strings.TrimSpace(sc.Text())
		if regexp.MustCompile(`^(\d+)(?:,\d+)*$`).Match(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
