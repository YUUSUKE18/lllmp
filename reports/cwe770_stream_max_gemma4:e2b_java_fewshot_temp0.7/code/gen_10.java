import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }
                try {
                    long n = Long.parseLong(trimmedPart);
                    if (first) {
                        max = n;
                        count = 1;
                        first = false;
                    } else {
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素が存在しなかった場合は count=0, max=0 (または適切な初期値) を考慮するが、
        // 問題の意図から入力があればその結果を出力する。
        if (line != null && line.trim().isEmpty()) {
             System.out.println("count=0 max=0");
        } else if (!first) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 入力が空または無効な場合（例: 空行）
             System.out.println("count=0 max=0");
        }
    }
}
