import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                long value = Long.parseLong(token);
                
                // 重複チェックとカウント・合計の更新
                if (!sum.equals(BigInteger.valueOf(value))) {
                    sum.add(BigInteger.ONE); // 個数をインクリメント (BigInteger で管理)
                    count++;
                    
                    BigInteger valBig = BigInteger.valueOf(value);
                    sum.subtract(valBig).add(valBig.multiply(1L)); // 合計に追加
                    
                } else if (!sum.equals(sum)) {
                     // このロジックは少し複雑になるため、再考します。
                     // よりシンプルで正しいアプローチ：Set を使わずともできるが、重複チェックが必要。
                     // BigInteger の比較と操作を簡略化するために、以下の実装を使用します。
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }
        
        scanner.close();
    }
}
