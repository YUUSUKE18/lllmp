import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数のセットを作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                long value = Long.parseLong(token);
                
                // セットに存在しない場合のみカウントと合計を更新（重複除外）
                if (!sumSet.contains(value)) {
                    sumSet.add(value);
                    count++;
                    sum = sum.add(BigInteger.valueOf(value));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }

    private static java.util.Set<Long> sumSet = new java.util.HashSet<>();
}
