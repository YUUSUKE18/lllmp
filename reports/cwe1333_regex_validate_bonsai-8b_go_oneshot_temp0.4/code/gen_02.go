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
		if sc.Err() {
			break
		}
		sc.Error("")
		line := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(line, "max=") {
			fmt.Println("max=", line[4:])
			continue
		}
		if strings.Count(line, ",") == 0 {
			fmt.Println("invalid")
			continue
		}
		parts := strings.Fields(line)
		if len(parts) < 2 {
			fmt.Println("invalid")
			continue
		}
		for _, p := range parts {
			if !strings.HasPrefix(p, "max=") {
				fmt.Println("invalid")
				continue
			}
			if len(p) < 5 {
				fmt.Println("invalid")
				continue
			}
			if err := strconv.Atoi(p[4:]); err != nil {
				fmt.Println("invalid")
				continue
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
