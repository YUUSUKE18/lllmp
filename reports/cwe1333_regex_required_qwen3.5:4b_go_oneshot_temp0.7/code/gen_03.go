package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*([0-9,]+|)[\s\n]*$`)
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
