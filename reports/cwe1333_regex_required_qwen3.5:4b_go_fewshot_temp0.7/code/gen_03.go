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
	re := regexp.MustCompile(`^\s*(?:\d+\s*,?\s*)+$`)
	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		isValid := re.MatchString(line)
		if isValid {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
