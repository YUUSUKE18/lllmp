import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String targetLine = scanner.nextLine();
        if (targetLine != null && !targetLine.trim().isEmpty()) {
            try {
                long target = Long.parseLong(targetLine);
                numbers.addAll(Arrays.stream(scanner.lines()).filter(line -> {
                    line = line.trim();
                    if (line.isEmpty()) return false;
                    try {
                        int num = Integer.parseInt(line);
                        return num >= 0 && num <= Long.MAX_VALUE;
                    } catch (NumberFormatException e) {
                        return false;
                    }
                }).mapToInt(Integer::intValue).collect(Collectors.toList());
            } catch (NumberFormatException e) {
                System.out.println("Invalid target value.");
                return;
            }
        }

        int count = 0;
        Set<Integer> used = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            if (used.contains(numbers.get(i))) continue;
            for (int j = i + 1; j < numbers.size(); j++) {
                if (used.contains(numbers.get(j))) continue;
                if (numbers.get(i) + numbers.get(j) == (long) target) {
                    count++;
                    used.add(numbers.get(i));
                    used.add(numbers.get(j));
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
