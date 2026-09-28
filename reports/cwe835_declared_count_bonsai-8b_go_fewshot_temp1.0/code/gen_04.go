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
	var count, sum int
	// Read the number of integers from the first line
	n, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}
	// Skip the first line
	sc.Skip()
	// Read the rest of the lines
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			// If we can't read an integer, break
			break
		}
		count++
		sum += n
		// Skip the line
		sc.Skip()
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
