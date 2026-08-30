import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空の入力があった場合や、有効な数値が一つもなかった場合の処理（ここではcount=0, max=MIN_VALUEで出力）
        if (count == 0) {
            // 入力が空または無効な場合でも、仕様に従い count と max を出力する
            // ただし、maxの初期値がLong.MIN_VALUEの場合、問題の意図によっては特別な処理が必要だが、ここでは読み取れた最大値をそのまま出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
