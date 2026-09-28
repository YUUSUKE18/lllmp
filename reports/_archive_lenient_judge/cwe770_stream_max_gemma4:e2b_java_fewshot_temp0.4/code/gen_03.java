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
                        // 64bit整数として解釈
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

        // 空要素や無効な要素がなかった場合、count=0, max=最小値（または適切なデフォルト）を考慮する必要があるが、
        // 問題の意図に従い、読み込んだ有効な要素に基づいて計算する。
        // 読み込んだ要素が一つもなかった場合は count=0, max=Long.MIN_VALUE となるが、
        // 通常は「要素数」と「最大値」を出力するため、要素が存在しない場合の挙動を考慮する必要がある。
        // ここでは、有効な整数が見つかった場合にのみカウントと最大値を更新する。
        
        if (count == 0) {
            // 要素が一つもなかった場合、maxの出力は問題の文脈に依存するが、ここでは読み込んだ要素がないことを示すために0を出力するか、
            // またはLong.MIN_VALUEをそのまま出力する。例として、要素が存在しない場合は count=0, max=0 とするのが自然かもしれないが、
            // 厳密には「最大値」は存在しないため、ここでは読み込んだものに基づいて出力する。
            // ただし、もし入力が空文字列や数字のみで構成されていた場合、count=0となる。
            // 例として、要素がない場合は count=0, max=0 とする（これは任意だが安全策）。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
