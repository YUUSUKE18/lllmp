package main

import (
	"bufio"
	"fmt"
	"os"
	regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		reg := regexp.MustCompile(`^(?:\d+,\d+)*$`)
		if reg.MatchString(strings.TrimSpace(buf[:n])) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
