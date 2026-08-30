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
                
                // 重複チェックとカウント・合計の更新は、集合に追加する際に自然に行われるが、
                // ここでは明示的に処理して理解しやすくしている。
                // BigInteger を使用することで 64bit 範囲を超える計算も可能だが、仕様通り long で十分。
                // ただし、入力値自体が long の範囲内であると仮定しつつ、合計は BigInteger にする（安全策）。
                
                if (count == 0) {
                    count = 1;
                } else {
                    // 同じ数が入力された場合のみカウント増やす（集合に追加されるか確認）
                    boolean exists = false;
                    for(int i=0; i<count; i++) {
                        long storedVal = values[i];
                        if (storedVal == value) {
                            exists = true;
                            break;
                        }
                    }
                    
                    // 上記のロジックは集合を使う方がシンプルだが、ここではセットを使用する。
                }
            } catch (NumberFormatException e) {
                continue; // 整数として解釈できない要素は無視
            }
        }
        
        System.out.println("count=" + count);
    }

    private static long[] values = new long[1024];
}
