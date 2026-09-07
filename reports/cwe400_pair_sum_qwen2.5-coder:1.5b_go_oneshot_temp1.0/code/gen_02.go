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
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		return
	}

	var pairs [0]struct{}
	for sc.Scan() {
		f := strings.Fields(sc.Text())
		if len(f) != 1 {
			continue
		}
		n, err := strconv.Atoi(f[0])
		if err != nil {
			continue
		}
		if n == target {
			pairs = append(pairs, struct{}{})
		}
	}

	if len(pairs) >= 2 {
		fmt.Printf("pairs=%d\n", len(pairs))
	} else {
		fmt.Println("pairs=0")
	}
}
