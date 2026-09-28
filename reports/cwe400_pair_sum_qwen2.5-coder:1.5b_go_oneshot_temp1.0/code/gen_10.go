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
	sc.Scan()
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		target += n
	}
	if target < 2 {
		fmt.Printf("pairs=0\n")
		return
	}
	count := 0
	for i := 0; i < len(sc.Text())-1; i++ {
		for j := i + 1; j < len(sc.Text()); j++ {
			if target == sc.Text()[i]+" "+sc.Text()[j] {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
