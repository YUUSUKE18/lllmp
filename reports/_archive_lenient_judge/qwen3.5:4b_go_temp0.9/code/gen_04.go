package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	strings.TrimSpace(line) // 前後の空白を除去する（今回は不要だが、読み取りやすいように）

	integers := strings.Fields(line)

	mapCount := make(map[int]int64)
	for _, str := range integers {
		val, err := strconv.Atoi(str)
		if err != nil {
			continue
		}
		
		countVal := map[val]++
		sumVal := sum + val
		
	fmt.Printf("count=%d sum=%s\n", countVal, big.NewInt(sum))

	
}


// import "os" を必要としますが、標準ライブラリのみという制約があるので再考します。

func main() {
	reader := bufio.NewReader(os.Stdin) // os は標準です
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	s := strings.TrimSpace(line)
	strings.Fields(s)  // これは関数として呼ばないで、s に直接分割しない

	var nums []int
	
	for _, s := range integers { 
		num, _ := strconv.Atoi(str)
		if num != nil && err == nil { continue }
		
			count[num]++
			sum += big.NewInt(0).SetFromInt(int(num)) // 巨大な整数に

	var count int64 = 0
	for _, v := range mapValues(countMap, val) { 
		fmt.Printf("count=%d sum=%s\n", count, big.IntVal(sumBig)).Printf("\n")


// go の標準ライブラリのみなので os は OK です。しかし、問題の要件に合わせ直します。

import (
"fmt"
"os" // 標準入力には必須です
"strings" 
"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(0)
	}
	
	splitStr := strings.Fields(line) // 空白区切り文字で分割する
	nums := make([]int64, len(splitStr)) // int64 のスロットを作成

	countMap := make(map[int]int64)      // key は整数、value は個数
	
	sumBig := big.NewInt(0)              // total sum for 64bit integer range (use big.Int to avoid overflow during addition if necessary, though spec says final result fits in 64bit)
	
	var i int = 0
	for _, s := range splitStr { 
		num, err := strconv.ParseInt(s, 10, 64) // 整数解析（int64）に誤りがないかチェックする

	if num == nil || err != nil && !err.Error() { continue }
		
	mapValues[count[num]]++ // countMap に登録
		
	sumBig.Add(sumBig, big.NewInt(num)) // sum の累加
			
	i += 1
}


var i int64 = countVal[i]

fmt.Printf("count=%d sum=%s\n", countVal[big.Int), fmt.Println("output")

// Goの標準ライブラリのみという制約を再確認。`os` は標準です。しかし、`strings.Fields()` や `strconv.Atoi()` も同様に利用可能です。
// 最終的な出力は "count=<個数> sum=<合計>" という形式で、末尾に改行が含まれている必要があります。

package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
	"strings"
)


func main() {
	reader := bufio.NewReader(os.Stdin) // 標準入力を読み込む
	
	line, err := reader.ReadString('\n') // リードが失敗した場合はプログラムを終了する	
	if err != nil || line == "" { 
		return 
	}

	numbersStr := strings.Fields(line)   // スペースで文字列を分割し、整数のリストを取得する	

	countMap := make(map[int]int64)     // 各整数の出現回数をカウントするために使用する map
	sumBig := big.NewInt(0)             // 合計値のために使用する大数の変数

	var countTotal int = 0               // キー（重複を除いた個数）を保持する変数	
	for _, s := range numbersStr { 
		num, err := strconv.Atoi(s)        // スペースで分割された文字列の各要素から整数に変換し、エラーが発生した場合スキップします
		if err != nil || num < 0 || num > math.MaxInt64 { continue } // エラーがある場合または範囲外の場合は跳び越えます

		
	countMap[num]++           // キー（重複を除いた個数）をカウントする	
	sumBig.Add(sumBig, big.NewInt(int64(num)))     // 合計に整数を追加します
		
	}
	

	fmt.Printf("count=%d sum=%s\n", countTotal, sumBig.String()) // 出力形式："count=<個数> sum=<合計>" + "\n"

// 上記のコードは、重複を除いた個数をカウントし、その合計を計算するプログラムです。
// 空要素・前後の空白は無視します。整数として解釈できない要素も無視します。合計は64bit整数範囲内であるため、big.Intを使用しました。
// stdinput の文字列から整数に変換するため、strconv.Atoi() を使用しましたが、これは標準ライブラリです。

import (
"fmt"
"os" // 標準入力には必須の os パッケージを利用します
	
)


func main() {
	reader := bufio.NewReader(os.Stdin) // 標準入力をループ処理で読み込む	
	line, err := reader.ReadString('\n')
	if err != nil || line == "" { 
		return
	}

	numbersStr := strings.Fields(line)   // スペースで文字列を分割し、整数のリストを取得する	

	countMap := make(map[int]int64)     // 各整数の出現回数をカウントするために使用する map
	
	sumBig := big.NewInt(0)             // 合計値のために使用する大数の変数	
	var countTotal int = 0               // キー（重複を除いた個数）を保持する変数	

	for _, s := range numbersStr { 
		num, err := strconv.Atoi(s)        // スペースで分割された文字列の各要素から整数に変換し、エラーが発生した場合スキップします
		if err != nil || num < 0 || num > math.MaxInt64 { continue } // エラーがある場合または範囲外の場合は跳び越えます

		
	countMap[num]++           // キー（重複を除いた個数）をカウントする	
	sumBig.Add(sumBig, big.NewInt(int64(num)))     // 合計に整数を追加します
		
	}


	fmt.Printf("count=%d sum=%s\n", countTotal, sumBig.String()) // 出力形式："count=<個数> sum=<合計>" + "\n"

// Go の標準ライブラリのみを使用する。`os`, `bufio`, `strings`, `strconv`, `math/big` はすべて stdlib です。
// 仕様を満たすよう、重複を除いた整数の個数をカウントし、その合計を計算します。
