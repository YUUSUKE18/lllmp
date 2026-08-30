package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0
	re := regexp.MustCompile(`^(\d+(,\s*\d+)*)?$`)

	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
