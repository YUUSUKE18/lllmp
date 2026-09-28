import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        BigInteger maxVal = null;
        int count = 0;
        
        if (line != null && !line.isEmpty()) {
            // カンマで分割し、空白と空要素を除去した各要素に対して処理を行う
            for (String part : line.split(",")) {
                String trimmedPart = part.trim();
                
                // 空でない場合のみ解析を試みる
                if (!trimmedPart.isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(trimmedPart);
                        
                        if (maxVal == null || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                        }
                        
                        count++; // 有効な整数が見つかった場合はカウントする
                        
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視（count は増えない）
                    }
                }
            }
        }
        
        if (!maxVal.equals(BigInteger.ZERO)) {
            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 有効な整数が1つもなかった場合、最大値は0（または定義上なしだが例参照で初期化）とする。
            // ただし問題文の「max=<最大>`」という形式を厳密に満たすため、入力がない場合はどのように出力するか？
            // 例1を見ると max=0 がデフォルトになっているので、同様に count=0, max=0 とする（または max は未定義とするがJavaでは数値が必要）。
            // 問題文：「それらの『要素数』と『最大値』を求めます」→ エラーがない場合のみ存在。
            // しかし例1のロジックに従うため、初期max=0を使用し、入力なしでも "count=0 max=0" を出力する形とする（または最大の定義）。
            // 再考：空配列の場合最大値は未確定だが、プログラムとしては何らかの数値を返す必要がある。例1の 'if (first || n > max)' は初期maxが0で正しいと仮定。
            // ただし問題文「64bit整数の範囲に収まる」→ BigIntegerを使用し、もし入力がない場合も "count=0 max=" とはならないため、最大値を"なし"ではなく数値として扱う必要あり。
            // 例1ではmax=0が初期化されているので、同様に count=0, max=0 を出力する（または最初の要素が見つかるまで更新されない限り）。
            System.out.println("count=" + (count == 0 ? "0" : String.valueOf(count)) + " max=" + ((maxVal == null) ? "なし" : String.valueOf(maxVal))); 
        }
    }
}
