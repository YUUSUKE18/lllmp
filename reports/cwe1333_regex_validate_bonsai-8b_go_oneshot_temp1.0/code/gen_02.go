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
	var validLines = 0
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(line, "max=") {
			fmt.Println("valid=0")
			return
		}
		if strings.Contains(line, ",") {
			parts := strings.Split(line, ",")
			if len(parts) >= 2 {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
