import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // すべての入力を読み取
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    break;
                }
                inputs.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 无効な行は無視
                continue;
            }
        }
        
        // 手数を計算し、合計を累積
        int total = 0;
        for (int n : inputs) {
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
                    }
                    steps++;
                }
                total += steps;
            }
        }
        
        // メモをキャッシュに更新（必要性はないが、再利用可能）
        // ここではメモ化は実行済みで、次回の入力も処理可能
        // ただし、問題文では「繰り返し」が意味するため、メモ化は不要
        // しかし、コードの再利用可能性を考慮し、1番の入力をキャッシュに
        // 保存する必要がある場合があるが、問題文ではメモ化は不要
        // したがって、メモ化は不要。直接処理
        System.out.println("total=" + total);
    }
}
