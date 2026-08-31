import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1 || colonIndex == 0) continue; // 形が間違っているか、値:回数の形ではない

                String valStr = part.substring(0, colonIndex);
                String countStr = part.substring(colonIndex + 1).trim();

                try {
                    long val = Long.parseLong(valStr.trim());
                    long cnt = Long.parseLong(countStr);

                    if (val != 0) {
                        count += cnt;
                        sum += val * cnt;
                    } else {
                        // 値が 0 の場合、要素数にカウントし、合計には影響しない（問題文の意図に従う）
                        // ただし、「空要素・前後の空白は無視」「形に解釈できない無視」という要件があるため、
                        // ここでは解析可能な範囲で処理する。0:3 とあれば 3 個の要素としてカウントし、合計 0 に追加。
                        count += cnt;
                    }
                } catch (NumberFormatException e) {
                    // 数値が解析できない場合は無視
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
