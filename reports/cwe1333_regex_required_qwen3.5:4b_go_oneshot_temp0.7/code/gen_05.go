package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	re := regexp.MustCompile(`^\s*[\d\s,]+(,)?\s*$`)
	validCount := 0

	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
