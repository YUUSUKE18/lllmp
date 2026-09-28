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
                    // 既に集合に含まれている場合、count は増えないが、問題文の「重複を除いた整数」について個数と合計を求めます。
                    // これは各一意の数値に対して count=1, sum=value と解釈するのが自然だが、
                    // 「それらのうち『重複を除いた整数』について」という表現は、入力されたリストからユニークな要素だけを抽出し、
                    // その結果の集合（例：{a,b,c}）に対して「個数」(3) と「合計」（a+b+c）を求めると解釈するのが一般的。
                    // しかし、「重複を除いた整数」という言葉が単一の値に対する処理なのか、全体のユニーク要素集への処理か曖昧な場合がある。
                    // 通常此类问题的意图是：找出所有唯一的数字，然后计算这些唯一数字的总个数和总和。
                    
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
