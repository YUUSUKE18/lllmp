import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (!foundNumber) {
            // 数値が一つも見つからなかった場合、count=0, maxを適切に設定する（例: count=0, max=0 または初期値）
            // 課題の意図を考えると、要素がない場合は count=0, maxのデフォルト値として何を設定するかは曖昧だが、
            // 読み込んだ有効な要素数と最大値を求めるため、何も見つからなければ count=0, maxに相当するものを出力する。
            // ここでは、もし数値が一つもなかった場合（count=0）、maxの初期値に依存しますが、ここでは安全のためmax=0としておくのが自然か。
            // ただし、要素がない場合は最大値を持たないため、count=0, max=0とするのが最も無難かもしれない。
            if (count == 0) {
                System.out.println("count=0 max=0");
            } else {
                 System.out.println("count=" + count + " max=" + max);
            }
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
