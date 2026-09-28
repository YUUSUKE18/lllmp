package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	validRows := 0
	re := regexp.MustCompile(`^\s*(\d+(\.\d+)?)((,\s*\d+(\.\d+)?)*)?$`)

	for {
		line, isPrefix, err := reader.ReadString('\n')
		if !isPrefix {
			break
		}
		if err != nil {
			return
		}
		stripped := re.MatchString(line)
		if stripped {
			validRows++
		}
	}
	fmt.Printf("valid=%d\n", validRows)
}
