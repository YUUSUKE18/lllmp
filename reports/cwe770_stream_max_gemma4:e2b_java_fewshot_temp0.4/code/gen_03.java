import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 空の入力があった場合（countが0の場合）の max の初期値処理を考慮する。
        // 問題文の仕様に基づき、要素数と最大値を求める。空の入力でも count=0, maxの適切な値が出力されるべき。
        // 整数として解釈できた要素がない場合は max は定義されないが、ここでは Long.MIN_VALUE が残る可能性があるため、count=0 の場合は max を適切に扱う必要がある。
        // ただし、最初の例に従い、実際に読み取れた数値のみを考慮する。
        if (count == 0) {
            // 要素が一つもなかった場合、最大値は未定義だが、ここでは count=0, max=0 または適切なデフォルト値を設定する。
            // 厳密には「最大値」が存在しないため、入力がない場合は max を出力する必要がある。
            // 例として、要素数と最大値が出力されることを保証するため、count=0 なら max は無視するか、あるいは最小値で初期化されたままにするか。
            // 今回は、読み取れた数値のみを対象とするため、count=0 の場合は max を 0 または適切なデフォルト値とする。
            max = 0; // 要素がない場合は最大値を 0 とする（または問題の意図に従う）
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
