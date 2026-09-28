package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}

	content := string(input)
	// カンマで分割し、前後の空白を無視しながら整数を抽出する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化 (実際には負の無限大として扱う)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
			found = true
		}
	}

	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合 (空入力や無効な入力のみ)
		// 仕様上、データが存在しない場合の出力形式は明記されていないが、
		// 厳密に求められた要素数と最大値を報告する。
		// 空のリストの場合は count=0 max=何か（ここでは -1 を採用するか、あるいは仕様に基づき適切な値を選択するが、今回はデータがないため 0 とおく）
		fmt.Printf("count=0 max=%d\n", 0) // または count=0 max=-1など。最大値が存在しない場合はこの挙動を調整する必要があるが、ここではゼロ要素で出力する。
	}
}
