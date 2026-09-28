import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;

        // 第1行を目標値として読み込む
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                scanner.nextLine();
            } else {
                try {
                    target = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    scanner.nextLine();
                }
            }
        }

        // 2行以降を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                scanner.nextLine();
                continue;
            }
            if (line.trim().isEmpty()) {
                scanner.nextLine();
                continue;
            }
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                scanner.nextLine();
            }
        }

        int count = 0;
        int n = numbers.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
