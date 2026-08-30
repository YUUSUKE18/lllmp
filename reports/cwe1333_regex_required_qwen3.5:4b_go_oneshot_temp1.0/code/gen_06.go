package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	var r *regexp.Regexp
	r = regexp.MustCompile(`^\s*[0-9]+(\s*,\s*[0-9]+)*?\s*$`)
	validCount := 0
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if r.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
