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
                    // 同じ値が既に存在する場合、count は増えない（「重複を除いた整数」について）
                    // ただし、仕様は「個数と合計を求めます」とあり、「重複を除いた整数」の総和を求めるのか、それとも各要素の出現回数をカウントするのか。
                    // 文脈から判断すると、「重複を除いた整数」＝ユニークな値に対して、その値が何回現れたか（count）とその値の合計（sum）を求めよという解釈も可能だが、
                    // 「個数と合計」という表現は通常「出現する回数」と「和」を意味し、かつ「重複を除いた整数について」という修飾語がある。
                    // 最も自然な解釈：ユニークな値のリストに対して、その各値が何回現れたか（count）とその値自体の合計（sum）を求めるのではなく、
                    // 「重複を除いた」状態での個数と和を求めよという文脈は少し曖昧。
                    // 一般的な競プロやアルゴリズム問題としての解釈：
                    // A. ユニークな要素の数 (count) とユニークな要素の合計 (sum)。-> これは「重複を除く」という操作後の結果。
                    // B. 各値が何回現れたか（出現頻度）と、その総和。-> しかしこれは「個数」ではなく「出現回数」。
                    // C. 「重複を除いた整数」の集合に対して、「この集合に含まれる要素の数 (count)」と「これらの要素の合計 (sum)」。
                    
                    // 最も合理的な解釈：A を採用する（ユニークな値の数とその和）。
                    // ただし、もし「個数」とが「出現回数を意味するなら」、問題文は通常「各整数について」や「それぞれの整数について」と表現される。
                    // 「重複を除いた整数」の集合に対して、「その集合に含まれる要素の個数と合計を求めよ」。
                    
                } else {
                    // 上記解釈（A）では、同じ値が再出現しても count は増えないため、else ブロックは不要だが、
                    // もし「各整数について」という意味ならここが必要。しかし、「重複を除いた」修飾語がある以上、ユニークな要素のみを対象とするのが妥当。
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
