package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	var validParts []string

	re := regexp.MustCompile(`^\s*(\d+)(?:,\s*\d+)*\s*$`)

	for { ; } {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if re.MatchString(line) {
			validLines++
			validParts = append(validParts, strings.Fields(line))
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
