import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String targetLine = scanner.nextLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("0");
            return;
        }
        try {
            targetLine = targetLine.trim();
            int target = Integer.parseInt(targetLine);
        } catch (NumberFormatException e) {
            System.out.println("0");
            return;
        }
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
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
