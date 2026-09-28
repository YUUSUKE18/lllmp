import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 要素が一つもなかった場合の処理（最大値の初期値に依存）
            // 問題文の指示に従い、要素数と最大値を出力する。要素がない場合は 0, 最小値とするか、あるいは仕様に基づき適切な値を設定する。
            // ここでは、入力された有効な要素が0個の場合は、count=0, max=0 または count=0, max=-infinity となるが、
            // 一般的な競プロの文脈では、データが存在しない場合は count=0 で十分とされることが多い。
            // ただし、最大値として Long.MIN_VALUE を保持しているため、count=0 の場合は max が意図せず残る可能性がある。
            // ゼロ要素が入力された場合のみ count > 0 となる。
            // 要素がない場合は count=0, max=0 とする（あるいは環境依存だが、ここでは安全策として 0 を出力する）。
            System.out.println("count=0 max=0");
        }
    }
}
