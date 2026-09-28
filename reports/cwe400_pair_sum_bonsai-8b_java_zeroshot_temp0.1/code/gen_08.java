import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行を目標値として読み込む
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.isEmpty()) {
                try {
                    target = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    // 非数字の行は無視
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
                    // 非数字の行は無視
                }
            }
        }

        // パイアーズを検索
        int count = 0;
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            if (seen.contains(numbers.get(i))) continue;
            seen.add(numbers.get(i));
            for (int j = i + 1; j < numbers.size(); j++) {
                if (seen.contains(numbers.get(j))) continue;
                seen.add(numbers.get(j));
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                    seen.remove(numbers.get(i));
                    seen.remove(numbers.get(j));
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
