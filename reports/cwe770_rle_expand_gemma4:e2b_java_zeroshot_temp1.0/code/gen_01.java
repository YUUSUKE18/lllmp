import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割して各要素を処理
        String[] parts = line.split(",");
        
        long totalCount = 0;
        long totalSum = 0;
        
        // 正規表現を使って "値:回数" の形式をチェックする
        Pattern pattern = Pattern.compile("^\\s*(\\d+):(\\d+)\\s*$");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) {
                continue;
            }
            
            // 正規表現にマッチするかチェック
            Matcher matcher = pattern.matcher(part);
            
            if (matcher.matches()) {
                try {
                    String[] values = part.trim().split(":");
                    if (values.length == 2) {
                        // 値は無視し、回数を取得
                        // 実際には、問題の記述「7:3,2:2 は 7,7,7,2,2 という整数列を表します。」に従う。
                        // これは、値:回数をそのまま個々の要素として展開することを意味する。
                        // 仕様を再解釈: "値:回数" のペアが、値が回数だけ繰り返されることを意味する。
                        // 例: 7:3 -> 7 を 3 回繰り返す (7, 7, 7)
                        
                        String[] kv = part.split(":");
                        if (kv.length == 2) {
                            int value = Integer.parseInt(kv[0]);
                            int count = Integer.parseInt(kv[1]);
                            
                            if (count >= 0) {
                                totalCount += count;
                                totalSum += (long)value * count;
                            }
                        }
                    }
                } catch (NumberFormatException e) {
                    // 数字に変換できなかった場合は無視 (仕様に従う)
                }
            }
        }
        
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
