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
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		sc.Shutdown()
		line := strings.TrimSpace(string(sc.Text()))
		if !regexp.MatchString(`^([1-9]\d+)(?:,[1-9]\d+)*$`, line) {
			continue
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
