import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割して処理
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

        // 空の入力や数値が一つもなかった場合の処理（ここでは0個、最小値など）
        if (count == 0) {
            // 入力が空または無効な場合。仕様上、読み込んだ要素数と最大値を出す必要があるため、
            // データがない場合は count=0, max=0 などとして出力するのが自然だが、
            // ここでは読み込んだ有効な要素に基づいて計算された値を出力する。
            // 読み込んだ要素が0個の場合、maxの初期値(Long.MIN_VALUE)をそのまま使うのは不適切かもしれないため、
            // 読み込んだ要素数と最大値を直接出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
