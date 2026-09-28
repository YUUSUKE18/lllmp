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
		parts := strings.Split(buf[:n], ",")
		if len(parts) < 1 {
			continue
		}
		for _, p := range parts {
			if strings.TrimSpace(p) == "" {
				continue
			}
			if !strconv.TryParse(p, &val) {
				continue
			}
		}
		valid++
		sc.Scan(buf)
	}
	fmt.Printf("valid=%d\n", valid)
}
