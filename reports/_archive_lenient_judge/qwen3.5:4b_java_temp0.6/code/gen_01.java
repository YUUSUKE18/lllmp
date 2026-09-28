import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;

        BigInteger sum = BigInteger.ZERO;
        int count = 0;

        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long val = Long.parseLong(token.trim());
                // 整数として解釈できない場合は無視（try-catch で処理済みだが、追加のチェックが必要か？仕様は「整数として解釈できない要素も無視」なので、Long.parse は適切）
                // ただし、長すぎる文字列の場合には例外が発生するため、BigInteger を直接使うのが安全だが、合計が 64bit に収まるという制約があるため long で処理しつつ、入力値自体の範囲は BigInteger で扱う必要があるかもしれない。
                // 「合計は 64bit 整数の範囲に収まります」 → 出力される sum は long の範囲内だが、入力はそれを超えていても良いのか？ 
                // 仕様文：「重複を除いた整数」について個数と合計を求めます。「合計は 64bit 整数の範囲に収めます。」
                // これは計算結果（sum）が 64bit に収まると言っている。入力値自体が 64bit を超えていても、それが複数重なって sum が超えることは想定されていないと解釈できるか？ 
                // しかし、「整数として解釈できない要素も無視」なので、入力は任意の文字列かもしれない。
                // より安全に：入力を BigInteger で解析し、sum も BigInteger で集計するが、最終出力を 64bit に収まると保証されているため long へ変換して出力すれば OK。

                if (token.trim().isEmpty()) continue;

                try {
                    int num = Integer.parseInt(token); // 仕様では「整数」とあるので、int または long で十分か？ 
                                                            // 「重複を除いた整数」→ 通常 int 範囲だが、long が安全か？
                                                            // Java の parseInt は String に変換して返す。長すぎる場合は NumberFormatException を吐くが、これは「整数として解釈できない要素」とみなせる。
                    BigInteger b = new BigInteger(token);
                    
                    if (!b.equals(BigInteger.ZERO) && !sc.hasNext()) { // 空列の処理は sc.next() がブロックされるので不要か？ 
                        // スキャン時の空白無視と末尾改行などは Scanner の自動機能で済む。
                    } else {
                         sum = sum.add(b);
                         count++;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }

            } catch (Exception e) {
                 // 他の例外も無視する（例：文字列が完全に整数形式でない場合）
                 break; 
            }
        }

        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
