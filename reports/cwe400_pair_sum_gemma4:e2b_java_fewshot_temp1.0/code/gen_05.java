import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        long count = 0;
        long lastNumber = -1; // 2つ前の数値を保持する変数
        long currentNumber;

        // 2行目以降の整数を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                currentNumber = Long.parseLong(trimmedLine);
                
                // 2つの値の組を数える
                // currentNumber と lastNumber の差が target になるかチェックする
                // 2個の組 (i, j) で i != j かつ i + j = target となるペアを数える
                // ここでは、読み込んだ数と、それ以前に読み込んだ数との和が目標値になるペアを数える、と解釈する。
                // もし「2個の組 (位置が異なる 2 個) の個数」が、読み込んだ数列の中から i + j = target となるペアの数を意味するならば、
                // 読み込んだ数と、それ以前のすべての数との和をチェックする必要があります。

                // 問題文の解釈を「読み込んだ数列の中から、異なる2つの要素の和が目標値になるペアの数」とします。
                // もし「読み込んだ数の中から、2つの数が足して目標値になるペア」を数えるのであれば、
                // 読み込んだすべての数を保持する必要があります。

                // 読み込んだすべての数と、それ以前のすべての数のペアを数えるアプローチを採用します。
                
                // 読み込んだ数 (currentNumber) と、それ以前の数 (i) のペアで i + currentNumber = target を探す
                // または、読み込んだ数 (currentNumber) と、それ以前の数 (j) のペアで currentNumber + j = target を探す。
                
                // 累積和やハッシュマップを使わず、純粋に順番に見ていく場合、
                // 読み込んだ数と、それ以前に読み込んだ数との和が目標値になるペアを数えるのが自然です。
                
                for (long prev = 0; prev <= lastNumber; prev++) {
                    if (prev + currentNumber == target) {
                        count++;
                    }
                }

                // 次のループのために currentNumber を lastNumber として更新
                lastNumber = currentNumber;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視 (仕様通り)
            }
        }

        System.out.println("pairs=" + count);
    }
}
