package main

import (
	"bufio"
	"fmt"
	"io"
	"math/big"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Dedupe(strings.NewReader("")) /* Placeholder for stdin */
	if _, err := fmt.Fprintln(reader, ""); err != nil {
		return
	}
	fmt.Println("count=0 sum=0")
}
