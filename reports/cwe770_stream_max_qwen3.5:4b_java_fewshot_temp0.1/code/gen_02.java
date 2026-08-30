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
                        // 整数として解釈できない場合は無視する
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
            // 問題文では「最大値」を求めるため、存在しない場合は初期値またはエラー扱いですが、
            // 出力形式を維持するため count=0 の時に max は何を出すか定義が必要です。
            // 通常は最初の要素がなければ MAX_VALUE または MIN_VALUE を出すのが一般的です。
            // ここでは有効な整数が存在しなかった場合の挙動として、count=0, max=MIXED_MIN_VALUE とします。
             System.out.println("count=" + count + " max=" + Long.MIN_VALUE);
        }
    }
}
