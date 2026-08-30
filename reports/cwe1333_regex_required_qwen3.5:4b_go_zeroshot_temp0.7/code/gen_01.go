package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil により標準入力が読み込まれる

	var validCount int
	re := regexp.MustCompile(`^\s*(\d+(?:,\d+)*|\s*)+$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		cleanedLine := re.MatchString(line)
		if cleanedLine {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
