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
	
	// 1行目から整数個数を読み込む
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値を整数個数としてパース
	numCountStr := strings.TrimSpace(sc.Text())
	numCount, err := strconv.Atoi(numCountStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上、1行目は整数と仮定されるが、安全策として）
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 2行目以降から整数を読み込む
	var actualCount int
	var sum int64
	
	// 2行目以降の行を読み込むためのバッファ
	lines := []string{}
	for sc.Scan() {
		lines = append(lines, sc.Text())
	}
	
	// 読み取れた行を処理する
	// 1行目は個数情報として既に処理済みなので、2行目以降を対象とする
	if len(lines) > 0 {
		// 1行目（個数情報）はスキップし、2行目以降を整数として試す
		for i := 1; i < len(lines); i++ {
			line := strings.TrimSpace(lines[i])
			if line == "" {
				continue // 空行は無視
			}
			
			n, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				// 整数として解釈できない行は無視
				continue
			}
			
			// 実際に読み取れた整数のみを対象とする
			actualCount++
			sum += int64(n)
		}
	}
	
	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
