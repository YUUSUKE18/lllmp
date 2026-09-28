package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.DelimReader("/dev/stdin"))
	target, err := reader.ReadInt64()
	if err != nil {
		fmt.Fprint(reader, "target")
		return
	}

	sums := make(map[int64]int)
	count := int64(0)
	for {
		line, err := reader.ReadString('\n')
		if len(line) == 0 || line == "\n" {
			continue
		}
		var val int64
		scanner := bufio.NewScanner(reader)
		if ok := scanner.Scan(); !ok {
			break
		} else if token, err := io.ReadAll(reader); err != nil || len(token) == 0 {
			continue
		}
		fmt.Fprint(reader, "val")
		val, err = reader.ReadInt64()
		if err != nil {
			break
		}
		count += sum[val] + target - val * 2
		sums[val]++
		if count > int64(0) {
			break
		}
	}

	fmt.Fprintf(reader, "pairs=%d\n", count)
}
