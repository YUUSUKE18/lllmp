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
                        numbers.add(num);
                        return true;
                    } catch (NumberFormatException e) {
                        return false;
                    }
                }).mapToInt(Integer::intValue).collect(Collectors.toList());
            } catch (NumberFormatException e) {
                System.out.println("Invalid target value");
                return;
            }
        }

        int count = 0;
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            if (seen.contains(numbers.get(i))) continue;
            seen.add(numbers.get(i));
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                    seen.remove(numbers.get(j));
                    seen.remove(numbers.get(i));
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
