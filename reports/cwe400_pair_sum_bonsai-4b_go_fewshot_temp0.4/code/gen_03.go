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
	lines := 0
	pairs := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		chars := 0
		// 空行や非数字行は無視
		for i := 0; i < n; i++ {
			if i == 0 {
				// 第1行は目標値のみ
				if _, err := strconv.Atoi(sc.Text()[0:i]); err == nil {
					// 值が解析できるなら更新
					max := 0
					if _, err := strconv.Atoi(sc.Text()[i]); err == nil {
						max = int(sc.Text()[i])
					}
				} else {
					// 空行は無視
					// 整数解析できない行は無視
					continue
				}
				// 1行に1値のみ
				// 2行以降は整数
				// 2値の組が目標値に達する場合、計数
				// 1値の行はそのまま処理
			}
			chars++
			if buf[i] == '\n' {
				// 1行：目標値
				// 2行以降：整数
				if lines == 0 {
					// 1行目：目標値
					if _, err := strconv.Atoi(sc.Text()[i]); err == nil {
						max = int(sc.Text()[i])
					}
				} else {
					// 2行以降：整数
					if _, err := strconv.Atoi(sc.Text()[i]); err == nil {
						// 値を取得
						n1 := int(sc.Text()[i])
						// 2値の組を検索
						if pairs < 0 {
							// 2値の組がない場合は最初の値
							pairs = 0
							// 2値の組がないなら、1値も含む
							// 2値の組が達した時点で停止
							if n1 > max {
								// 目標値を達したなら停止
								if pairs == 0 {
									// 2値の組が達した場合、停止
									pairs = 0
									// 最後に出力
									fmt.Printf("pairs=%d\n", pairs)
									break
								}
							// 2値の組が達した場合、停止
							if pairs > 0 {
								// 2値の組が達した場合、停止
								pairs = 0
								break
							}
							// 值が最大値を超える場合は、2値の組が増加
							if n1 > max {
								// 值が最大値を超えるなら、2値の組が増加
								pairs++
							}
							// 2値の組が達した場合、停止
							if pairs > 0 {
								break
							}
						}
					}
				}
				if lines > 0 {
					// 2値の組を検索
					// 2値の組は2値の値が最大値に達する場合に増加
					// 目標値が達された場合、停止
					if pairs > 0 {
						// 值が最大値に達した場合に停止
						if n1 == max {
							pairs = 0
							break
						}
					}
				}
			}
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
