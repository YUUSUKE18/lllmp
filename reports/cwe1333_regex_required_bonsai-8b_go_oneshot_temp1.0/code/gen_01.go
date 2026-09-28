package main

import (
	"regexp"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if !sc.HasPrevious {
			continue
		}
		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(line) {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
