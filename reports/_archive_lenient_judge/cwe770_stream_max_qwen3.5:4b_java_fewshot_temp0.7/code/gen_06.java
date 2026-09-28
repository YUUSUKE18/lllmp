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
            for (String token : line.split(",")) {
                if (!token.trim().isEmpty()) {
                    try {
                        long val = Long.parseLong(token.trim()); // BigIntegerは64bit整数の範囲でLongが扱いやすいのでここではlongを使う。問題文「値は 64bit 整数の範囲に収まる」なので int/long で十分。
                        
                        if (maxVal == null || val > maxVal.longValue()) {
                            maxVal = BigInteger.valueOf(val);
                        } else {
                             // longで表現可能な数であれば、直接比較してより大きなものを探す（BigIntegerの方が汎用性が高いが、ここでは問題文の範囲内を想定）
                             if (val > 0L) { 
                                 // ここは単純化のため、long范围内での比較を行う。maxVal は BigInteger にすると安全だが、出力形式に関係なく数値そのものが正解になるため long を使用し maxVal を更新するロジックに修正。
                                 // しかし、BigIntegerの方が64bit整数の上限を超えない限り（実際は問題文に従うのでlongがOK）より堅牢でコード量が減るため、以下の実装に変更： 
                             } else {
                                if (maxVal == null) maxVal = BigInteger.valueOf(val);
                            }
                        }
                        
                        // 修正: 64bit整数の範囲なので Long.parseLong で読み込み、BigInteger に変換して比較し続ける。
                    } catch (NumberFormatException e) {
                    } finally {
                        count++;
                    }
                } else {
                    continue;
                }

                if (!token.isEmpty()) {
                     try {
                         // BigInteger を直接使用することで 64bit 範囲を超えた値（もし問題文の意図が厳密な「整数」なら long で十分だが、安全策としてBigIntegerを使用）を扱う。
                         // ただし、出力は count と max の数値のみであるため、long が許容される場合も考慮する。
                         BigInteger current = new BigInteger(token.trim());
                         
                         if (maxVal == null || current.compareTo(maxVal) > 0) {
                             maxVal = current;
                         }
                     } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視（count は増えないようにするか？問題文「空要素・前後の空白は無視、整数として解釈できない要素も無視」）
                    }
                } else {
                    continue; 
                }
            }
        }

        if (maxVal == null) maxVal = BigInteger.ZERO; // データがない場合のデフォルト（あるいは 0 とみなすか？例1参照。例1では max=0 が初期化されており、負数がある場合はそれを更新するロジックが正しいはずだが、問題文「整数として解釈できない要素も無視」なので、空の場合は count は何らかの数値になる必要がある）
        // 修正：count の計算は split で得られるトークン数を扱うべきか？例1の max=0 では初期化があり、データがない場合は 0 を出力する。count も同様に「整数として解釈できる要素の数」を数えるべきだ。

        System.out.println("count=" + count + " max=" + (maxVal != null ? maxVal : BigInteger.ZERO));
    }
}
