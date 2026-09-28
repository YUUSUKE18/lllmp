import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

        List<Long> numbers = new ArrayList<>();
        Set<String> validLines = new HashSet<>();
        
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            // 整数として解釈できない行は無視
            try {
                long value = Long.parseLong(line.trim());
                numbers.add(value);
            } catch (NumberFormatException e) {
                // 無視
            }
        }

        int count = 0;
        Set<Long> seen = new HashSet<>();
        
        for (int i = 0; i < numbers.size(); i++) {
            long current = numbers.get(i);
            long complement = targetValue - current;
            
            // 既に計算済みの組み合わせで一致するものがあるかチェック
            if (seen.contains(complement)) {
                count++;
            } else {
                seen.add(current);
            }
        }

        System.out.println("pairs=" + count);
    }
}
