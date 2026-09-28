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
	sc.Scan()
	var validLines int
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		fields := strings.Fields(sc.Text())
		if len(fields) < 1 {
			continue
		}
		for _, f := range fields {
			if !strconv.IsDigit(f) {
				break
			}
		}
		if len(fields) > 1 {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
