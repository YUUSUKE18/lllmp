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
		fmt.Println("invalid target value")
		return
	}
	pairs := 0
	for sc.Scan() {
		f := sc.Text()
		if strings.TrimSpace(f) == "" {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		pairs += target - n
	}
	fmt.Printf("pairs=%d\n", pairs)
}
