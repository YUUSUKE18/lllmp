package main

import (
	"fmt"
	"strconv"
)

func main() {
	target, err := strconv.Atoi(strings.TrimSpace(strings.SplitN(readln(), " ", 2)[0]))
	if err != nil {
		fmt.Println("error reading target")
		return
	}

	var pairs int
	for _, line := range strings.Split(readln(), "\n") {
		num, err := strconv.Atoi(line)
		if err != nil || num == target {
			continue
		}
		for _, otherLine := range strings.Split(readln(), "\n") {
			otherNum, err := strconv.Atoi(otherLine)
			if err != nil || otherNum == target {
				continue
			}
			if num+otherNum == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}

func readln() string {
	var buf [4096]byte
	n, err := fmt.Scanln(buf[:])
	if err != nil {
		return ""
	}
	return string(buf[:n])
}
