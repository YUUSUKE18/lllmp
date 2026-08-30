package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	validLines := 0
	re := regexp.MustCompile(`^\s*(\d+(?:,\d+)*)\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
