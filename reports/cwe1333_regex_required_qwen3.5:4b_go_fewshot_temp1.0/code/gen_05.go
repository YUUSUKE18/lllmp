package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	validLines := 0
	re := regexp.MustCompile(`^([0-9]+(,[0-9]+)*)?$`)

	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
