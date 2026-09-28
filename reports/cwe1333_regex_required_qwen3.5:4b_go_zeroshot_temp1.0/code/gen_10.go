package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var validCount int
	matchRegex := regexp.MustCompile(`^\s*[\d,]+(?:,\s*\d+)*\s*$`)

	for {
		line, isPrefix, err := reader.ReadBytes('\n')
		if !isPrefix && err != nil {
			break
		}
		line = line[:len(line)-1] // 末尾の改行除去
		matchRegex.MatchString(string(line))
	}
	fmt.Println(`valid=`)
}
