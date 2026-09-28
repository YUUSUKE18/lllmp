import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行：目標値を読み込む
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().matches("-?\\d+")) {
                target = Integer.parseInt(line);
            }
        }

        // 前後の行を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            if (line.matches("-?\\d+")) {
                target = Integer.parseInt(line);
            } else if (line.matches("-?\\d+\\s*\\d+")) {
                int a = Integer.parseInt(line.split("\\s")[0]);
                int b = Integer.parseInt(line.split("\\s")[1]);
                numbers.add(a);
                numbers.add(b);
            }
        }

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
