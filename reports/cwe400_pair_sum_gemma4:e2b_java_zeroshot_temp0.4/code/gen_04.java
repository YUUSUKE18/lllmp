import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        
        // 1行目: 目標値
        if (!scanner.hasNextLine()) {
            return;
        }
        long target = Long.parseLong(scanner.nextLine().trim());

        // 2行目以降: 数値の読み込み
        java.util.List<Long> numbers = new java.util.ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(line));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 2個の組の数を数える
        long pairCount = 0;
        int n = numbers.size();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
        
        scanner.close();
    }
}
