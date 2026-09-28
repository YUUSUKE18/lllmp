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
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if !regexp.MustCompile(`^[\d,]+$`).Match(line) {
			continue
		}
		if strings.Count(line, ",") >= validLines {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
