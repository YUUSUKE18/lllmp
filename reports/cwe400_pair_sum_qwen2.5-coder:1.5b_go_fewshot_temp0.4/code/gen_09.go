package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	target, err := strconv.Atoi(r.ReadString('\n'))
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}
	var pairs int
	for {
		n, err := r.Read(buf)
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
		}
		if err != nil {
			break
		}
		num, err := strconv.Atoi(string(buf[:i]))
		if err != nil {
			continue
		}
		if num == target {
			continue
		}
		for j := i + 1; j < n; j++ {
			if buf[j] == '\n' {
				break
			}
		}
		if err != nil {
			break
		}
		num2, err := strconv.Atoi(string(buf[i+1:j]))
		if err != nil {
			continue
		}
		if num+num2 == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
