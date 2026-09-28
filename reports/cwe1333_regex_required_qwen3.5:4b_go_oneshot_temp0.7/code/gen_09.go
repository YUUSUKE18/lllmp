package main

import (
	"fmt"
	"os"
	"strings"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*[\d,]+(?:\s*$)`)
	validRows := 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if re.MatchString(line) {
			validRows++
		}
	}
	fmt.Printf("valid=%d\n", validRows)
}
