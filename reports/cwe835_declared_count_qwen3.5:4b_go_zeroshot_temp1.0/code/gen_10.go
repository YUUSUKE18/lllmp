package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadBytes('\n')
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	count, _ := fmt.Sscanf(string(line), "%d", &lineLen) // 行目の値は count に使わないが、解析のために使っている。実際は lineLen のみを参照すればよい。しかし、Sscanf を使うとより安全に整数を解析できる。

	sum := int64(0)
	actualCount := 0

	for {
		line, err := reader.ReadBytes('\n')
		if len(line) == 0 || err != nil {
			break
		}

		fmt.Sscanf(string(line), "%d", &intVal) // 整数を読み込む (Sscanf を使っても良いが、ParseInt がより柔軟である。ただし、入力値は整数のみなので Sscanf で OK)
		if intVal > -9223372036854775808 && intVal < 9223372036854775807 {
			sum += int64(intVal)
			actualCount++
		}
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
