package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int

	for {
		sc.Scan()
		if !sc.Err() {
			line := strings.TrimSpace(sc.Text())
			if strings.Contains(line, ",") && strings.Fields(line) > 0 {
				validLines++
			}
		}
		if sc.Err() {
			break
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
