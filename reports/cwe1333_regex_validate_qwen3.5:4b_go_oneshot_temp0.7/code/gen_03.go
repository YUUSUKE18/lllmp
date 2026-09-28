package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	var validCount int
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^\s*(\d+)(?:,\s*\d+)*$`)
		match := re.FindString(line)
		if match != "" {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
