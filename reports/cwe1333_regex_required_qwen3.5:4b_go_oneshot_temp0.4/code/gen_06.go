package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	validCount := 0
	scanner := bufio.NewScanner(os.Stdin)
	
	re := regexp.MustCompile(`^\s*(?:\d+(?:,\s*\d+)*)?\s*$`)
	
	for scanner.Scan() {
		line := scanner.Text()
		if re.MatchString(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
