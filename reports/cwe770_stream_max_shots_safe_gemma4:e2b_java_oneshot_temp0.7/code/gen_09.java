import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空の文字列や前後の空白を無視するためにtrim()を使用するが、
            // split(",")で区切られた要素自体が整数として解釈可能かを確認する。
            // 厳密に「整数として解釈できない要素も無視」するため、try-catchでチェックする。
            try {
                long value = Long.parseLong(part.trim());
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber && parts.length > 0) {
            // すべての要素が数値として解釈できなかった場合、count=0 max=0とする（または仕様に応じて調整）
            // ここでは、読み込んだ中で数値として解釈できたものの数と最大値を報告する。
            // もし空文字列や無効な値のみだった場合は count=0, max=0が適切だが、
            // 読み込んだ要素の総数ではなく「整数として解釈できた要素」の数をカウントするのが自然。
            // 仕様の意図を「カンマ区切りのうち有効な整数部分」と解釈し、上記で計算されたcountとmaxを採用する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
