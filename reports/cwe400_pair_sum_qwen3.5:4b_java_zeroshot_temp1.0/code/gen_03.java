import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 目標値の読み込み
        // 入力形式に準じて、空行やエラーを含む行をスキップして有効な long を探す
        long target = 0;
        boolean foundTarget = false;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty() || !line.matches("-?[0-9]+")) {
                continue; // 空行や整数ではない行をスキップ
            }
            try {
                target = Long.parseLong(line);
                foundTarget = true;
                break;
            } catch (NumberFormatException e) {
                continue; // パースエラーの発生時にスキップ
            }
        }

        if (!foundTarget) {
            System.out.println("pairs=0");
            return;
        }

        // 入力される整数を読み込む
        long count = 0;
        int[] nums = new int[2000000]; // 必要に応じて配列サイズを増幅（64bit 範囲の組み合わせ数に依存せず、メモリ制約内）
        int size = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue; // 空行をスキップ
            }
            if (!line.matches("-?[0-9]+")) {
                continue; // 整数ではない行をスキップ
            }
            try {
                int num = Integer.parseInt(line.trim());
                if (size < nums.length) {
                    nums[size] = num;
                    size++;
                } else {
                    throw new IllegalStateException("Array overflow");
                }
            } catch (NumberFormatException e) {
                continue; // パースエラーをスキップ
            }
        }

        // 2 つの組を見つける
        for (int i = 0; i < size - 1; i++) {
            for (int j = i + 1; j < size; j++) {
                if ((long)nums[i] + nums[j] == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
