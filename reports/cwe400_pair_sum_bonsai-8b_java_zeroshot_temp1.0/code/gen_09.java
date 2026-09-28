import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;
        int count = 0;

        // 第一行は目標値
        if (scanner.hasNextInt()) {
            target = scanner.nextInt();
        }

        // 2行以降は整数を読み込み
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.isEmpty()) continue;
            if (scanner.hasNextInt()) {
                int num = scanner.nextInt();
                numbers.add(num);
            }
        }

        // 2つの数が足して target になる組み
        Set<int[]> pairs = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs.add(new int[]{i, j});
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + pairs.size());
    }
}
