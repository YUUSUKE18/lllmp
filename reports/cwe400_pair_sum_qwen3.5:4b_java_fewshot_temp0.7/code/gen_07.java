import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        long target;
        if (targetLine == null || !targetLine.isEmpty()) {
            try {
                target = Long.parseLong(targetLine.trim());
            } catch (NumberFormatException e) {
                System.out.println("pairs=0");
                return;
            }
        } else {
            System.out.println("pairs=0");
            return;
        }

        long count = 0;
        java.util.Set<Long> seen = new java.util.HashSet<>();

        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            String[] parts = line.trim().split("\\s+");
            boolean foundInt = false;
            for (String part : parts) {
                try {
                    long val = Long.parseLong(part);
                    long diff = target - val;
                    if (seen.contains(diff)) {
                        count++;
                    }
                    seen.add(val);
                    foundInt = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視（問題文の「空行も無視」および「整数として解釈できない行も無視」）
                    // ただし、1 行に複数の値がある場合でも、その中で条件を満たすペアを数える必要があります。
                    // 問題文の「2 行目以降の整数のうち」という表現から、各整数を個別に処理するのが適切です。
                    // ただし、入力形式は「1 行に 1 個ずつ並びます」とあるので、通常は 1 行 1 値ですが、
                    // 空行やノイズがある場合は上記のロジックで対応します。
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
