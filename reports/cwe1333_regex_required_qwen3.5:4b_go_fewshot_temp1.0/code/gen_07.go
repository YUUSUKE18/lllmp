package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	validLines := 0
	reader := bufio.NewReader(os.Stdin)
	re := regexp.MustCompile(`^\s*(\d+(?:,\d+)*)\s*$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
