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
	var validLines = 0
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^\d+(?:,\d+)*$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
