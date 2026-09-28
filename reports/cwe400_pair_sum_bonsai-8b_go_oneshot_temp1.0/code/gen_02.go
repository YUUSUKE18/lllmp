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
	target := 0
	first := true
	pairs := 0
	remaining := 0
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			continue
		}
		if remaining > 0 {
			n := int64(line)
			if n <= target {
				remaining--
				if remaining == 0 {
					pairs++
				}
			}
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		n := int64(line)
		if n <= target {
			remaining++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
