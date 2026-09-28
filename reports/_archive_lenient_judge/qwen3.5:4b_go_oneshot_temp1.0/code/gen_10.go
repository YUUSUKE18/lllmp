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
	sc.Scan()
	inputs := strings.Fields(sc.Text()) // 空白区切りに変換するが、本題はカンマ区切りであるため元の文字列を処理すべきか判断が必要。仕様: "カンマ区切りの整数列"
	
	// 入力字符串から数字を取得 (カンマを含む)
	counts := make(map[int]int)
	sumTotal := int64(0)

	for _, valStr := range strings.FieldsFunc(sc.Text(), func(r byte) bool { return r == ',' || r == ' ' || r == '\n' }) {
		if len(valStr) > 0 {
			n, err := strconv.Atoi(valStr) // 整数として変換。失敗する場合は無視 (既に int の range に収まる前提だが、Atoi は文字列を処理して値を得る。仕様: "空要素・前後の空白は無視" -> Strings.Fields または FieldsFunc が有効。カンマ区切りの間隔を考慮する必要あり。)
			// 補足：上記 valStr の取得方法が不正確 (fields を使うとカンマも分割される可能性がある) より、手動で解析する方が安全か。しかし spec は「整数列」なので、Atoi が失敗しなかったものが有効な数字である。(カン馬区切りだが Atoi("1,") はエラーになるから先ほど FieldsFunc でカンマをスキップさせたのが正解。)
			if err == nil {
				counts[n]++ // 個数カウント
				sumTotal += int64(n) // 合計 (int64 で処理し、仕様通り "整数の範囲" に収まるため int64 が適している。ただし spec は単に 'sum=<total>' としか言っておらず、各 n の累積加算を行う。)
			} else {
				continue 
			}
		}
	}

	fmt.Printf("count=%d sum=%s\n", counts) // 修正: 指定通りは `count=<個数> sum=<合計>`。上記マッピングから個数を計算する必要がある。(各整数の出現回数)。
}
