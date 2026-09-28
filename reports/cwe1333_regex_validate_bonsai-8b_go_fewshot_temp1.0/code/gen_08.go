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
		if strings.TrimSpace(buf[:n]) != "" {
			words := strings.Fields(buf[:n])
			if len(words) > 0 {
				valid++
			}
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
