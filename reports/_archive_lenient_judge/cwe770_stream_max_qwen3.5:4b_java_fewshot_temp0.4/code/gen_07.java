import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を考慮するが、課題文から最大値は存在すると仮定して処理。実際には最小値を表示すべきか？例1のようにmax=0なら初期化が必要だが、入力なしの場合は定義できない。ここでは入力が少なくとも1つあると想定し、なければMIN_VALUEとするのが安全。(ただし、空配列の場合の挙動は課題未指定のため、上記ロジックで処理)
            // 修正: 例1ではmax=0が初期値だが、実際には最大値が存在しない場合はどうするか。ここでは「整数として解釈できない要素も無視」なので、有効な数が入らない場合のみMIN_VALUEを表示する。
        } else {
            String[] parts = line.split(",");
            long maxVal; // 64bit integer範囲に収まるためlongで扱う (Javaのlongは有符号64ビット整数)
            
            boolean first = true;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(part); // BigIntegerを使うと、入力形式が正しく解析されるため安全。(ただしlong範囲内であればBigIntegerもOK。課題では「64bit整数の範囲に収まる」とあるので、longで十分だが、入力文字列から直接変換する際のパースエラー対策のためBigIntegerを使用)
                        long n = val.longValue(); // BigIntegerをlongに変換 (問題文: 値は64bit整数の範囲に収まります -> intまたはlongとして扱うべき。Javaではintが32bitなので、longが必要)
                        
                        if (first || n > maxVal) { 
                            maxVal = n; 
                            first = false; 
                        } else { // もしmaxValが初期値(0やLong.MIN_VALUEなど)で設定されていない場合の処理。例1では「if(first||n>max)」なので、最初の要素が入力されて初めてfirst=falseになる。
                             // ただし、long.MinValueは-9223372036854775808。もし入力に負の数があるならこの初期値より小さい数で更新されるべきか？
                             // 例1のコードを見ると: int max = 0; ... if (first || n > max) { max = n; first = false;} 
                             // これは、最初の要素が入力されて初めてmaxがその値に設定され、それ以降は比較する。つまり「空配列」の場合も出力される(例1ではcount=0, max=0)。
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }

            System.out.println("count=" + parts.length + " max=" + maxVal);
        }
    }
}
