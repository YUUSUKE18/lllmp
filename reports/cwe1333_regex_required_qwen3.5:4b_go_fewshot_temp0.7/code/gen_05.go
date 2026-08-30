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
	re := regexp.MustCompile(`^\s*(?:\d+(?:,\s*\d+)*|,\s*$)\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1] // 末尾の改行を除去
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
