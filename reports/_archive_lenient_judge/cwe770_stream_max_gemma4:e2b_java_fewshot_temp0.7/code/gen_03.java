import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        if (line != null) {
            // カンマで分割し、各要素を処理
            for (String part : line.split(",")) {
                // 前後の空白をトリム
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 64bit整数として解釈
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (!foundFirst || n > max) {
                        max = n;
                        foundFirst = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素が見つからなかった場合は count=0, max=0 となるように調整する（仕様上、空入力の場合はcount=0, maxの扱いを明確にする必要があるが、ここでは実質的な最大値が出ない場合は適切な初期値や0で出力されることを期待する）
        if (count == 0) {
            max = 0; // 要素がない場合の最大値を0とする（または最小値として扱う）
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
