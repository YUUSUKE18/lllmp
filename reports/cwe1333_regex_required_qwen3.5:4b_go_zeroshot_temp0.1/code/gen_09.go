package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // 標準入力
	validCount := 0
	pattern := regexp.MustCompile(`^\s*([0-9]+(\s*,\s*[0-9]+)*|)\s*$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
