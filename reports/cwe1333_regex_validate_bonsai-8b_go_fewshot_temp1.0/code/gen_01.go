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
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		parts := strings.Fields(buf[:n])
		if len(parts) == 0 {
			continue
		}
		for _, p := range parts {
			if strings.TrimSpace(p) == "" {
				continue
			}
			if _, err := strconv.Atoi(p); err == nil {
				valid++
				break
			}
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
