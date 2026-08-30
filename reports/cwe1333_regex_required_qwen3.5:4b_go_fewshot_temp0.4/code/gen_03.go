package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*[\d,]+(\s*,\s*)*$`)
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0
	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
