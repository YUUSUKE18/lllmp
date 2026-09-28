package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	var validCount int
	r := bufio.NewReader(os.Stdin)
	re := regexp.MustCompile(`^\s*(\d+,?\s*)+\s*$`)

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
