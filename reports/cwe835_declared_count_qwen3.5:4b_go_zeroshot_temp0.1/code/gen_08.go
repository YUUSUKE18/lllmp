package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	var sum int64
	
	// 1 行目に整数の個数を読み取る
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	count, _ = strconv.Atoi(line) // 実際には読み取れた個数で計算するので、この値は参照用だが、仕様通り「実際に存在する整数の個数」を count に設定する必要がある。ただし、後続の処理で「実際に読み取れた整数だけ」を対象とするため、count は入力された値を使用し、sum と実際の個数を一致させる必要がある。
	// 修正：count は入力の値を使用するが、出力では「実際に読み取れた個数」を count に設定する。
	// しかし、仕様は「count=<実際に読み取れた個数> sum=<合計>」とある。
	// したがって、実際の処理で読み取れる整数の数をカウントし、それを count として出力する。
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// 空行は無視
		if line == "" || line == "\n" {
			continue
		}
		
		// 整数として解釈できない行も無視
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		sum += int64(val)
		count++
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
