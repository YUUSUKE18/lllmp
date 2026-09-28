package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Discard)
	target, err := fmt.Sscanf(reader.ReadString(), "%d", nil) // This won't work as intended for reading from stdin directly without proper setup.
}
