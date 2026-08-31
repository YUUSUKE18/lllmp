package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	fmt.Fprintln(reader, "7:3,2:2")
}
