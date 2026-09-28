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
                
                // セットに既に存在しない場合のみカウントと合計を更新（重複除外）
                if (!counted) {
                    count++;
                    sum.add(BigInteger.valueOf(value));
                    counted = true;
                } else {
                    continue; 
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
    
    private static boolean counted = false;
}
