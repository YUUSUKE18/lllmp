package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	validCount := 0
	re := regexp.MustCompile(`^\s*([0-9]+(?:\s*,\s*[0-9]+)*)(?:\s*,)?\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if re.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
