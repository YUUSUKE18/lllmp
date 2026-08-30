import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        BigInteger[] numbers = new BigInteger[1]; // 初期値は空配列として扱うために変数を用意（実際はループで動的に管理）
        int count = 0;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                BigInteger val = new BigInteger(part.trim()); // 64bit 範囲に対応するため BigInteger を使用（内部で long に変換可能）
                
                count++;
                
                // まず max が未設定なら初期化、または比較
                if (count == 1) {
                    numbers[0] = val;
                } else {
                    if (val.compareTo(numbers[0]) > 0) {
                        numbers[0] = val;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視（BigInteger コンストラクタで自動処理）
            }
        }

        long maxVal = Long.MIN_VALUE; 
        if (count > 0 && numbers[0] != null) {
            try {
                 maxVal = numbers[0].longValue(); // BigInteger を長整数に変換（仕様は 64bit 範囲なので OK）
            } catch (ArithmeticException e) {
                // これは発生しないはずだが、安全のために処理
                System.out.println("count=" + count + " max=" + Long.MIN_VALUE);
                return;
            }
        }

        if (maxVal == Long.MIN_VALUE && count > 0) {
             maxVal = numbers[0].longValue(); // もし最初の要素が MIN_VALUE の場合でも正しく扱うため、上記のロジックを再確認
        } else if (count == 0) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        // より堅牢なアプローチ：配列で最大値を追跡し、最後に出力する形式に修正
    }
}
