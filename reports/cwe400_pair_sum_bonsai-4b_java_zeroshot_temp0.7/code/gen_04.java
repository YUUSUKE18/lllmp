import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        List<Long> numbers = new ArrayList<>();

        for (int i = 0; i < scanner.nextLine().length(); i++) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(line.trim()));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = 0;
        Set<String> used = new HashSet<>();
        List<String> pairs = new ArrayList<>();

        // 2 行目以降の各数
        for (int i = 0; i < numbers.size(); i++) {
            if (i < 2) continue;
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    String pair = String.format("%s,%s", numbers.get(i).toString(), numbers.get(j).toString());
                    if (!used.contains(pair)) {
                        count++;
                        used.add(pair);
                        pairs.add(pair);
                    }
                }
            }
        }

        System.out.println("pairs=" + pairs.size());
    }
}
