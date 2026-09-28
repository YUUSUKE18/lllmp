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
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } else {
                    BigInteger currentSum = new BigInteger(String.valueOf(sum.subtract(BigInteger.valueOf(value))));
                    // 既に集合に含まれている場合は、count を増やさないようにする必要があるか？
                    // 仕様は「重複を除いた整数」について個数と合計を求めます。
                    // つまり、一意の値の数え上げです。
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
