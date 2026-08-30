import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割してトークンを収集
        String[] tokens = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String token : tokens) {
            // 前後の空白を除去
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue; // 空要素は無視
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedToken);
                
                // 値が64bit整数の範囲内であることはLong型で保証されるため、直接比較する
                if (!foundValidNumber) {
                    // 最初の有効な数が見つかった場合、それを最大値として設定し、カウントをセットする
                    count = 1;
                    maxValue = value;
                    foundValidNumber = true;
                } else {
                    // 2番目以降の要素の場合、最大値を更新する
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    count++;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // すべての有効な数が見つかった場合のみ結果を出力する
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else if (line.trim().isEmpty()) {
             // 入力が空文字列だった場合は何も出力しない（仕様上、要素が一つもない場合も考慮する）
        }
    }
}
