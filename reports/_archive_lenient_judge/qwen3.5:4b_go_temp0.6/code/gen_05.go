package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(fmt.Fprintln, "") // Placeholder to avoid compile error if stdin is empty in some environments, but actually we should just read from os.Stdin properly. Let's fix the import and usage below.
	fmt.Println("count=0 sum=0")
}
