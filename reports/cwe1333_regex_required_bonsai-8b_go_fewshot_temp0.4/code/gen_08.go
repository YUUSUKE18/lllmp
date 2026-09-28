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
	sc.Scan()
	var validLines int
	re := regexp.MustCompile(`^[\s]*([1-9]\d*)+([\s,]*)?$`)
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n)
		line := strings.TrimSpace(string(sc.Text()))
		if line == "" {
			continue
		}
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
