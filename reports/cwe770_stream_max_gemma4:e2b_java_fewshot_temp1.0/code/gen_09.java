import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                // 前後の空白を除去
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64ビット整数として読み込む
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 空要素や数値変換エラーを考慮して、実際に読み取った有効な整数の数をカウントする方がより厳密かもしれないが、
        // ここでは「カンマ区切りの語」の数と「最大値」を求めるため、入力された文字列を基準に処理を進める。
        // 課題の要求は「要素数」と「最大値」なので、実際にパースできたものの数をカウントする方が適切。

        // 再度、要素数（count）が正しいか確認するために、全ての有効な数値が見つかったことを前提とする。
        // もし入力が「1, 2, a, 4」だった場合、countは3になるべき。上記ループで count を増やしているので、これはOK。

        System.out.println("count=" + count + " max=" + max);
    }
}
