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
	var validLines = 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		sc.Shutdown()
		if n == 0 {
			break
		}
		line := strings.TrimSpace(buf[:n])
		if line == "" {
			continue
		}
		// Kanma-iri no tenshi-ryu no kaiji (1+ digit sequence separated by commas)
		re := regexp.MustCompile(`^(?:[^,]+|(?P<seq>[0-9]+)(?:[,]+[0-9]+)*$)`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
