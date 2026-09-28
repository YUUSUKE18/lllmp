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
	sc.Scan()
	for {
		sc.Scan()
		if !sc.Err() {
			sc.Text()
			line := strings.TrimSpace(sc.Text())
			if len(line) == 0 {
				continue
			}
			fields := strings.Fields(line)
			if len(fields) < 1 {
				continue
			}
			for _, f := range fields {
				if !strings.Contains(f, "0") && !strings.Contains(f, "1") && !strings.Contains(f, "2") && !strings.Contains(f, "3") && !strings.Contains(f, "4") && !strings.Contains(f, "5") && !strings.Contains(f, "6") && !strings.Contains(f, "7") && !strings.Contains(f, "8") && !strings.Contains(f, "9") {
					continue
				}
			}
			validLines++
		}
		if sc.Err() {
			break
		}
		fmt.Printf("valid=%d\n", validLines)
	}
}
