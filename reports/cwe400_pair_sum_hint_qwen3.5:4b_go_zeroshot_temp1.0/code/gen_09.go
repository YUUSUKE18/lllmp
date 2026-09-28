package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil)
	var zero int64 = 0
	sumOfTarget, ok := new(big.Int).String(reader.ReadString('\n'))
	if !ok || sumOfTarget == "" {
		fmt.Println("pairs=0\n")
		return
	}

	targetBigInt := big.NewInt(0)
	targetBigInt.SetString(sumOfTarget, 10)
	targetValue := targetBigInt.Sign() * int64(targetBigInt.Abs().Div(big.NewInt(1)).Big()) // Fix for negative numbers logic

	fmt.Println("pairs=" + string(targetBigInt))
}
