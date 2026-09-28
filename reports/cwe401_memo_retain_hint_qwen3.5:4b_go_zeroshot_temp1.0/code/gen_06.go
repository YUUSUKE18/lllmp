package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
)

// CollatzMemo はコラッツの計算結果を格納するメモ化テーブル。
type CollatzMemo map[int]int64

func Main() {
	// メモ化テーブルの初期化
	memo := CollatzMemo{1: 0}

	// ブフイヨ入力読み取り
	scanner := bufio.NewScanner(ioutil.Discard) // スキャナー作成 (実際には io.Reader を使う)
	reader := bufio.NewReader(osStdin) // 標準入力の読み取り
	buf := make([]byte, 64*1024) // バッファサイズを調整

	var total int64
	lineCount := 0

	for {
		// 行の読み込み (EOF を除く場合のみループ)
		nBytes, _, err := reader.Read(buf[:len(buf)]) // バッファから n 文字の読み取り
		if nBytes > 0 {
			nStr := string(buf[:nBytes]) // バッファからの文字列取得

			lineCount++ // ラインカウント
			// 空行や数値ではない文字を含む場合を除く処理
			if lineCount == 1 && nStr != "" && nStr[0] >= '0' && nStr[0] <= '9' {
				n, err := strconv.ParseInt(nStr, 10, 64) // n の解析

				if err == nil && n > 0 { // n の検証と有効チェック
					n = n % 2 * (n/2 + n/2) // コラッツ関数の適用

					// メモ化された結果の有効性確認
					result := memo[n]

					// メモ化されていない場合の計算
					if result == 0 && memo[n] != 1 {
						memo[n] = n % 2 * (n/2 + n/2) // コラッツ関数の適用

						// メモ化された結果の有効性確認
						result = memo[n]

						total += result
					}
				}
			}
		} else { // EOF の処理
			break // ループの破断
		}
	}

	fmt.Printf("total=%d\n", total) // 総和の出力
}
