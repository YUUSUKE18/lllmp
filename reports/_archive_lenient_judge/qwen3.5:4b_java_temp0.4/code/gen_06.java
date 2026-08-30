import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数のセットを作成し、合計を計算する変数を初期化
        long sum = 0L;
        int count = 0;

        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                // 文字列を長整型に変換してチェック（整数として解釈できない場合は除外）
                BigInteger value = new BigInteger(token);
                
                if (!value.isInfinite() && !value.isNaN()) {
                    long valLong;
                    
                    try {
                        valLong = value.longValue(); // 64bit 範囲内か確認
                    } catch (ArithmeticException e) {
                        continue; // 長整型を超えている場合は無視
                    }

                    sum += valLong;
                    count++;
                } else if (!value.isInfinite() && !value.isNaN()) {
                     long valLong = value.longValueExact(); 
                     sum += valLong;
                     count++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視（例: "abc"）
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
