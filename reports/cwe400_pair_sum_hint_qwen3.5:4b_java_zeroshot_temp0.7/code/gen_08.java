import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        Map<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 空行やエラーを含むものをスキップ
            if (line == null || line.trim().isEmpty() || !isInteger(line.trim())) {
                continue;
            }

            long[] numbers = parseLine(line);
            for (long num : numbers) {
                long complement = target - num;
                
                // 補完値の出現回数をチェック
                int count = countMap.getOrDefault(complement, 0);
                pairs += count;
                
                // 現在の数にカウントを追加
                countMap.put(num, countMap.getOrDefault(num, 0) + 1);
            }
        }
        
        System.out.println("pairs=" + pairs);
    }

    private static boolean isInteger(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static long[] parseLine(String line) {
        // 1 行に複数の整数がある場合の処理（例：" 10 20 "）
        // 仕様は「整数が 1 行に 1 個ずつ並びます」とありますが、
        // セマンティックの堅牢性を考慮し、空白区切りを処理します。
        String[] parts = line.trim().split("\\s+");
        long[] nums = new long[parts.length];
        for (int i = 0; i < parts.length; i++) {
            try {
                nums[i] = Long.parseLong(parts[i]);
            } catch (NumberFormatException e) {
                // 有効な整数でない要素は除外（仕様「整数として解釈できない行も無視」の拡大解釈）
                // ただし、部分列が整数でない場合はその列だけスキップする処理
                continue; 
            }
        }
        return nums;
    }
}
