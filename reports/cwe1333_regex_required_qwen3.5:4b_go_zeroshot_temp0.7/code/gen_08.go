package main

import (
	"bufio"
	"fmt"
	"regexp"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	re := regexp.MustCompile(`^\s*[\d,]+(\s*,\s*)?$`)

	validCount := 0
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	for line != "" {
		line = re.FindString(line)
		if len(line) == 0 {
			validCount++
		}
		line, _ = reader.ReadString('\n')
	}

	fmt.Printf("valid=%d\n", validCount)
}
