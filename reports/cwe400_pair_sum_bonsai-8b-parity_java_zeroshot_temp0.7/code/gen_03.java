import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String line;
        
        while ((line = scanner.nextLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int value = Integer.parseInt(line);
                numbers.add(value);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int target = numbers.get(0);
        List<Integer> result = new ArrayList<>();
        
        for (int i = 1; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    result.add(Arrays.asList(numbers.get(i), numbers.get(j)));
                }
            }
        }

        System.out.println("pairs=" + result.size());
    }
}
