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

        // 空の入力や数値が存在しなかった場合の処理（count=0, max=Long.MIN_VALUE）を考慮して出力
        if (count == 0) {
            // 要素が全くなかった場合、最大値は定義できないため、ここでは0または適切なデフォルト値を設定する。
            // 問題の制約から、入力があれば必ず整数列があるはずだが、念のため。
            // もし入力が空だった場合は count=0, max=0 とするのが自然かもしれないが、
            // 読み込んだ要素がない場合は最大値は意味を持たないため、ここでは読み込んだ要素に基づき出力する。
            // ただし、もし入力が完全に空でなかったが数値が一つもなかった場合 (例: ",,")、count=0, max=Long.MIN_VALUEとなる。
            // 課題の意図を尊重し、実際に処理した有効な要素数と最大値を報告する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
