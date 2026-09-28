```go
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
	lines := 0
	chars := 0
	goal := 0
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		chars += n
		if strings.HasWhitespace(buf[0]) {
			continue
		}
		if strings.HasPrefix(buf[0], "0x") || strings.HasPrefix(buf[0], "0X") {
			// 0x0123 などは、16进制
			// 0x01234567 などは、32进制
			// 0x0123456789 などは、64進制
			// 0x0123456789ab などは、64進制
			// 0x0123456789abcd などは、64進制
			// 0x0123456789abcd1234 などは、64進制
			// 0x0123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd1234 などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
			// 0x0123456789abcd123456789abcd123456789abcd などは、64進制
