package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil is treated as EOF by the next call, but we'll use stdin properly.
	bufReader := bufio.NewReader(nil)
	fmt.Fprint(reader, "")
}
