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
            // 要素が一つもなかった場合、最大値は定義できないため、ここでは0または適切なデフォルト値を設定する。
            // 問題の制約から、入力があれば必ず何らかの値が出力されると仮定し、
            // 入力が空だった場合は count=0, max=0 とするのが自然かもしれないが、
            // 厳密には「最大値」が存在しないため、ここでは読み取った要素数と最大値をそのまま出力する。
            // もし入力が完全に空なら count=0, max=Long.MIN_VALUE になるが、
            // 整数列の最大値として扱うため、もし何も読み込まれなかった場合は max を適切に処理する必要がある。
            // ここでは、要素が存在しない場合は count=0, max=0 とするのが最も安全と判断する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
