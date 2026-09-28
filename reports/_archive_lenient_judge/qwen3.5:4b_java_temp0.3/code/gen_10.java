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
                
                // 既にカウントされていない場合のみ処理（重複除外）
                if (!sum.toString().contains(String.valueOf(value))) {
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } else {
                    // 集合に存在する値の合計を計算し、その分だけ加算して総数と総和を更新
                    BigInteger val = BigInteger.valueOf(value);
                    
                    if (sum.toString().contains(String.valueOf(val))) {
                        sum.add(val);
                        count++;
                    } else {
                        // 既にカウント済みだが、重複を除いた値の合計を計算し直す必要がある場合があるため
                        // ここでは単純に集合として管理するのではなく、一意な整数のみを集めるアプローチに変更
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
