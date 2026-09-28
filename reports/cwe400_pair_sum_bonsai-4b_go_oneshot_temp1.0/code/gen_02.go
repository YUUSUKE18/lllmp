package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	first = true

	for {
		line := sc.Scan()
		if line == "" {
			if first {
				first = false
			}
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first {
			first = false
		}
		numbers = append(numbers, val)
		if len(numbers) >= 2 {
			found := false
			for i := 0; i < len(numbers); i++ {
				for j := i + 1; j < len(numbers); j++ {
					if numbers[i]+numbers[j] == sc.Text()[0] {
						found = true
						break
					}
				}
				if found {
					break
				}
			}
			if !found {
				break
			}
		}
	}

	// 値を7桁の整数として読み、目標値をTargetとし、2値の組をカウント
	// 2値の組が存在するなら、それは2値のみが数えること。ただし、1値＋目標値の組が含まれているなら、その2値の組を含めても、数をカウントする。
	// 記述は"2値の組"の意味で、2個の異なる数が対象の値を加算して得ること。
	// 例: 目標値 = 5 → 2値の組: (1,4)、(2,3)など
	// 無意な行も空行も無視。
	
	// 1行目: エラー
	// 2行目以降: 1値を1回、2値を1回
	// これはすべての目標値を加算して得た2値の組をカウントする
	// しかし、問題は「2値の組」というのは、2値の組を指すが、実際には目標値を加算して得た2値の組。

	// まず、目標値を読み取
	val, err := strconv.Atoi(sc.Text()[0])
	if err != nil {
		return
	}
	
	// 値を追加し、すべての入力を整数として処理
	// そして、目標値を加算して得た2値の組の数をカウント
	// ギター内に1行のみ出力。

	// 1行目に目標値を読み
	// 2行目以降は1値ごとに追加
	// 無意な行も空行も無視

	sc.Scan()
	var numbers []int
	for i := 0; i < sc.Text().Len(); i++ {
		line := ""
		if i > 0 {
			line = sc.Text()[0:i]
		}
		if i < sc.Text().Len()-1 {
			// 入力は1値ごとに取得
			// 1行目: 記述に該当する値を読む
			// それ以降: 整数を読み取
			if i == 0 {
				val := sc.Text()[0] // 1値
				sc.Text = sc.Text()[1:]
			} else {
				// 2行目以降の1値
				line := ""
				for j := 0; j < i-j; j++ {
					line = sc.Text()[j:i-j]
				}
				if i > 0 && i > 1 {
					line = ""
					for j := 0; j < i-j; j++ {
						line = sc.Text()[j:i-j]
					}
				}
			}
			if i > 1 {
				val = strconv.Atoi(line)
			} else {
				val = 0
			}
		}
		// すべての値を積計
		if i == 0 {
			// 1値のみ
			val = sc.Text()[0]
		} else {
			// 2値の1値
			line := ""
			// 2行目以降は1値
			for j := 0; j < i-j; j++ {
				line = sc.Text()[j:i-j]
			}
			val = strconv.Atoi(line)
		}
		if line == "" {
			sc.Text = sc.Text()[i:]
			continue
		}
		numbers = append(numbers, val)
	}
	// 2値の組を検索する
	// 目標値を加算する
	count := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == val {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
