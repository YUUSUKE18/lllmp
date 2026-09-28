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
		if strings.HasPrefix(line, "invalid") {
			fmt.Println("invalid")
			return
		}
		parts := strings.Fields(line)
		if len(parts) < 1 {
			fmt.Println("invalid")
			return
		}
		for _, part := range parts {
			if strings.HasPrefix(part, "invalid") {
				fmt.Println("invalid")
				return
			}
			if len(part) == 0 {
				fmt.Println("invalid")
				return
			}
			if !strconv.IsDigit(part) {
				fmt.Println("invalid")
				return
			}
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
