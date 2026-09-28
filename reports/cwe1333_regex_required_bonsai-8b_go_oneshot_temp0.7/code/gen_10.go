package main

import (
	"regexp"
	"strconv"
	"strings"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	for strings.Fields(sc.Text()) {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+))*$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
