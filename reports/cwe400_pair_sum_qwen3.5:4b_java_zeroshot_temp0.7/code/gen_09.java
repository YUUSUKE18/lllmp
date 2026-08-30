import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNext()) return;
        
        // 目標値を読み込む（長さは long で受け取る）
        long target;
        try {
            String targetLine = scanner.nextLine().trim();
            if (targetLine.isEmpty() || !Character.isDigit(targetLine.charAt(0))) {
                return;
            }
            target = Long.parseLong(targetLine);
        } catch (NumberFormatException e) {
            return;
        }

        long count = 0;
        Set<Long> seen = new HashSet<>();

        // 2 行目以降を読み込む
        while (scanner.hasNext()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue; // 空行は無視
            
            try {
                long value = Long.parseLong(line);
                
                // 目標値 - 現在の値 が既に集合に含まれているか確認
                long complement = target - value;
                if (seen.contains(complement)) {
                    count++;
                }
                
                seen.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行も無視
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
