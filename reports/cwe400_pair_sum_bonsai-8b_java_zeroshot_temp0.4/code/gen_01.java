import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                continue;
            }
        }
        long target = numbers.get(0);
        numbers.remove(0);
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (target == numbers.get(i) + numbers.get(j)) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
