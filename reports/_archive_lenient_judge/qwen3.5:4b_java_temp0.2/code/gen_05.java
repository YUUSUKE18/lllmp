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
                
                // 重複チェックとカウント・合計の更新は、集合に追加する操作で済ませる。
                // BigInteger の HashSet を使用して重複を除去し、個数を数える。
                // ただし、仕様では「重複を除いた整数」について個数と合計を求めるため、
                // 同じ値が複数回現れても 1 つとしてカウントするか、出現回数分か？
                // 「重複を除いた整数」という表現は通常、「ユニークな要素の数」と解釈される。
                // しかし、「それらのうち『重複を除いた整数』について」の文脈から、
                // 各一意の値に対して「その個数（入力リスト内の出現回数の合計）」と「その値の和」を求めるのか、
                // それともユニークな要素の数だけカウントするのか？
                // 「個数」という言葉は通常、「何通りあるか？」を指す。
                // 例：1,2,3 -> count=3 (各出現回数は1), sum=6
                //      1,1,2 -> count=2 (ユニークな値の数: 1 と 2), sum=4? または count=3?
                // 「重複を除いた整数」という言葉自体が「一意の要素」を指す。
                // その「個数」＝一意の要素の数、「合計」＝それらの和。
                
                if (!sumSet.contains(value)) {
                    sumSet.add(value);
                    count++;
                    sum = sum.add(BigInteger.valueOf(value));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static final java.util.HashSet<Long> sumSet = new java.util.HashSet<>();
}
