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
        String[] parts = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈可能かチェックし、数値に変換
            try {
                // trim()で前後の空白を除去
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue; // 空の要素は無視
                }
                
                long value = Long.parseLong(trimmedPart);
                
                // 要素数として解釈された場合、最初の値が要素数になることを想定する。
                // 仕様を再確認すると、「カンマ区切りの整数列を受け取ります。それらの『要素数』と『最大値』を求めます。」となっている。
                // これは通常、「A,B,C,...」というリストから、Aが要素数、Bが最大値、という形式を期待していると解釈する。
                // しかし、入力形式が単なる整数列であるため、最も自然な解釈は「与えられた全ての数値から要素数と最大値を求める」ことと考える。
                // もし入力が「要素数,最大値」のペアで構成されているなら (例: 5,100) のことになるが、仕様文からは「カンマ区切りの整数列を受け取ります」となっているため、ここでは全ての要素を処理する。

                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 処理された有効な数値が存在する場合のみ出力
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
