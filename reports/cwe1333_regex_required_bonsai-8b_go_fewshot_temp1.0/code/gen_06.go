package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n)
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^([0-9]+(?:,[0-9]+)+)$`)
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}
