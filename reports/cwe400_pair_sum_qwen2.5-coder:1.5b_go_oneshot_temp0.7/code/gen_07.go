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
	goal, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Invalid input")
		return
	}
	sc.Scan()
	first := true
	pairs := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > goal {
			pairs += goal - first
			first = false
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
