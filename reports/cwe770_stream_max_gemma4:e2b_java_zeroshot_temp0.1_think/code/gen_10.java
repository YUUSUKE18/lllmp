import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は何もしない
            return;
        }
        String line = scanner.nextLine();
        scanner.close();

        // カンマで分割してトークンを取得
        // StringTokenizerを使うことで、スペースやカンマの処理をより柔軟に行う
        StringTokenizer tokenizer = new StringTokenizer(line, ",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (tokenizer.hasMoreTokens()) {
            String token = tokenizer.nextToken().trim();
            
            if (token.isEmpty()) {
                continue; // 空の要素は無視
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(token);
                
                // 有効な整数が見つかった場合
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 処理された要素が一つもなかった場合は、count=0, max=無効値として扱う（仕様上は空の入力に対する具体的な指示はないが、安全のため）
        if (!foundNumber) {
            // 入力が空または無効な場合、count=0, max=0 (または適切なデフォルト値)とする。
            // ここでは、要素が0個の場合、maxは定義されないため、count=0として出力する。
            System.out.println("count=0 max=0");
        } else {
            // 結果を出力
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
