package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var r *regexp.Regexp
	r = regexp.MustCompile(`^\s*[\d,]+(\s*,\s*)*$`)

	lines := 0
	for sc.Scan() {
		line := sc.Text()
		if r.MatchString(line) {
			lines++
		}
	}
	fmt.Printf("valid=%d\n", lines)
}
