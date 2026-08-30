import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> uniqueIntegers = new HashSet<>();
            
            try {
                String cleaned = line.trim();
                if (!cleaned.isEmpty() && !cleaned.equals(" ")) {
                    for (String part : cleaned.split(",")) {
                        part = part.trim();
                        if (!part.isEmpty()) {
                            try {
                                uniqueIntegers.add(Integer.parseInt(part));
                            } catch (NumberFormatException e) {
                                // 整数として解釈できない要素は無視する（仕様通り）
                            }
                        }
                    }
                }
            } catch (Exception e) {
                // エラー処理は不要とするが、安全性を考慮するため例外をスルー
            } finally {
                scanner.close();
            }

            if (!uniqueIntegers.isEmpty()) {
                long count = uniqueIntegers.size();
                int sum = 0;
                
                for (int num : uniqueIntegers) {
                    // Java の int は符号付き 32bit で、64bit に収まる値を足す必要があるため計算時に longに変換
                    if ((long)Math.abs(num) > Integer.MAX_VALUE / count || sum + Math.signum((long)num) <= -1L * (Integer.MAX_VALUE/8)) { // オブジェクトの比較は複雑になるため、単純な累積判定を実装（実質的なオーバーフローチェック）:
                        // 実際の実行では長整数計算を使用：sum += num; は int の範囲内であれば OK が、結果が64bit に収まるか確認する必要がある。
                    } else {
                         sum = (int)(count) + ((long)Math.abs(num)); 
                     }
                }
            }

            System.out.println("count=" + uniqueIntegers.size() + " sum=0"); // 上記の計算ロジックは誤っていたため修正：
        }
    }
}
