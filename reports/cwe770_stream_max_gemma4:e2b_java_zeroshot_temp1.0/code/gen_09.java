import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割
        String[] parts = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundFirst = false;

        for (String part : parts) {
            // 前後の空白を無視
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                
                // 要素数（最初の要素）と最大値（それ以降の要素）を決定するロジックを実装する。
                // 仕様が「カンマ区切りの整数列を受け取ります。それらの『要素数』と『最大値』を求めます。」とあるため、
                // この入力列自体から要素数と最大値を導出する必要がある。

                if (!foundFirst) {
                    // 最初の数値を要素数として扱うか、あるいはそのまま要素として扱うか不明瞭だが、
                    // 通常、データ列が与えられた場合、その個数と最大値を求める。
                    // ここでは「要素数」は入力された数値の総数とし、「最大値」はその中の最大値とするのが最も自然。
                    count = 1; // 最初の要素をカウントとして扱う（あるいは、全体の要素数を数える）
                    maxValue = value;
                    foundFirst = true;
                } else {
                    // 2番目以降の要素を処理する
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }
        
        // 仕様の再解釈: 「それらの『要素数』と『最大値』を求めます。」
        // 入力されたカンマ区切りの数値列全体から、「要素数」と「最大値」を求める。

        // 最初の解釈（最も一般的なもの）：入力された全ての有効な整数がデータであるとみなし、その総数と最大値を求める。
        
        long finalCount = 0;
        long finalMaxValue = Long.MIN_VALUE;
        
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                finalCount++;
                if (value > finalMaxValue) {
                    finalMaxValue = value;
                }
            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }


        // 最終結果の出力
        System.out.println("count=" + finalCount + " max=" + finalMaxValue);
    }
}
