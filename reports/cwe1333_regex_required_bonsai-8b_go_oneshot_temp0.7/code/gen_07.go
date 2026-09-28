package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines = 0
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if !regexp.MatchString(`^(\d+[\s\d]*)*(\d+[\s\d]*)*$', line) {
			continue
		}
		if len(line) > 0 {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
