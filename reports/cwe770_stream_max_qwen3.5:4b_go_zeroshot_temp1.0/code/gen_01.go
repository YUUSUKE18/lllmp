package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {	reader := bufio.NewScanner(os.Stdin)
	var elements []int64

	for reader.Scan() {
		line := reader.Text()
		if line == "" || string(line[0]) != ',' && len(string(line)) == 1 { //カンマ区切りとして処理:改行も空白も無視する(Scannerで文字単位ではなく行単位なので、各文字が整数か確認) -> コレクターとしてのみ使用。実際は各行を解析して要素抽出
			continue 
		}

		// カンマ区切りのリストに対して 1 リネーム処理を行う必要があるため:
		// システムの仕様：標準入力から、カンマ区切りの整数列を受け取ります。これは一行で受け取るか複数行で受け付けるかの判断が必要です。通常は「要素を区切る文字」が重要となるため各文字ごとに取得します。(Scannerでは改行などで分割される)
		// より正確な実装: 入力を読み取り、その中でカンマや空白ではなく整数であることを検出。

		for _, char := range line {
			switch string(char) {
			case "\n", " ":
				continue
			default: 
				val, err := strconv.ParseInt(string(char), 10, 64) // 各文字は単独の数字とみなす? No. コレクターとしてのみ使用。正確には、各行を分割し、カンマで区切った部分を整数に解析する。

			// 実際の実装:
			nums := []int{0} 
			
				val, err := strconv.ParseInt(string(char), 10, 64) // 文字列に変換して整数化。これらは各数字のみを処理するので、複数の数字が同じ行に含まれていないと仮定する必要がある。(例: "3" が一つだけ)

	}
	
	fmt.Print("count=", len(elements)) // コレクターとしてのみ使用。実際は配列の長さが必要。

	// 正確な実装:
	count, max := countMaxElements(reader.Text()) 
	if reader.Len() > 0 {
		max = elements[0]
	for i := range elements[i:]{
			nums := []int64{} // カンマ区切り整数を解析。

				vals := string(num)
						var lastErr error
			
				count += len(vals[:i+1]) // 各要素の数値数をカウント
		
			} else {
				fmt.Printf("count=%d max=%v\n", count, elements[0] ) // コレクターとしてのみ使用。実際は配列の長さが必要。

	return fmt.Println() 
}

func main2(inputData) []int64{
	var nums = []int{}
	for i := 0; i < len(slices); i++ {
		val, err := strconv.Atoi(strconv.Int(i)) // カンマ区切り整数を解析。

	return nums }
// Go の配列の要素数をカウント、最大値を取得する関数を実装する必要があります。(スキャンされたデータを使用)
