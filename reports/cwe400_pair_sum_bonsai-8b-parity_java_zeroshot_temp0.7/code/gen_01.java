import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行：目標値を読み取る
        String firstLine = scanner.nextLine();
        if (!firstLine.isEmpty()) {
            try {
                target = Integer.parseInt(firstLine);
            } catch (NumberFormatException e) {
                // データエラーで処理しない
            }
        }

        // 前後の行を処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty() && !line.matches("-?\\d+")) {
                continue;
            }
            if (target == 0 && !line.isEmpty()) {
                try {
                    target = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    // データエラーで処理しない
                }
            } else {
                try {
                    int num = Integer.parseInt(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // データエラーを無視する
                }
            }
        }

        // 配列形式で配列化
        int[] arr = new int[numbers.size()];
        for (int i = 0; i < numbers.size(); i++) {
            arr[i] = numbers.get(i);
        }

        // パイアーズを検索
        List<int[]> pairs = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] == target) {
                    pairs.add(new int[]{i, j});
                }
            }
        }

        // 欧米の形式で出力
        System.out.println("pairs=" + pairs.size());
    }
}
