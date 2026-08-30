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
            // 前後の空白を無視するためにトリムする（念のため）
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedToken);
                foundNumber = true;
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 有効な整数が見つかった場合のみ結果を出力する
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } 
        // 注意: 仕様には「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
        // 要素が一つも数値でなかった場合は何も出力しない（またはデフォルトの動作）が、
        // 少なくとも入力があった場合は結果を出すようにする。
        // もし、数値が一つもなかった場合の具体的な出力要件があれば調整が必要だが、ここでは値が見つかれば出力する。
    }
}
