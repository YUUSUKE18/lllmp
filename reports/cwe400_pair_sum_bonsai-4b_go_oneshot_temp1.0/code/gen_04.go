package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var pairs int

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for sc.Next() {
		text, err := sc.Text()
		if err != nil {
			continue
		}
		t := target
		if len(text) > 0 {
			if strings.Contains(text, " ") {
				text = text[0 : len(text)-1]
			}
			n, err := strconv.Atoi(text)
			if err != nil {
				continue
			}
			if n == target {
				if pairs == 0 {
					pairs++
				} else {
					pairs++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
