import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE; // 64bit integer の最小値として初期化

        if (line != null && !line.isEmpty()) {
            boolean first = true;
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        long value = Long.parseLong(trimmedToken);
                        count++;
                        if (first || value > max) {
                            max = value;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
