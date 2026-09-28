import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行：目標値を入力
        if (scanner.hasNextInt()) {
            target = scanner.nextInt();
        }

        // ダループループ：2行目以降の整数を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;

            if (scanner.hasNextInt()) {
                int num = scanner.nextInt();
                numbers.add(num);
            }
        }

        // 目標値に合った2つのペアを検索
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 出力
        System.out.println("pairs=" + count);
    }
}
