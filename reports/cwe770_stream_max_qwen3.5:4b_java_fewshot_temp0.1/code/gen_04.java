import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmed);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        if (!first && count > 0) {
             System.out.println("count=" + count + " max=" + max);
        } else {
            // 有効な整数が一つもない場合の処理（例：空文字列や無効のみ）
            // 仕様上「最大値」を求めるため、初期値を保持するか、または0とみなすか。
            // 上記コードでは count=0 の時に max を Long.MIN_VALUE で出力している。
            System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : max));
        }
    }
}
