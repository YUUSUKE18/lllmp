import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行：目標値を入力
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.isEmpty()) {
                try {
                    target = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    // 非整数の行は無視
                }
            }
        }

        // 前後の行を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.isEmpty()) {
                try {
                    int num = Integer.parseInt(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 非整数の行は無視
                }
            }
        }

        // パイアスを検索
        int count = 0;
        Set<String> seen = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    String key = i + "," + j;
                    if (!seen.contains(key)) {
                        seen.add(key);
                        count++;
                    }
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
