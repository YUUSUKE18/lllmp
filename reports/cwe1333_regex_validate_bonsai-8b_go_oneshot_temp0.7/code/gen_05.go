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
			text := strings.Fields(sc.Text())
			if len(text) > 0 {
				n, err := strconv.Atoi(text[0])
				if err != nil {
					continue
				}
				validLines++
			}
		}
		if validLines == 0 {
			fmt.Println("valid=0")
			return
		}
		fmt.Printf("valid=%d\n", validLines)
	}
}
