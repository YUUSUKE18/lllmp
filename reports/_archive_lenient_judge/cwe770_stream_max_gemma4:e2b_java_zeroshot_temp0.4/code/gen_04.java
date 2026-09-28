import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視して整数として解釈できるか試みる
            try {
                // トークンから前後の空白を除去（splitで区切られたものなので、ここでは直接Long.parseLongを試す）
                long value = Long.parseLong(token.trim());
                
                // 64bit整数の範囲内であるという制約は、Long型を使うことで満たされる。
                
                if (!foundNumber) {
                    // 最初の要素をカウントとして扱う（仕様の解釈：カンマ区切りの列全体から数える）
                    count = value;
                    maxValue = value;
                    foundNumber = true;
                } else {
                    // カウントと最大値を更新
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 注意: 仕様の「要素数」と「最大値」の定義について、
        // 「カンマ区切りの整数列を受け取ります。それらの『要素数』と『最大値』を求めます。」
        // これは通常、与えられた数列の要素の総数と最大値を意味します。
        // 上記の実装では、最初の有効な数を「count」とし、残りの要素を処理して「maxValue」を求めるという解釈を採用しました。
        // もし「要素数」がトークンの総数（フィルタリング後）を意味するなら、ロジックを変更する必要があります。

        // 再度仕様を厳密に解釈し直します：
        // 1. カンマ区切りの整数列を受け取る。
        // 2. それらの『要素数』と『最大値』を求める。
        // これは、与えられたリストの長さと最大値を意味すると考えるのが最も自然です。

        long finalCount = 0;
        long finalMaxValue = Long.MIN_VALUE;
        int validCount = 0;

        for (String token : tokens) {
            try {
                long value = Long.parseLong(token.trim());
                finalCount++;
                if (value > finalMaxValue) {
                    finalMaxValue = value;
                }
            } catch (NumberFormatException e) {
                // 無効な要素は無視
            }
        }

        // 空の入力や、有効な整数が一つもなかった場合の処理（ここでは最小値として初期化されたままになる）
        if (finalCount == 0) {
             // 入力が空または全て無効だった場合。このケースの具体的な出力要件がないため、
             // 最も安全なのは、入力があった場合にのみ計算結果を出力することです。
             // ただし、仕様は「要素数と最大値を求めます」なので、0, -1 などで表現するのが一般的ですが、
             // ここでは単に計算された値を出力します。
        }

        System.out.println("count=" + finalCount + " max=" + finalMaxValue);
    }
}
