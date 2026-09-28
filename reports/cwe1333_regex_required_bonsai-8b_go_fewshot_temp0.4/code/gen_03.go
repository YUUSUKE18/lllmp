package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		sc.Shunt(buf)
		line := strings.TrimSpace(buf[:n])
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
