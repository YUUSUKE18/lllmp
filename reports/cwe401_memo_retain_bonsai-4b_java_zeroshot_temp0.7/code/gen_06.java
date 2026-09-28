import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAXIter = 64; // 64 かとよりは安全

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();

        // 1 行に 1 個ずつ整数を読み取る
        String line = scanner.nextLine();
        while (line != null && line.trim().length() > 0) {
            String[] parts = line.split("\\s+");
            for (String part : parts) {
                if (!part.matches("\\d+")) continue;
                int n = Integer.parseInt(part);
                queries.add(n);
            }
            line = scanner.nextLine();
        }

        // メモを清空
        memo.clear();

        // 各クエリに対して計算
        long total = 0;
        for (int n : queries) {
            if (n == 1) {
                total += 0;
            } else {
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                        if (current > MAXIter) break;
                    }
                    steps++;
                }
                memo.put(n, steps);
                total += steps;
            }
        }

        // 输出: total=<合計>
        System.out.println("total=" + total);
    }
}
