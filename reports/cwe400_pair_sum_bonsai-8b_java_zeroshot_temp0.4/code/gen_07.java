import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = 0;
        try {
            target = scanner.nextInt();
        } catch (Exception e) {
            return;
        }

        List<Integer> numbers = new ArrayList<>();
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
