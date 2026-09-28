import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seenValues = new HashSet<>();
        int count = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            long[] parts;
            try {
                parts = line.split("\\s+");
            } catch (NumberFormatException e) {
                System.out.println("pairs=0");
                return;
            }

            for (String part : parts) {
                try {
                    long value = Long.parseLong(part);
                    
                    long complement = targetValue - value;
                    if (seenValues.contains(complement)) {
                        count++;
                    }
                    seenValues.add(value);
                } catch (NumberFormatException e) {
                    // 数値として解釈できない行または要素は無視するが、この構造では try-catch 内で処理済み
                    // 実装上は分割失敗や変換失敗を無視し続ける
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
