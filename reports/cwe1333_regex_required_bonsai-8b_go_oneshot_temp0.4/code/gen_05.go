package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if !regexp.MatchString(`^(\d+)(?:,\d+)*$`, line) {
			continue
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
