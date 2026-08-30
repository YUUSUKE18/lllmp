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
                boolean isDuplicate = false;
                for (int i = 1; i <= count; i++) {
                    if (values[i] == value) {
                        isDuplicate = true;
                        break;
                    }
                }
                
                // 重複していない場合のみカウントと合計に含める
                if (!isDuplicate) {
                    values[count++] = value;
                    sum.add(BigInteger.valueOf(value));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static long[] values = new long[1024];
}
