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
		// 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上は1行目が整数と仮定されるが、堅牢性のために）
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 2行目以降から整数を読み込む
	var actualCount int
	var sum int64 = 0
	
	// 2行目以降の行を読み込むための準備
	// 1行目は既に読み込んだので、残りの行を処理する
	for i := 1; i < numCount; i++ {
		if !sc.Scan() {
			// 読み取りエラーまたはEOF
			break
		}
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は無視
			continue
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数のみを対象とする
		sum += int64(n)
		actualCount++
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
