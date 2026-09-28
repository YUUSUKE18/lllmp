import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long count = 0;
        BigInteger maxVal = BigInteger.ZERO; // 初期値を 0 に設定（負の整数が入る場合は調整が必要だが、仕様上「最大値」を求めるため、空でない場合のみ考慮するか、または入力が存在する場合に計算）
        
        // すべての要素が負数の場合でも正しい結果を出すために、BigInteger は符号付きなので問題ない。
        // しかし、max の初期状態として BigInteger.ZERO を使うと、全負数のリスト [ -5, -10 ] に対して max が 0 とされてしまう可能性がある（-5 > -10 なので正解は最大値だが、0 は入力に含まれていない場合）
        // より安全な做法: まず空でない要素をすべて解析し、最小の BigInteger を初期化するか、または第一要素で初期化する。

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    // 文字列が整数でない場合は caughtException に相当する処理（ここでは無視）
                    BigInteger val;
                    boolean isNumber = false;
                    
                    // BigInteger のコンストラクタは数字を受け取るか、または String を受け取ってパースできる。
                    // しかし、入力には "123abc" などが含まれる可能性があるため、厳密に整数であるかチェックする必要があるか？ 
                    // 例題のロジックに従い、「Integer.parseInt」で変換し不可能なら無視します」という意味合いですべてを解析。
                    
                    try {
                        val = new BigInteger(part.trim());
                        isNumber = true;
                        
                        count++;
                        
                        if (count == 1) {
                            maxVal = val; // 最初の要素で初期化
                        } else {
                            int compareResult = val.compareTo(maxVal);
                            if (compareResult > 0 || (!isFirst && !maxVal.isZero() ? true : false)) { 
                                // より単純に: 比較して大きな方を採用。BigInteger の compareTo は signed な比較を行う（正数と負数の区別がある）。
                                maxVal = val;
                            }
                        }
                    } catch (NumberFormatException e) {
                        isNumber = false;
                    }

                } catch (Exception ex) {
                    // BigInteger 作成中にエラーが発生した場合は無視し続ける（例：文字列が数字と見なせない場合）
                }
            } else {
                continue;
            }
        }
        
        if (!isFirst && maxVal != null || count > 0) { 
             // 上記のロジックで、count が 1 の場合は maxVal はセットされている。
             // ただし、最初の要素が負数の場合、max をどう扱うか？
             // BigInteger は符号付きなので -5 と -10 を比較すると -5 > -10 で正しい順序になるため問題ない。
        }

        System.out.println("count=" + count + " max=" + (BigInteger.ZERO)); 
    }
}
